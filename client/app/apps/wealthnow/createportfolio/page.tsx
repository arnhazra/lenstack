"use client"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "sonner"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { AppContext } from "@/_context/appStateProvider"

export default function Page() {
  const [state, setState] = useState({ name: "", isLoading: false })
  const router = useRouter()
  const [{ userState }] = useContext(AppContext)

  const createPortfolio = async (e: any) => {
    e.preventDefault()
    setState({ ...state, isLoading: true })

    try {
      const { name } = state
      const response = await axios.post(endPoints.wealthnowCreatePortfolioEndpoint, { name })
      toast.success("Portfolio Created")
      router.push(`/apps/wealthnow/portfolio?portfolioid=${response.data.portfolio._id}`)
    }

    catch (error: any) {
      setState({ ...state, isLoading: false })
      toast.error("Unable to create portfolio")
    }
  }

  return (
    <form className="box" onSubmit={createPortfolio}>
      <p className="branding">Create Portfolio</p>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Portfolio Name</Form.Label>
        <Form.Control disabled={state.isLoading} type="text" placeholder="Acme Portfolio" onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
      </Form.Group>
      <Button type="submit" disabled={state.isLoading || !userState.apiKey} className="btn-block">
        <Show when={!state.isLoading}>Create Portfolio <ArrowRightIcon className="icon-right" /></Show>
        <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Creating Portfolio</Show>
      </Button>
      <Link href={"/apps/wealthnow"} className="lead-link">View My Portfolios</Link>
    </form>
  )
}
