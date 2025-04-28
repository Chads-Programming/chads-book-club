import { Navbar } from "@/components/layers"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <section className="flex flex-col gap-10">
      <Navbar withSession />
      {children}
    </section>
  )
}
