"use client"
import { Button } from "@/components/ui/button"
import useConfirm from "@/hooks/useConfirm"

export default function Home() {
  const { confirm, confirmDialog } = useConfirm()

  const showModal = async () => {
    const answer = await confirm('are you sure?')
    console.log(answer)
  }
  return (
    <main>
      <Button onClick={showModal}>Click me</Button>
      {confirmDialog()}
    </main>
  )
}
