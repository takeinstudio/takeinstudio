import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

const env = dotenv.parse(fs.readFileSync('.env'));
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function recover() {
  const email = 'takeinstudio@gmail.com';
  console.log(`Sending password recovery email to ${email}...`);
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/vault/update-password',
  });

  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Success! Check your email for the password reset link.");
  }
}

recover();
