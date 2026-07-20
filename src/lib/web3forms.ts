export const sendWeb3FormsEmail = async (
  subject: string,
  htmlContent: string
) => {
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!WEB3FORMS_KEY) {
    console.warn("VITE_WEB3FORMS_KEY is not set. Email not sent.");
    return false;
  }

  // Web3Forms does not support custom HTML formatting in their free tier exactly like Brevo, 
  // but it does accept the message payload and sends it nicely formatted.
  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: subject,
    from_name: "TakeIN Studio Website",
    // We strip the HTML tags for Web3Forms so it looks clean in the email body
    message: htmlContent.replace(/<[^>]*>?/gm, '\n').trim()
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Web3Forms Email Error:", await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Web3Forms Network Error:", error);
    return false;
  }
};
