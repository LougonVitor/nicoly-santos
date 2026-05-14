const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJy1EZx9YRNQmdGRHEWIJ5dAOoGJyNpvY0VTd-zDsCSUPz-0jjB3l6EpN3FE7qQWRyjw/exec";

export async function submitToSheet(data: Record<string, string>) {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch {
    // CORS redirect — ignorado intencionalmente
  }
}