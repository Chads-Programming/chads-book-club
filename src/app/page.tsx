"use client"
import { Heading } from "@/components/common"
import { Button } from "@/components/ui"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaDiscord } from "react-icons/fa"

const MIN_USERNAME_LENGTH = 3 as const

export default function Home() {
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) {
      setErrorMessage("Debes ingresar un nombre de usuario")
      return
    }
    if (username.length < MIN_USERNAME_LENGTH) {
      setErrorMessage(`El nombre de usuario debe tener al menos ${MIN_USERNAME_LENGTH} caracteres`)
      return
    }

    setErrorMessage(null)

    login(
      { username },
      {
        onSuccess: () => {
          router.replace("/lobby")
        },
        onError: (error) => {
          setErrorMessage("Hubo un error al registrar el usuario")
          console.error(error)
        },
      },
    )
  }

  return (
    <section className="flex flex-col items-center justify-center gap-2 min-h-screen">
      <form
        className="flex flex-col justify-center items-center  gap-2 w-full max-w-xs"
        onSubmit={handleSubmit}>
        <Heading>Entrá a tu cuenta</Heading>
        <Button asChild className="w-full h-auto p-5">
          <Link href="/api/auth/login/discord" shallow={true}>
            <span className="sr-only">Iniciar sesión</span>
            <FaDiscord className="size-8" aria-label="Icono de Discord" />
          </Link>
        </Button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </section>
  )
}
