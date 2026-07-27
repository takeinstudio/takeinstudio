import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
const env = dotenv.parse(fs.readFileSync('.env'));
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const upcomingProducts = [
  { slug: 'fullstack', name: 'Full-Stack Web Dev', short_description: 'Master modern frontend and backend architectures.', description: 'A comprehensive execution guide for building production-ready web applications using modern stacks (React, Node, Postgres).', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false },
  { slug: 'datascience', name: 'Data Science & Analyst', short_description: 'Actionable data pipelines and ML models.', description: 'Learn how to process data, build analytics dashboards, and deploy machine learning models to production.', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false },
  { slug: 'cybersecurity', name: 'Cybersecurity', short_description: 'Practical security protocols and pentesting.', description: 'A hands-on guide to securing web applications, network infrastructure, and performing penetration testing.', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false },
  { slug: 'cloud', name: 'Cloud & DevOps', short_description: 'Infrastructure, CI/CD, and scaling.', description: 'Master AWS/GCP, Docker, Kubernetes, and automated deployment pipelines for enterprise applications.', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false },
  { slug: 'appdev', name: 'App Development', short_description: 'Native and cross-platform mobile apps.', description: 'Build fast, responsive mobile applications using React Native and Flutter for iOS and Android.', category: 'Execution Guide', price_in: 4999, status: 'coming_soon', is_published: false }
];

async function seed() {
  for (const product of upcomingProducts) {
    const { data: existing } = await supabase.from('vault_products').select('id').eq('slug', product.slug).single();
    if (!existing) { console.log(`Inserting ${product.name}...`); await supabase.from('vault_products').insert(product); }
  }
  console.log("Done seeding products!");
}
seed();
