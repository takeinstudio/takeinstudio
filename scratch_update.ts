import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env: Record<string, string> = {};
envFile.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length > 0) env[key.trim()] = rest.join('=').trim();
});

const supabase = createClient(
  env['VITE_SUPABASE_URL'] || "",
  env['VITE_SUPABASE_ANON_KEY'] || ""
);

async function updatePhone() {
  const { data, error } = await supabase
    .from('vault_profiles')
    .update({ phone: '919861269422' })
    .eq('email', 'pradhanrajatsubra@gmail.com');
  
  if (error) console.error("Error updating phone:", error);
  else console.log("Successfully updated Rajat's phone number.");
}

updatePhone();
