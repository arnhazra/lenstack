"use client"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/endPoints"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { GlobalContext } from "@/context/globalStateProvider"

export default function Page() {
  const [state, setState] = useState({ name: "", isLoading: false })
  const router = useRouter()
  const [{ userState }] = useContext(GlobalContext)

  const createDb = async (e: any) => {
    e.preventDefault()

    try {
      const { name } = state
      setState({ ...state, isLoading: true })
      const response = await axios.post(endPoints.hyperedgeCreateDb, { name })
      toast.success("Db Created")
      router.push(`/products/hyperedge/database?dbId=${response.data.db._id}`)
    }

    catch (error: any) {
      toast.error("Unable to create db")
    }

    finally {
      setState({ ...state, isLoading: false })
    }
  }

  return (
    <form className="box" onSubmit={createDb}>
      <p className="branding">Create Database</p>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Db Name</Form.Label>
        <Form.Control disabled={state.isLoading} type="text" placeholder="Acme Db" onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
      </Form.Group>
      <Button type="submit" disabled={state.isLoading || !userState.apiKey} className="btn-block">
        <Show when={!state.isLoading}>Create Db <ArrowRightIcon className="icon-right" /></Show>
        <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Creating & Configuring Db</Show>
      </Button>
      <Link href={"/products/hyperedge"} className="lead-link">View My Dbs</Link>
    </form>
  )
}
