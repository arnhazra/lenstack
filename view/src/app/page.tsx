"use client"
import Show from "@/_components/Show"
import Constants from "@/_constants/appConstants"
import { Button } from "@/components/ui/button"
import { ArrowRightCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="container">
      <div className="cover">
        <p className="text-5xl font-bold mb-4">
          {Constants.HomeHeader1}<br />
          {Constants.HomeHeader2}<br />
        </p>
        <p className="text-lg my-4">
          {Constants.HomeIntro1} <br />
          {Constants.HomeIntro2} <br />
          {Constants.HomeIntro3} <br />
        </p>
        <Button onClick={() => router.push('/dashboard')}>
          <Show when={!!localStorage.getItem("accessToken")}>
            Go to dashboard <ArrowRightCircle className="ml-2" />
          </Show>
          <Show when={!localStorage.getItem("accessToken")}>
            Try for free <ArrowRightCircle className="ml-2" />
          </Show>
        </Button>
      </div>
    </div>
  )
}
