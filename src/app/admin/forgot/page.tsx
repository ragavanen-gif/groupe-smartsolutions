import type { Metadata } from "next";
import { AuthShell } from "@/components/admin/AuthShell";
import { ForgotForm } from "@/components/admin/ForgotForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié — Administration",
  robots: { index: false, follow: false },
};

export default function AdminForgotPage() {
  return (
    <AuthShell>
      <ForgotForm />
    </AuthShell>
  );
}
