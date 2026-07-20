export const sendBrevoEmail = async (
  subject: string,
  htmlContent: string
) => {
  const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.warn("VITE_BREVO_API_KEY is not set. Email not sent.");
    return false;
  }

  const payload = {
    sender: {
      name: "TakeIN Studio Website",
      email: "no-reply@takeinstudio.com"
    },
    to: [
      { email: "takeinstudio@gmail.com", name: "TakeIN Studio" },
      { email: "x2ankittripathy@gmail.com", name: "Ankit Tripathy" },
      { email: "ashutoshpati7778@gmail.com", name: "Ashutosh Pati" }
    ],
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
      const errorData = await response.json();
      console.error("Brevo Email Error:", errorData);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Brevo Network Error:", error);
    return false;
  }
};
