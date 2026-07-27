import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDb() {
  // Try to find the AI/ML product
  console.log("Fetching AI/ML product...");
  const { data, error } = await supabase
    .from('vault_products')
    .select('*')
    .ilike('name', '%AI%ML%')
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    // If not found, let's insert it
    console.log("Product not found. Let's create it.");
    const newProduct = {
      name: "AI / ML Engineer",
      description: "Career Execution Guide",
      short_description: "A structured AI/ML career roadmap covering foundations, machine learning, deep learning, modern AI engineering, production systems, projects and career preparation.",
      status: "active",
      is_published: true,
      price: 99,
      price_in: 99,
      slug: "ai-ml",
      category: "Execution Guide",
      image_url: null
    };
    const { data: insertData, error: insertError } = await supabase.from('vault_products').insert([newProduct]).select();
    if (insertError) {
      console.error("Error inserting:", insertError);
    } else {
      console.log("Successfully inserted product:", insertData);
    }
  } else {
    console.log("Found product:", data.name);
    // Update it
    const { data: updateData, error: updateError } = await supabase
      .from('vault_products')
      .update({
        status: 'active',
        is_published: true,
        slug: 'ai-ml',
        price: data.price || 99,
        price_in: data.price_in || 99,
        description: "Career Execution Guide",
        short_description: "A structured AI/ML career roadmap covering foundations, machine learning, deep learning, modern AI engineering, production systems, projects and career preparation."
      })
      .eq('id', data.id)
      .select();
      
    if (updateError) {
      console.error("Error updating product:", updateError);
    } else {
      console.log("Successfully updated product:", updateData);
    }
  }
}

updateDb();
