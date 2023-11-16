"use client"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/endPoints"
import HTTPMethods from "@/constants/httpMethods"
import { GlobalContext } from "@/context/globalStateProvider"
import useFetch from "@/hooks/useFetch"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { FormEvent, Fragment, useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import toast from "react-hot-toast"

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [queryId, setQueryId] = useState(Math.random().toString())
  const myWorkspaces = useFetch("my workspaces", endPoints.findMyWorkspaces, HTTPMethods.POST, {}, true, queryId)
  const [newWorkspaceName, setNewWorkspaceName] = useState("")
  const [isLoading, setLoading] = useState(false)

  const createWorkspace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      await axios.post(endPoints.createWorkspace, { name: newWorkspaceName })
      setQueryId(Math.random().toString())
      toast.success("Workspace created")
    }

    catch (error) {
      toast.error("Workspace creation failed")
    }

    finally {
      setLoading(false)
    }
  }

  const switchWorkspace = async (workspaceId: string) => {
    try {
      await axios.post(`${endPoints.switchWorkspace}?workspaceId=${workspaceId}`)
      dispatch("setUserState", { refreshId: Math.random().toString(36).substring(7) })
      toast.success("Workspace switched")
    }

    catch (error) {
      toast.error("Workspace switching failed")
    }
  }

  const workspacesToDisplay = myWorkspaces?.data?.myWorkspaces?.map((workspace: any) => {
    return <option className="text-capitalize" key={workspace._id} value={workspace._id}>{workspace.name}</option>
  })

  return (
    <Fragment>
      <Show when={!myWorkspaces.isLoading}>
        <div className="box">
          <p className="branding">Workspace</p>
          <Form.Group controlId="floatingSelectGrid" className="mb-4">
            <Form.Label>Switch Workspace</Form.Label>
            <Form.Select className="text-capitalize" size="lg" defaultValue={userState.selectedWorkspaceId} onChange={(e): void => { switchWorkspace(e.target.value) }}>
              {workspacesToDisplay}
            </Form.Select>
          </Form.Group>
          <form onSubmit={createWorkspace}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Create Workspace</Form.Label>
              <Form.Control disabled={isLoading} type="text" name="name" placeholder="Workspace Name" onChange={(e) => { setNewWorkspaceName(e.target.value) }} maxLength={15} required autoComplete={"off"} />
            </Form.Group>
            <Button disabled={isLoading} type="submit" className="btn-block"><PlusCircledIcon className="icon-left" />Create Workspace</Button>
          </form>
        </div>
      </Show>
      <Show when={myWorkspaces.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
