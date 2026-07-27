import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
const env = dotenv.parse(fs.readFileSync('.env'));
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { error } = await supabase.from('vault_products').insert({
    slug: 'test-insert-error',
    name: 'Test Error',
    is_published: true
  });
  console.log("Insert Error:", error);
}
run();
