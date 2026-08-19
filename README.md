# Freedom Policy Center

Front-end prototype of the Freedom Behavioral enterprise policy governance portal.

## Scope

Three primary menu options are visible and built out:

1. **Dashboard** — enterprise KPIs, risk 1–5 distribution (touch a risk level to filter the library), and recent policy activity.
2. **Policy & Form Library** — searchable/filterable table of the 379 controlled policy records, with regulatory driver, associated forms, control status, and a controlled-policy record modal.
3. **Table of Contents** — the 17 enterprise TOC sections as cards plus a Quick TOC in the sidebar; select a section to list its policies, then select a policy to see its current information and every linked form.

Other modules from the original concept (Forms Management, Assigned Policies, Notification Center, Review Analytics, AI Regulatory Watch, Admin, Roles & Groups, Audit Trail) are intentionally not part of this build.

## Files

- `index.html` — markup and styles for the three views.
- `app.js` — policy dataset (379 records / 17 sections), controlled-form reference records, and view logic.

## Running

Static, no build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```
npx http-server .
```

## Notes

- Dashboard counts, TOC section counts, and form-link counts are computed from the dataset, so they stay accurate as records change.
- Acknowledgement rate, past-due reviews, and the activity feed are illustrative sample values.
- Controlled forms are read-only reference data here; uploading and assigning forms belongs to the Forms Management module, which is out of scope for this build.
