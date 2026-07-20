const fs = require('fs');

// Read .env file manually
const env = fs.readFileSync('.env', 'utf-8');
let apiKey = null;
env.split('\n').forEach(line => {
  if (line.startsWith('VITE_BREVO_API_KEY=')) {
    apiKey = line.split('=')[1].trim();
  }
});

if (!apiKey) {
  console.error("No VITE_BREVO_API_KEY found in .env");
  process.exit(1);
}

const payload = {
  sender: {
    name: "TakeIN Studio Website",
    email: "support@takeinstudio.com" 
  },
  to: [
    { email: "takeinstudio@gmail.com", name: "TakeIN Studio" },
    { email: "x2ankittripathy@gmail.com", name: "Ankit Tripathy" },
    { email: "ashutoshpati7778@gmail.com", name: "Ashutosh Pati" }
  ],
  subject: "🛠️ TEST EMAIL from TakeIN Studio",
  htmlContent: "<h2>This is a test email!</h2><p>If you are reading this, the Brevo API integration is working correctly.</p>"
};

fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: {
    "accept": "application/json",
    "api-key": apiKey,
    "content-type": "application/json"
  },
  body: JSON.stringify(payload)
})
.then(async res => {
  console.log("Status:", res.status);
  const data = await res.text();
  console.log("Response:", data);
})
.catch(err => {
  console.error("Error:", err);
});
