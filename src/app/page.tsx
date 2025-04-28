"use client"
import { Input } from "@/components/ui"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PiDiscordLogoBold } from "react-icons/pi"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <section className="flex flex-col items-center justify-center gap-2 min-h-screen">
      <form className="flex flex-col justify-center items-center  gap-2 w-full max-w-xs" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className=" justify-center w-full p-8 relative flex items-center justify-between gap-2 h-12 border border-border rounded-lg">
          <a href="/api/auth/login/discord">
            <PiDiscordLogoBold size={32} />
          </a>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </section>
  )
}
