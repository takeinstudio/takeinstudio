import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
const env = dotenv.parse(fs.readFileSync('.env'));
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const testProduct = {
    slug: 'test-pub',
    name: 'Test Pub',
    short_description: 'Test',
    description: 'Test',
    category: 'Execution Guide',
    price_in: 0,
    status: 'coming_soon',
    is_published: true
  };
  
  await supabase.from('vault_products').insert(testProduct);
  
  const { data } = await supabase.from('vault_products').select('slug, is_published, status');
  console.log("Products visible:", data);
}
run();
