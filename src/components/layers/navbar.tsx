"use client"

import { useAuth } from "@/context/auth-context"
import { Button } from "../ui"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavbarProps = React.ComponentProps<"nav"> & {
  withSession?: boolean
}

const links = [
  {
    href: "/add-book",
    label: "Agregar libro",
  },
  {
    href: "/lobby",
    label: "Ver votación",
  },
] as const

export const Navbar = ({ withSession }: NavbarProps) => {
  const { logout } = useAuth()
  const pathname = usePathname()

  if (withSession) {
    return (
      <nav className="flex justify-end items-center gap-10">
        <section className="flex justify-start items-start gap-2">
          <Button variant="ghost" onClick={logout}>
            Cerrar sesión
          </Button>

          {links.map((link) => {
            if (pathname === link.href) return null

            return (
              <Link key={link.href} href={link.href}>
                <Button asChild>
                  <span>{link.label}</span>
                </Button>
              </Link>
            )
          })}
        </section>
      </nav>
    )
  }

  return null
}
