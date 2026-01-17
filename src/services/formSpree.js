const FORMSPREE_CONFIG = {
  ENDPOINT: import.meta.env.VITE_CONTACT_URL,
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const sendContactForm = async (formData) => {
  try {
    const res = await fetch(FORMSPREE_CONFIG.ENDPOINT, {
      method: "POST",
      headers: FORMSPREE_CONFIG.HEADERS,
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    return true;
  } catch (error) {
    console.error("Contact Service Error:", error);
    return false;
  }
};
