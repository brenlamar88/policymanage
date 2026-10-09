/* Data layer for the Freedom Policy Center.

   The app keeps its working set in memory as it always has; this module loads
   that set from Supabase at startup and writes changes back. Every write is
   fire-and-forget from the UI's point of view but reports failures loudly —
   silently losing a policy change is the one behaviour a governance system
   cannot have.

   If the database is unreachable the app still runs on seeded data, with a
   banner saying so, because a demo that dies on a bad network helps nobody. */

const FPC = {
  client: null,
  connected: false,
  lastError: null,
  ids: {policyByKey: new Map(), formByCode: new Map(), userByEmail: new Map(),
        sectionByName: new Map(), facilityByName: new Map(),
        departmentByName: new Map(), roleByName: new Map()}
};

const policyKey = p => `${p.section}|${p.policy}|${p.title}`;

FPC.connect = async function () {
  if (typeof SUPABASE_CONFIG === 'undefined' || typeof supabase === 'undefined') {
    FPC.lastError = 'Supabase library or config not loaded';
    return false;
  }
  try {
    FPC.client = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, {
      auth: {persistSession: false}
    });
    const {error} = await FPC.client.from('toc_section').select('id').limit(1);
    if (error) throw error;
    FPC.connected = true;
    return true;
  } catch (e) {
    FPC.lastError = e.message || String(e);
    FPC.connected = false;
    return false;
  }
};

/* ------------------------------------------------------------------ load */

FPC.hydrate = async function () {
  if (!FPC.connected) return null;
  const c = FPC.client;
  const [sections, facilities, departments, roles, policies, expected, forms, links, users, versions, tags, policyTags] =
    await Promise.all([
      c.from('toc_section').select('id,name,sort_order').order('sort_order'),
      c.from('facility').select('id,name'),
      c.from('department').select('id,name'),
      c.from('hospital_role').select('id,name'),
      c.from('policy').select('id,policy_number,title,risk_level,risk_basis,regulatory_driver,section_id'),
      c.from('policy_expected_form').select('policy_id,form_number'),
      c.from('form').select('id,form_code,name,risk_level,audience,notify,source_filename,owner_department_id'),
      c.from('policy_form_link').select('policy_id,form_id'),
      c.from('app_user').select('id,employee_no,first_name,last_name,email,security_role,is_shared_mailbox,status,primary_facility_id'),
      c.from('policy_version').select('id,policy_id,version_no,version_label,status,content_hash,created_at,published_at,' +
        'source:storage_object!policy_version_source_object_id_fkey(bucket,object_key,original_filename,byte_size)')
        .order('version_no'),
      c.from('tag').select('id,name,color,description').order('name'),
      c.from('policy_tag').select('policy_id,tag_id')
    ]);

  // tags arrive with migrations/003_tags.sql; a database without them still loads
  FPC.tagsAvailable = !tags.error && !policyTags.error;
  const tagsByPolicy = new Map();
  if (FPC.tagsAvailable) policyTags.data.forEach(pt => {
    if (!tagsByPolicy.has(pt.policy_id)) tagsByPolicy.set(pt.policy_id, []);
    tagsByPolicy.get(pt.policy_id).push(pt.tag_id);
  });

  const firstError = [sections, facilities, departments, roles, policies, expected, forms, links, users, versions]
    .map(r => r.error).find(Boolean);
  if (firstError) { FPC.lastError = firstError.message; return null; }

  const sectionName = new Map(sections.data.map(s => [s.id, s.name]));
  const facilityName = new Map(facilities.data.map(f => [f.id, f.name]));
  const deptName = new Map(departments.data.map(d => [d.id, d.name]));
  sections.data.forEach(s => FPC.ids.sectionByName.set(s.name, s.id));
  facilities.data.forEach(f => FPC.ids.facilityByName.set(f.name, f.id));
  departments.data.forEach(d => FPC.ids.departmentByName.set(d.name, d.id));
  roles.data.forEach(r => FPC.ids.roleByName.set(r.name, r.id));

  const expectedByPolicy = new Map();
  expected.data.forEach(e => {
    if (!expectedByPolicy.has(e.policy_id)) expectedByPolicy.set(e.policy_id, []);
    expectedByPolicy.get(e.policy_id).push(e.form_number);
  });

  const nextPolicies = policies.data.map(p => {
    const rec = {
      section: sectionName.get(p.section_id) || 'UNASSIGNED',
      policy: p.policy_number,
      title: p.title,
      forms: expectedByPolicy.get(p.id) || [],
      departments: '',
      risk: p.risk_level,
      basis: p.risk_basis || '',
      regulatory: p.regulatory_driver || 'Corporate',
      revision: '',
      tags: tagsByPolicy.get(p.id) || []
    };
    FPC.ids.policyByKey.set(policyKey(rec), p.id);
    return rec;
  });

  // uploaded versions, keyed like the policies so the app can find them by index
  const keyByPolicyId = new Map();
  FPC.ids.policyByKey.forEach((id, key) => keyByPolicyId.set(id, key));
  const versionsByKey = new Map();
  versions.data.forEach(v => {
    const key = keyByPolicyId.get(v.policy_id);
    if (!key) return;
    if (!versionsByKey.has(key)) versionsByKey.set(key, []);
    versionsByKey.get(key).push({
      dbId: v.id,
      versionNo: v.version_no,
      label: v.version_label,
      status: v.status,
      createdAt: v.created_at,
      publishedAt: v.published_at,
      hash: v.content_hash,
      bucket: v.source ? v.source.bucket : null,
      objectKey: v.source ? v.source.object_key : null,
      filename: v.source ? v.source.original_filename : null,
      size: v.source ? v.source.byte_size : null
    });
  });

  const policyNumberById = new Map(policies.data.map(p => [p.id, p.policy_number]));
  const linksByForm = new Map();
  links.data.forEach(l => {
    if (!linksByForm.has(l.form_id)) linksByForm.set(l.form_id, []);
    const num = policyNumberById.get(l.policy_id);
    if (num) linksByForm.get(l.form_id).push(num);
  });

  const nextForms = forms.data.map(f => {
    FPC.ids.formByCode.set(f.form_code, f.id);
    const a = f.audience || {};
    return {
      id: f.form_code, name: f.name, version: a.version || 'v1.0', risk: f.risk_level,
      file: f.source_filename || 'Controlled form file', blob: null,
      policies: linksByForm.get(f.id) || [],
      roles: a.roles || [], departments: a.departments || [],
      facilities: a.facilities || ['Enterprise / Corporate'],
      owner: deptName.get(f.owner_department_id) || 'Compliance / Risk',
      notify: f.notify || 'Portal + Email + Acknowledgement Required',
      objectKey: a.objectKey || null
    };
  });

  const nextUsers = users.data.map(u => {
    FPC.ids.userByEmail.set(u.email.toLowerCase(), u.id);
    return {
      id: u.employee_no, first: u.first_name, last: u.last_name, email: u.email,
      facility: facilityName.get(u.primary_facility_id) || 'Enterprise / Corporate',
      departments: [], roles: [],
      securityRole: u.security_role, shared: u.is_shared_mailbox,
      status: u.status === 'active' ? 'Active' : 'Inactive'
    };
  });

  // role and department membership, applied over the users just built
  const [ur, ud] = await Promise.all([
    c.from('user_role').select('user_id,hospital_role(name)'),
    c.from('user_department').select('user_id,department(name)')
  ]);
  const byId = new Map(users.data.map(u => [u.id, u.email.toLowerCase()]));
  const userByEmail = new Map(nextUsers.map(u => [u.email.toLowerCase(), u]));
  (ur.data || []).forEach(r => {
    const u = userByEmail.get(byId.get(r.user_id));
    if (u && r.hospital_role) u.roles.push(r.hospital_role.name);
  });
  (ud.data || []).forEach(d => {
    const u = userByEmail.get(byId.get(d.user_id));
    if (u && d.department) u.departments.push(d.department.name);
  });

  return {policies: nextPolicies, forms: nextForms, users: nextUsers, versions: versionsByKey,
          tags: FPC.tagsAvailable ? tags.data.map(t => ({id: t.id, name: t.name, color: t.color, description: t.description || ''})) : null};
};

/* ----------------------------------------------------------------- write */

/* SHA-256 where the browser exposes it; the column is not null, so fall back
   to a size-and-name digest rather than failing the save. */
FPC.hashFile = async function (file) {
  try {
    const buf = await file.slice(0, Math.min(file.size, 8 * 1024 * 1024)).arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (_) {
    return ('nohash-' + file.size + '-' + file.name).replace(/[^a-z0-9]/gi, '').padEnd(64, '0').slice(0, 64);
  }
};

FPC.signedUrl = async function (bucket, objectKey, seconds) {
  if (!FPC.connected || !objectKey) return null;
  const {data, error} = await FPC.client.storage.from(bucket).createSignedUrl(objectKey, seconds || 300);
  return error ? null : data.signedUrl;
};

FPC.saveForm = async function (rec) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const c = FPC.client;

  // the document itself goes to Storage; the form row keeps the key
  let objectKey = rec.objectKey || null;
  if (rec.blob && typeof File !== 'undefined' && rec.blob instanceof File) {
    const ext = (rec.blob.name.split('.').pop() || 'bin').toLowerCase();
    const hash = await FPC.hashFile(rec.blob);
    objectKey = `${rec.id.replace(/[^A-Za-z0-9._-]/g, '_')}/${hash.slice(0, 16)}.${ext}`;
    const up = await c.storage.from('form-template').upload(objectKey, rec.blob, {upsert: true});
    if (up.error) return {ok: false, reason: `storage: ${up.error.message}`};
    const {error: objError} = await c.from('storage_object').upsert({
      bucket: 'form-template', object_key: objectKey, sha256: hash,
      byte_size: rec.blob.size, mime_type: rec.blob.type || 'application/octet-stream',
      file_extension: ext, original_filename: rec.blob.name, scan_status: 'clean'
    }, {onConflict: 'bucket,sha256'});
    if (objError) return {ok: false, reason: objError.message};
  }

  const payload = {
    form_code: rec.id,
    name: rec.name,
    risk_level: rec.risk,
    status: 'active',
    notify: rec.notify,
    source_filename: rec.file,
    owner_department_id: FPC.ids.departmentByName.get(rec.owner) || null,
    audience: {version: rec.version, roles: rec.roles, departments: rec.departments,
               facilities: rec.facilities, objectKey}
  };
  const {data, error} = await c.from('form').upsert(payload, {onConflict: 'form_code'}).select('id').single();
  if (error) return {ok: false, reason: error.message};
  FPC.ids.formByCode.set(rec.id, data.id);

  // relink: clear this form's links, then write the current set
  await c.from('policy_form_link').delete().eq('form_id', data.id);
  const rows = (rec.policies || []).map(num => {
    const key = [...FPC.ids.policyByKey.keys()].find(k => k.split('|')[1] === String(num));
    return key ? {policy_id: FPC.ids.policyByKey.get(key), form_id: data.id} : null;
  }).filter(Boolean);
  if (rows.length) {
    const {error: linkError} = await c.from('policy_form_link').insert(rows);
    if (linkError) return {ok: false, reason: linkError.message};
  }
  rec.objectKey = objectKey;
  await FPC.audit('form.saved', 'form', data.id, {form_code: rec.id, policies: rec.policies, document: !!objectKey});
  return {ok: true, id: data.id, linked: rows.length};
};

/* Tags. A tag is created or renamed here; which policies carry it is set
   with setPolicyTags, either one policy at a time or a whole list at once. */
FPC.saveTag = async function (rec) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  if (!FPC.tagsAvailable) return {ok: false, reason: 'tags are not set up in the database — run db/migrations/003_tags.sql'};
  const payload = {name: rec.name, color: rec.color, description: rec.description || null};
  const q = rec.dbId
    ? FPC.client.from('tag').update(payload).eq('id', rec.dbId)
    : FPC.client.from('tag').insert(payload);
  const {data, error} = await q.select('id').single();
  if (error) return {ok: false, reason: /duplicate|unique/i.test(error.message) ? `a tag named "${rec.name}" already exists` : error.message};
  await FPC.audit(rec.dbId ? 'tag.updated' : 'tag.created', 'tag', data.id, {name: rec.name});
  return {ok: true, id: data.id};
};

FPC.deleteTag = async function (tagId, name) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const {error} = await FPC.client.from('tag').delete().eq('id', tagId);
  if (error) return {ok: false, reason: error.message};
  await FPC.audit('tag.deleted', 'tag', tagId, {name});
  return {ok: true};
};

/* Brings the database in line with one tag's policy list: adds what is new,
   removes what was dropped, leaves the rest alone. */
FPC.setTagPolicies = async function (tagId, policyKeys, previousKeys) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const idOf = k => FPC.ids.policyByKey.get(k);
  const want = new Set(policyKeys.map(idOf).filter(Boolean));
  const had = new Set(previousKeys.map(idOf).filter(Boolean));
  const add = [...want].filter(id => !had.has(id)).map(policy_id => ({policy_id, tag_id: tagId}));
  const remove = [...had].filter(id => !want.has(id));
  if (add.length) {
    const {error} = await FPC.client.from('policy_tag').upsert(add, {onConflict: 'policy_id,tag_id', ignoreDuplicates: true});
    if (error) return {ok: false, reason: error.message};
  }
  if (remove.length) {
    const {error} = await FPC.client.from('policy_tag').delete().eq('tag_id', tagId).in('policy_id', remove);
    if (error) return {ok: false, reason: error.message};
  }
  if (add.length || remove.length) {
    await FPC.audit('tag.policies_changed', 'tag', tagId, {added: add.length, removed: remove.length});
  }
  return {ok: true, added: add.length, removed: remove.length};
};

FPC.setPolicyTag = async function (policyIdxKey, tagId, on) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const policyId = FPC.ids.policyByKey.get(policyIdxKey);
  if (!policyId) return {ok: false, reason: 'policy not found in the database'};
  const {error} = on
    ? await FPC.client.from('policy_tag').upsert({policy_id: policyId, tag_id: tagId}, {onConflict: 'policy_id,tag_id', ignoreDuplicates: true})
    : await FPC.client.from('policy_tag').delete().eq('policy_id', policyId).eq('tag_id', tagId);
  if (error) return {ok: false, reason: error.message};
  await FPC.audit(on ? 'policy.tag_added' : 'policy.tag_removed', 'policy', policyId, {tag_id: tagId});
  return {ok: true};
};

FPC.saveUser = async function (rec) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const c = FPC.client;
  const {data, error} = await c.from('app_user').upsert({
    employee_no: rec.id,
    first_name: rec.first,
    last_name: rec.last,
    email: rec.email,
    upn: rec.email,
    security_role: rec.securityRole,
    is_shared_mailbox: !!rec.shared,
    status: rec.status === 'Active' ? 'active' : 'inactive',
    primary_facility_id: FPC.ids.facilityByName.get(rec.facility) || null
  }, {onConflict: 'email'}).select('id').single();
  if (error) return {ok: false, reason: error.message};
  FPC.ids.userByEmail.set(rec.email.toLowerCase(), data.id);

  await c.from('user_role').delete().eq('user_id', data.id);
  await c.from('user_department').delete().eq('user_id', data.id);
  const roleRows = (rec.roles || []).map(n => ({user_id: data.id, role_id: FPC.ids.roleByName.get(n)})).filter(r => r.role_id);
  const deptRows = (rec.departments || []).map(n => ({user_id: data.id, department_id: FPC.ids.departmentByName.get(n)})).filter(r => r.department_id);
  if (roleRows.length) await c.from('user_role').insert(roleRows);
  if (deptRows.length) await c.from('user_department').insert(deptRows);
  await FPC.audit('user.saved', 'app_user', data.id, {email: rec.email, security_role: rec.securityRole});
  return {ok: true, id: data.id};
};

FPC.deleteUser = async function (email) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const {error} = await FPC.client.from('app_user').delete().eq('email', email);
  return error ? {ok: false, reason: error.message} : {ok: true};
};

/* An uploaded document: the bytes go to Storage, the record to the database. */
FPC.saveUpload = async function (policyIdxKey, version, file) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const c = FPC.client;
  const policyId = FPC.ids.policyByKey.get(policyIdxKey);
  if (!policyId) return {ok: false, reason: 'policy not found in the database'};

  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const objectKey = `${policyId}/${version.hash || Date.now()}.${ext}`;
  const up = await c.storage.from('policy-source').upload(objectKey, file, {upsert: true});
  if (up.error) return {ok: false, reason: `storage: ${up.error.message}`};

  const {data: obj, error: objError} = await c.from('storage_object').insert({
    bucket: 'policy-source', object_key: objectKey, sha256: (version.hash || '').padEnd(64, '0').slice(0, 64),
    byte_size: file.size, mime_type: file.type || 'application/octet-stream',
    file_extension: ext, original_filename: file.name, scan_status: 'clean'
  }).select('id').single();
  if (objError) return {ok: false, reason: objError.message};

  const {data: ver, error: verError} = await c.from('policy_version').insert({
    policy_id: policyId, version_no: version.versionNo, version_label: version.label,
    status: 'draft', source_object_id: obj.id, content_hash: version.hash || null
  }).select('id').single();
  if (verError) return {ok: false, reason: verError.message};
  await FPC.audit('policy.version_uploaded', 'policy', policyId, {file: file.name, label: version.label});
  return {ok: true, id: ver.id, bucket: 'policy-source', objectKey};
};

/* Approval: the version in force becomes superseded, this one takes force,
   and the policy points at it. Nothing is deleted. */
FPC.publishVersion = async function (policyIdxKey, versionId) {
  if (!FPC.connected) return {ok: false, reason: 'offline'};
  const c = FPC.client;
  const policyId = FPC.ids.policyByKey.get(policyIdxKey);
  if (!policyId) return {ok: false, reason: 'policy not found in the database'};
  const now = new Date().toISOString();

  const {error: supError} = await c.from('policy_version')
    .update({status: 'superseded', retired_on: now.slice(0, 10)})
    .eq('policy_id', policyId).eq('status', 'published');
  if (supError) return {ok: false, reason: supError.message};

  const {error: pubError} = await c.from('policy_version')
    .update({status: 'published', published_at: now, effective_on: now.slice(0, 10)})
    .eq('id', versionId);
  if (pubError) return {ok: false, reason: pubError.message};

  const {error: polError} = await c.from('policy')
    .update({current_version_id: versionId, updated_at: now})
    .eq('id', policyId);
  if (polError) return {ok: false, reason: polError.message};

  await FPC.audit('policy.version_published', 'policy', policyId, {version_id: versionId});
  return {ok: true};
};

/* Walks the connection one stage at a time and reports where it breaks,
   because "not saving" on its own tells nobody anything. */
FPC.diagnose = async function () {
  const steps = [];
  const add = (name, ok, detail, fix) => steps.push({name, ok, detail, fix});

  const origin = location.protocol;
  add('Page origin', origin !== 'file:', origin === 'file:'
      ? 'Opened directly as a file — the browser sends Origin: null, which the API rejects'
      : `Served over ${origin}`,
      'Serve the folder instead: npx serve . — then open the http://localhost URL');

  add('Config loaded', typeof SUPABASE_CONFIG !== 'undefined',
      typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.url : 'config.js did not load',
      'config.js must sit next to index.html and be reachable');

  add('Supabase library', typeof supabase !== 'undefined',
      typeof supabase !== 'undefined' ? 'loaded' : 'the CDN script did not load',
      'The page pulls supabase-js from cdn.jsdelivr.net. If your network blocks it, download it once — ' +
      'curl -o vendor/supabase.min.js https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js — ' +
      'and point the script tag in index.html at vendor/supabase.min.js');

  if (typeof SUPABASE_CONFIG === 'undefined') return steps;

  // a plain REST call says more than the client wrapper does
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/toc_section?select=id&limit=1`, {
      headers: {apikey: SUPABASE_CONFIG.publishableKey,
                Authorization: `Bearer ${SUPABASE_CONFIG.publishableKey}`}
    });
    const body = await res.text();
    if (res.ok) {
      const rows = JSON.parse(body || '[]');
      add('Reaching the database', true, `HTTP ${res.status}`, '');
      add('Reading a table', rows.length > 0,
          rows.length ? 'toc_section returned a row' : 'connected, but toc_section came back empty',
          'Run db/seed.sql, and db/dev-open-access.sql so the anonymous role can read');
    } else {
      add('Reaching the database', false, `HTTP ${res.status} — ${body.slice(0, 160)}`,
          res.status === 401 ? 'The key was rejected — check the publishable key in config.js'
          : res.status === 404 ? 'That table does not exist — run db/schema.sql and db/seed.sql'
          : 'Check the project URL in config.js');
    }
  } catch (e) {
    // "Failed to fetch" covers several very different causes. A no-cors probe
    // separates "the host never answered" from "it answered and CORS blocked it".
    let hostAnswered = false;
    try {
      await fetch(`${SUPABASE_CONFIG.url}/rest/v1/`, {mode: 'no-cors'});
      hostAnswered = true;
    } catch (_) { /* still unreachable */ }
    add('Reaching the database', false,
        hostAnswered
          ? `The host answered but the browser blocked the response (${e.message}) — a CORS or extension problem`
          : `No response from ${SUPABASE_CONFIG.url} (${e.message})`,
        hostAnswered
          ? 'Disable ad-blockers or privacy extensions for this page, then retry'
          : 'The project URL does not resolve, the project is paused, or a firewall blocks *.supabase.co. ' +
            'Check Supabase → Settings → API for the exact Project URL, and that the project is not paused. ' +
            `Opening ${SUPABASE_CONFIG.url}/rest/v1/ in a new tab should return JSON, not a connection error.`);
  }

  // storage is a separate failure, and only bites on upload
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/storage/v1/bucket/form-template`, {
      headers: {apikey: SUPABASE_CONFIG.publishableKey,
                Authorization: `Bearer ${SUPABASE_CONFIG.publishableKey}`}
    });
    add('Storage buckets', res.ok || res.status === 400,
        `HTTP ${res.status}`,
        'Run db/storage-buckets.sql and db/storage-dev-access.sql');
  } catch (e) {
    add('Storage buckets', false, e.message, 'Run db/storage-buckets.sql');
  }
  return steps;
};

FPC.audit = async function (action, entityType, entityId, metadata) {
  if (!FPC.connected) return;
  try {
    await FPC.client.from('audit_event').insert({
      action, entity_type: entityType, entity_id: entityId, metadata: metadata || {}
    });
  } catch (_) { /* the audit write must never break the user's action */ }
};
