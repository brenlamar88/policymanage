#!/usr/bin/env node
/* Regenerates data/policy-form-map.js from the tracker export in
   data/policy-form-map.json. The browser build is served from file://, where
   fetch() of a local JSON file is blocked, so the mapping ships as a JS file.

   Usage: node scripts/build-form-map.js   (after replacing the .json export) */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'data', 'policy-form-map.json');
const out = path.join(root, 'data', 'policy-form-map.js');

const raw = JSON.parse(fs.readFileSync(src, 'utf8'));
let pairs = 0;
const forms = new Set();
const policies = new Set();
for (const section of raw.sections) {
  for (const m of section.policy_form_mappings) {
    policies.add(m.policy_number);
    for (const f of m.associated_form_numbers) { forms.add(f); pairs++; }
  }
}

const banner = `/* GENERATED FILE — do not edit by hand.
   Source: ${raw.source_workbook}
   Rebuild: node scripts/build-form-map.js
   ${policies.size} policies · ${forms.size} form numbers · ${pairs} policy-form links */\n`;

fs.writeFileSync(out, banner + 'const POLICY_FORM_MAP = ' + JSON.stringify(raw, null, 1) + ';\n');
console.log(`wrote ${path.relative(root, out)} — ${policies.size} policies, ${forms.size} forms, ${pairs} links`);
