"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="inline-flex items-center gap-2 rounded-full border border-plum/15 px-4 py-2 text-sm font-medium text-plum-700 transition-colors hover:border-pink hover:text-pink"
    >
      <LogOut size={16} /> Déconnexion
    </button>
  );
}
