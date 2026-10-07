/* Access gate for the Freedom Policy Center, run by Vercel before any file is
   served — so the app, its data files and config.js stay behind it.

   Blocked by default: until SITE_PASSCODE is set in the Vercel project's
   environment variables, nobody gets in. With it set, the passcode unlocks
   the site for that browser for GATE_DAYS.

   This is a stopgap for the beta, not authentication. It goes once Microsoft
   sign-in is live (docs/sign-in-setup.md). */

export const config = { matcher: '/:path*' };

const COOKIE = 'fpc_gate';
const GATE_PATH = '/__gate';
const GATE_DAYS = 14;

async function token(passcode) {
  const bytes = new TextEncoder().encode(`fpc-gate:${passcode}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

const readCookie = (req, name) => {
  const hit = (req.headers.get('cookie') || '').split(/;\s*/).find(c => c.startsWith(name + '='));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
};

const esc = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function gatePage({ open, error, next }) {
  const body = open
    ? `<form method="post" action="${GATE_PATH}">
        <input type="hidden" name="next" value="${esc(next)}">
        <label for="p">Passcode</label>
        <input id="p" name="passcode" type="password" autocomplete="current-password" autofocus required>
        ${error ? '<p class="err">That passcode is not right.</p>' : ''}
        <button type="submit">Continue</button>
      </form>`
    : '<p>The site is closed while access is being set up.</p>';
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Access restricted</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f6f9;color:#14243b;
       font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;padding:16px;box-sizing:border-box}
  main{background:#fff;border:1px solid #dfe4ec;border-radius:14px;padding:28px;max-width:360px;width:100%}
  .eyebrow{color:#5a6b82;font-size:13px;margin:0}
  h1{font-size:22px;margin:2px 0 14px}
  label{display:block;font-size:13px;font-weight:600;margin-bottom:6px}
  input[type=password]{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #c9d2df;border-radius:8px;font:inherit}
  button{margin-top:14px;width:100%;padding:10px;border:0;border-radius:8px;background:#14243b;color:#fff;font:inherit;font-weight:600;cursor:pointer}
  .err{color:#b42318;font-size:14px;margin:8px 0 0}
  p{margin:0}
</style></head><body><main>
<p class="eyebrow">Freedom Behavioral · Policy Governance</p>
<h1>Access restricted</h1>
${body}
</main></body></html>`, {
    status: 401,
    headers: {'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex'}
  });
}

// only same-site paths, so the form cannot bounce people elsewhere
const safeNext = n => (typeof n === 'string' && n.startsWith('/') && !n.startsWith('//')) ? n : '/';

export default async function middleware(req) {
  const passcode = process.env.SITE_PASSCODE || '';
  const url = new URL(req.url);

  if (!passcode) return gatePage({ open: false });

  const expected = await token(passcode);
  if (readCookie(req, COOKIE) === expected) return;   // unlocked: serve as normal

  if (url.pathname === GATE_PATH && req.method === 'POST') {
    const form = await req.formData();
    const next = safeNext(form.get('next'));
    if (await token(String(form.get('passcode') || '')) !== expected) {
      return gatePage({ open: true, error: true, next });
    }
    return new Response(null, {
      status: 303,
      headers: {
        location: next,
        'set-cookie': `${COOKIE}=${expected}; Path=/; Max-Age=${GATE_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`,
        'cache-control': 'no-store'
      }
    });
  }

  return gatePage({ open: true, next: url.pathname + url.search });
}
