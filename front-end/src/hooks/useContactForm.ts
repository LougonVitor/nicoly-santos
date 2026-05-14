import { useState } from "react";
import { submitToSheet } from "../services/googleSheets";

export function useContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await submitToSheet({ ...form, type: "contato" });
    setSubmitted(true);
  };

  return { form, setForm, submitted, handleSubmit };
}