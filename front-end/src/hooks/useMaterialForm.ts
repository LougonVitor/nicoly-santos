import { useState } from "react";
// Quando formos integrar com o Google Sheets, basta seguir o mesmo padrão
// já usado em useVolunteerForm.ts / useContactForm.ts:
// import { submitToSheet } from "../services/googleSheets";

export interface MaterialFormData {
  name: string;
  email: string;
  whatsapp: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  wantsSticker: boolean;
}

const initialForm: MaterialFormData = {
  name: "",
  email: "",
  whatsapp: "",
  cep: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  wantsSticker: false,
};

export function useMaterialForm() {
  const [form, setForm] = useState<MaterialFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  /**
   * Busca o endereço automaticamente via ViaCEP assim que o usuário
   * termina de digitar um CEP válido (8 dígitos).
   */
  const lookupCep = async (rawCep: string) => {
    const cep = rawCep.replace(/\D/g, "");
    if (cep.length !== 8) return;

    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          address: data.logradouro || prev.address,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch {
      // Falha silenciosa — o usuário pode preencher o endereço manualmente
    } finally {
      setCepLoading(false);
    }
  };

  const handleSubmit = async () => {
    // ── INTEGRAÇÃO COM GOOGLE SHEETS (próxima etapa) ──
    // Quando o formulário estiver pronto para gravar na planilha, troque o
    // bloco abaixo por algo como:
    //
    //   await submitToSheet({
    //     ...form,
    //     wantsSticker: form.wantsSticker ? "sim" : "não",
    //     type: "material",
    //   });
    //
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);
  };

  return { form, setForm, submitted, handleSubmit, lookupCep, cepLoading };
}
