import { supabase } from "@/lib/supabase";

export const sendBrevoEmail = async (
  subject: string,
  htmlContent: string,
  senderType: "support" | "noreply" | "careers" = "support",
  toEmail?: string
) => {
  // First try to load from environment variable (allows anonymous pages to send emails)
  let BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    // Fallback to fetching API key securely from the database (for admin panel)
    const { data: configData } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', 'brevo_api_key')
      .single();
    BREVO_API_KEY = configData?.value;
  }

  if (!BREVO_API_KEY) {
    console.error("Failed to load Brevo API Key from environment or database.");
    return false;
  }

  let senderEmail = "support@takeinstudio.com";
  let senderName = "TakeIN Studio Support";

  if (senderType === "noreply") {
    senderEmail = "noreply@takeinstudio.com";
    senderName = "TakeIN Studio";
  } else if (senderType === "careers") {
    senderEmail = "careers@takeinstudio.com";
    senderName = "TakeIN Studio Careers";
  }

  // Determine recipients
  let recipients: { email: string; name: string }[] = [];
  if (toEmail) {
    const emails = toEmail.split(',').map(e => e.trim()).filter(e => e);
    recipients = emails.map(email => ({ email, name: "Valued Client" }));
  } else {
    recipients = [
        { email: "takeinstudio@gmail.com", name: "TakeIN Studio" },
        { email: "support@takeinstudio.com", name: "TakeIN Studio Support" },
        { email: "x2ankittripathy@gmail.com", name: "Ankit Tripathy" },
        { email: "ashutoshpati7778@gmail.com", name: "Ashutosh Pati" }
      ];
  }

  const payload: any = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    subject: subject,
    htmlContent: htmlContent
  };

  if (recipients.length > 1) {
    payload.messageVersions = recipients.map(recipient => ({
      to: [recipient]
    }));
  } else if (recipients.length === 1) {
    payload.to = recipients;
  } else {
    console.error("No recipients specified.");
    return false;
  }

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
