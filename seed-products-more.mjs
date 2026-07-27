import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
const env = dotenv.parse(fs.readFileSync('.env'));
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const upcomingProducts = [
  { slug: 'ai-ml', name: 'AI / ML Engineer', short_description: 'Build and deploy intelligent systems.', description: 'Master neural networks, deep learning, NLP, and deploy scalable AI models into production.', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false },
  { slug: 'ui-ux', name: 'UI/UX Designer', short_description: 'Design premium user experiences.', description: 'Learn Figma, wireframing, user research, and how to design high-converting, beautiful interfaces.', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false },
  { slug: 'sde', name: 'Software Engineer (DSA + Prep)', short_description: 'Crack top tech interviews.', description: 'Master Data Structures, Algorithms, System Design, and behavioral interviews for FAANG and top startups.', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false }
];

async function seed() {
  for (const product of upcomingProducts) {
    const { data: existing } = await supabase.from('vault_products').select('id').eq('slug', product.slug).single();
    if (!existing) { console.log(`Inserting ${product.name}...`); await supabase.from('vault_products').insert(product); }
    else { console.log(`${product.name} already exists.`); }
  }
  console.log("Done seeding new products!");
}
seed();
