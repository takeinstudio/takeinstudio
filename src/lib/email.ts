import { supabase } from "@/lib/supabase";

export const sendBrevoEmail = async (
  subject: string,
  htmlContent: string,
  senderType: "support" | "noreply" = "support",
  toEmail?: string
) => {
  // Fetch API key securely from the database
  const { data: configData, error: configError } = await supabase
    .from('system_config')
    .select('value')
    .eq('key', 'brevo_api_key')
    .single();

  const BREVO_API_KEY = configData?.value;

  if (configError || !BREVO_API_KEY) {
    console.error("Failed to load Brevo API Key from secure config. User might not be an admin, or key is missing.");
    return false;
  }

  const senderEmail = senderType === "noreply" ? "noreply@takeinstudio.com" : "support@takeinstudio.com";
  const senderName = senderType === "noreply" ? "TakeIN Studio" : "TakeIN Studio Support";

  // Determine recipients
  let recipients = [];
  if (toEmail) {
    const emails = toEmail.split(',').map(e => e.trim()).filter(e => e);
    recipients = emails.map(email => ({ email, name: "Valued Client" }));
  } else {
    recipients = [
        { email: "support@takeinstudio.com", name: "TakeIN Studio" },
        { email: "x2ankittripathy@gmail.com", name: "Ankit Tripathy" },
        { email: "ashutoshpati7778@gmail.com", name: "Ashutosh Pati" }
      ];
  }

  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: recipients,
    subject: subject,
    htmlContent: htmlContent
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Brevo Email Error:", await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Brevo Network Error:", error);
    return false;
  }
};
