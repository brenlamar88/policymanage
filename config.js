/* Supabase connection for the Freedom Policy Center.

   The publishable key is designed to be public — it identifies the project and
   nothing more. It is only safe because Row Level Security decides what each
   signed-in person can read and write, so db/rls.sql must be applied before
   this key is pointed at real data. */
const SUPABASE_CONFIG = {
  url: 'https://yphlmchwdabdbpmgpznd.supabase.co',
  publishableKey: 'sb_publishable_2h-6NtoBjparO5S5Q7enaA_GpwcTa7Y',
  // filled in once IT completes the Entra app registration
  tenantDomains: ['freedomhc.com', 'freedombehavioral.com']
};
