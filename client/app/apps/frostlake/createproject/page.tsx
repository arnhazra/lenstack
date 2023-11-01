"use client"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { AppContext } from "@/_context/appStateProvider"

export default function Page() {
  const [state, setState] = useState({ name: "", isLoading: false })
  const router = useRouter()
  const [{ userState }] = useContext(AppContext)

  const createProject = async (e: any) => {
    e.preventDefault()

    try {
      const { name } = state
      setState({ ...state, isLoading: true })
      const response = await axios.post(endPoints.frostlakeCreateProjectEndpoint, { name })
      toast.success("Project Created")
      router.push(`/apps/frostlake/project?projectid=${response.data.project._id}`)
    }

    catch (error: any) {
      toast.error("Unable to create project")
    }

    finally {
      setState({ ...state, isLoading: false })
    }
  }

  return (
    <form className="box" onSubmit={createProject}>
      <p className="branding">Create Project</p>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Project Name</Form.Label>
        <Form.Control disabled={state.isLoading} type="text" placeholder="Acme Project" onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
      </Form.Group>
      <Button type="submit" disabled={state.isLoading || !userState.apiKey} className="btn-block">
        <Show when={!state.isLoading}>Create Project <ArrowRightIcon className="icon-right" /></Show>
        <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Creating Project</Show>
      </Button>
      <Link href={"/apps/frostlake"} className="lead-link">View My Projects</Link>
    </form>
  )
}
