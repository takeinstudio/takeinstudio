import { supabase } from "@/lib/supabase";

export const sendBrevoEmail = async (
  subject: string,
  htmlContent: string,
  senderType: "support" | "noreply" | "careers" | "hello" = "support",
  toEmail?: string,
  bccAdmin: boolean = false,
  toName: string = "Valued Client"
) => {
  // First try to load from environment variable (allows anonymous pages to send emails)
  let BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

  if (!BREVO_API_KEY || BREVO_API_KEY === "your_brevo_api_key_here") {
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
  } else if (senderType === "hello") {
    senderEmail = "hello@takeinstudio.com";
    senderName = "TakeIN Studio";
  }

  // Determine recipients
  let recipients: { email: string; name: string }[] = [];
  if (toEmail) {
    const emails = toEmail.split(',').map(e => e.trim()).filter(e => e);
    recipients = emails.map(email => ({ email, name: toName }));
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

  if (bccAdmin) {
    payload.bcc = [{ email: "takeinstudio@gmail.com", name: "TakeIN Studio Admin" }];
  }

  if (recipients.length > 1) {
    payload.messageVersions = recipients.map(recipient => {
      const version: any = { to: [recipient] };
      if (bccAdmin) version.bcc = [{ email: "takeinstudio@gmail.com", name: "TakeIN Studio Admin" }];
      return version;
    });
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

// Automation Specific Emails

export const sendWelcomeEmail = async (email: string, name: string) => {
  const subject = "Welcome to TakeIN Studio Member Access!";
  const html = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f4f4f5;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; border-top: 6px solid #f97316; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h1 style="color: #18181b; font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 24px;"><span style="color: #f97316;">TakeIN</span> Studio</h1>
        <h2 style="color: #27272a; font-size: 20px; font-weight: 600;">Welcome, ${name}!</h2>
        <p style="color: #52525b; font-size: 16px; line-height: 24px;">Thank you for getting member access. You can now explore all available resources and courses within your private vault.</p>
        <div style="text-align: center; margin-top: 32px;">
          <a href="https://takeinstudio.com/vault/login" style="background-color: #f97316; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Access Your Vault</a>
        </div>
      </div>
    </div>
  `;
  return sendBrevoEmail(subject, html, "careers", email, true, name);
};

export const sendManualOnboardEmail = async (email: string, name: string, pass: string) => {
  const subject = "Your TakeIN Studio Vault Credentials";
  const html = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f4f4f5;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; border-top: 6px solid #f97316; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h1 style="color: #18181b; font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 24px;"><span style="color: #f97316;">TakeIN</span> Studio</h1>
        <h2 style="color: #27272a; font-size: 20px; font-weight: 600;">Welcome, ${name}!</h2>
        <p style="color: #52525b; font-size: 16px; line-height: 24px;">Your member account has been created by our administration team. Please use the credentials below to log in:</p>
        <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 10px 0; color: #52525b; font-weight: bold;">Email: <span style="font-weight: normal;">${email}</span></p>
          <p style="margin: 0; color: #52525b; font-weight: bold;">Password: <span style="font-weight: normal; font-family: monospace;">${pass}</span></p>
        </div>
        <div style="text-align: center; margin-top: 32px;">
          <a href="https://takeinstudio.com/vault/login" style="background-color: #f97316; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Log In Now</a>
        </div>
      </div>
    </div>
  `;
  return sendBrevoEmail(subject, html, "careers", email, true, name);
};

export const sendProductGrantedEmail = async (email: string, productName: string, name: string = "Valued Client") => {
  const subject = `New Resource Granted: ${productName}`;
  const html = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f4f4f5;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; border-top: 6px solid #f97316; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h1 style="color: #18181b; font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 24px;"><span style="color: #f97316;">TakeIN</span> Studio</h1>
        <h2 style="color: #27272a; font-size: 20px; font-weight: 600;">Resource Unlocked!</h2>
        <p style="color: #52525b; font-size: 16px; line-height: 24px;">Good news! <strong>${productName}</strong> has been granted to your account.</p>
        <p style="color: #52525b; font-size: 16px; line-height: 24px;">You can check it out now by logging into your secure vault.</p>
        <div style="text-align: center; margin-top: 32px;">
          <a href="https://takeinstudio.com/vault/login" style="background-color: #f97316; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Go to Vault</a>
        </div>
      </div>
    </div>
  `;
  return sendBrevoEmail(subject, html, "support", email, true, name);
};
