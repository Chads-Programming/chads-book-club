"use client";
import { Button } from "@/components/ui";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { logout } = useAuth();

  return (
    <section className="flex flex-col gap-10 items-start">
      <div className="self-end flex justify-start items-start gap-2">
        <Button variant="ghost" onClick={logout}>
          Cerrar sesión
        </Button>
        <Link href="/add-book">
          <Button asChild>
            <span>Agregar libro</span>
          </Button>
        </Link>
      </div>

      {children}
    </section>
  );
}
