import { useState } from "react";
import { submitToSheet } from "../services/googleSheets";

export function useVolunteerForm() {
  const [form, setForm] = useState({ name: "", email: "", city: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await submitToSheet({ ...form, type: "voluntario" });
    setSubmitted(true);
  };

  return { form, setForm, submitted, handleSubmit };
}