import type { Metadata } from "next";
import { AuthShell } from "@/components/admin/AuthShell";
import { ResetForm } from "@/components/admin/ResetForm";

export const metadata: Metadata = {
  title: "Nouveau mot de passe — Administration",
  robots: { index: false, follow: false },
};

export default function AdminResetPage() {
  return (
    <AuthShell>
      <ResetForm />
    </AuthShell>
  );
}
