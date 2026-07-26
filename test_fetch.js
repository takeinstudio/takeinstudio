const url = 'https://rjuymjernfxivrjjvphi.supabase.co/rest/v1/vault_products?select=*';
const anonKey = 'sb_publishable_c6hMq4_hydEEA-m29zmjJQ_2odR40yA';

fetch(url, {
  headers: {
    'apikey': anonKey,
    'Authorization': `Bearer ${anonKey}`
  }
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
