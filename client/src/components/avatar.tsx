"use client"
import { useRouter } from "next/navigation"

interface AvatarProps {
  email: string
}

export default function Avatar({ email }: AvatarProps) {
  const router = useRouter()
  const userInitial = email.slice(0, 2).toUpperCase() ?? "US"

  return (
    <button className="btn-user" onClick={(): void => router.push("/account")}>{userInitial}</button>
  )
}
