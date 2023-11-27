"use client"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/api.endpoints"
import HTTPMethods from "@/constants/http.methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useFetch from "@/hooks/useFetch"
import usePrompt from "@/hooks/usePrompt"
import { copyCredential } from "@/utils/copy-credential"
import { maskCredential } from "@/utils/mask-credential"
import { CopyIcon, KeyboardIcon, LockOpen1Icon, PlusCircledIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { Fragment, useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import toast from "react-hot-toast"

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [queryId, setQueryId] = useState(Math.random().toString())
  const myWorkspaces = useFetch("my workspaces", endPoints.findMyWorkspaces, HTTPMethods.POST, {}, true, queryId)
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
          <Row className="mt-2 mb-2">
            <Col className="categorycol">
              <LockOpen1Icon />
            </Col>
            <Col>
              <p className="boxcategory-key">Client ID</p>
              <div className="boxcategory-value">
                {maskCredential(userState.clientId)}<CopyIcon className="icon-right" onClick={(): void => copyCredential(userState.clientId)} />
              </div>
            </Col>
          </Row>
          <Row className="mt-2 mb-2">
            <Col className="categorycol">
              <KeyboardIcon />
            </Col>
            <Col>
              <p className="boxcategory-key">Client Secret</p>
              <div className="boxcategory-value">
                {maskCredential(userState.clientSecret)}<CopyIcon className="icon-right" onClick={(): void => copyCredential(userState.clientSecret)} />
              </div>
            </Col>
          </Row>
          <Button onClick={createWorkspace} className="btn-block"><PlusCircledIcon className="icon-left" />Create New Workspace</Button>
        </div>
      </Show>
      <Show when={myWorkspaces.isLoading}>
        <Loading />
      </Show>
      {promptDialog()}
    </Fragment>
  )
}
