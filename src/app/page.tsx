"use client"
import { Input } from "@/components/ui"
import { UserService } from "@/services/user"
import { useState } from "react"
import { PiArrowCircleRightFill } from "react-icons/pi"

export default function Home() {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    UserService.register(username)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <main className="grid place-content-center min-h-screen">
      <form className="flex flex-col gap-2 max-w-xs" onSubmit={handleSubmit}>
        <h2>¿Quién sos pibe?</h2>
        <div className="relative flex items-center justify-between gap-2 h-12 border border-border rounded-lg">
          <Input
            className="w-full h-full bg-transparent border-none rounded-none shadow-none pl-4 pr-12"
            value={username}
            onChange={handleChange}
          />
          <PiArrowCircleRightFill
            size={32}
            className="absolute top-2/4 right-2 -translate-y-2/4"
            role="button"
            type="submit"
          />
        </div>
      </form>
    </main>
  )
}
