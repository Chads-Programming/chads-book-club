"use client"
import { Input } from "@/components/ui"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PiArrowCircleRightFill } from "react-icons/pi"

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
      <form className="flex flex-col items-start gap-2 w-full max-w-xs" onSubmit={handleSubmit}>
        <h2>¿Quién sos pibe?</h2>
        <div className="w-full relative flex items-center justify-between gap-2 h-12 border border-border rounded-lg">
          <Input
            className="w-full h-full bg-transparent border-none rounded-lg shadow-none pl-4 pr-12"
            value={username}
            onChange={handleChange}
          />
          <PiArrowCircleRightFill
            size={32}
            className="absolute top-2/4 right-2 -translate-y-2/4 cursor-pointer hover:opacity-75"
            role="button"
            type="button"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </section>
  )
}
