"use client"
import Loading from "@/components/loading-component"
import SensitiveInfoPanel from "@/components/sensitiveinfopanel-component"
import Show from "@/components/show-component"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/hooks/use-query"
import usePrompt from "@/hooks/use-prompt"
import { KeyboardIcon, LockOpen1Icon, PlusCircledIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { Fragment, useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import toast from "react-hot-toast"

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [queryId, setQueryId] = useState(Math.random().toString())
  const myWorkspaces = useQuery("my workspaces", endPoints.findMyWorkspaces, HTTPMethods.GET, {}, queryId)
  const { prompt, promptDialog } = usePrompt()

  const createWorkspace = async () => {
    const { hasConfirmed, value } = await prompt("New Workspace Name")

    if (hasConfirmed && value) {
      try {
        await axios.post(endPoints.createWorkspace, { name: value })
        setQueryId(Math.random().toString())
        toast.success("Workspace created")
      }

      catch (error) {
        toast.error("Workspace creation failed")
      }
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

  return (
    <Fragment>
      <Show when={!myWorkspaces.isLoading}>
        <div className="box">
          <p className="branding">Workspace</p>
          <Form.Group controlId="floatingSelectGrid" className="mb-4">
            <Form.Label>Switch Workspace</Form.Label>
            <Form.Select className="text-capitalize" size="lg" defaultValue={userState.selectedWorkspaceId} onChange={(e): void => { switchWorkspace(e.target.value) }}>
              {myWorkspaces?.data?.myWorkspaces?.map((workspace: any) => <option className="text-capitalize" key={workspace._id} value={workspace._id}>{workspace.name}</option>)}
            </Form.Select>
          </Form.Group>
          <SensitiveInfoPanel credentialIcon={<LockOpen1Icon />} credentialName="Client ID" credentialValue={userState.clientId} />
          <SensitiveInfoPanel credentialIcon={<KeyboardIcon />} credentialName="Client Secret" credentialValue={userState.clientSecret} />
          <Button variant="primary" onClick={createWorkspace} className="btn-block"><PlusCircledIcon className="icon-left" />Create New Workspace</Button>
        </div>
      </Show>
      <Show when={myWorkspaces.isLoading}>
        <Loading />
      </Show>
      {promptDialog()}
    </Fragment>
  )
}
