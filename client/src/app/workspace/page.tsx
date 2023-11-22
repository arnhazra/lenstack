"use client"
import Hero from "@/components/hero.component"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/api.endpoints"
import HTTPMethods from "@/constants/http.methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useFetch from "@/hooks/useFetch"
import { CheckIcon, ExternalLinkIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import axios from "axios"
import moment from "moment"
import { FormEvent, Fragment, useContext, useState } from "react"
import { Badge, Button, Col, Container, Form, Row, Table } from "react-bootstrap"
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

  const workspacesToDisplayInTable = myWorkspaces?.data?.myWorkspaces?.map((workspace: any) => {
    return (
      <tr key={workspace._id}>
        <td>{workspace._id}</td>
        <td>{workspace.name}</td>
        <td>{workspace.ownerId}</td>
        <td>{moment(workspace.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
        <td>
          <Show when={userState.selectedWorkspaceId !== workspace._id}>
            <Badge onClick={(): any => switchWorkspace(workspace._id)} bg="dark" pill className="green-badge ps-3 pe-3 p-2 text-white">
              <ExternalLinkIcon className="icon-left" />
              Switch
            </Badge>
          </Show>
          <Show when={userState.selectedWorkspaceId === workspace._id}>
            <Badge bg="success" pill className="green-badge ps-3 pe-3 p-2 text-white">
              <CheckIcon className="icon-left" />
              Selected
            </Badge>
          </Show>
        </td>
      </tr>
    )
  })

  return (
    <Fragment>
      <Show when={!myWorkspaces.isLoading}>
        <Container>
          <Hero>
            <p className="branding">Workspace</p>
            <p className="muted-text mt-3">
              A workspace is your personalized hub within our application where
              you can create, organize, and collaborate on various projects or initiatives. It's like having
              a virtual office tailored to your needs. You can think of it as a dedicated space for each of
              your endeavors, allowing you to gather all related files, tasks, and team members in one place.
              With our workspaces, you have the flexibility to customize settings, invite team members, manage
              tasks, and track progress, enabling seamless organization and efficient teamwork on multiple fronts.
            </p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">Workspace</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">Workspace</Badge>
            </div>
            <Row className="g-2">
              <form onSubmit={createWorkspace}>
                <Col xs={12} sm={12} md={6} lg={4} xl={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Create Workspace</Form.Label>
                    <Form.Control disabled={isLoading} type="text" name="name" placeholder="Workspace Name" onChange={(e) => { setNewWorkspaceName(e.target.value) }} maxLength={15} required autoComplete={"off"} />
                  </Form.Group>
                  <Button disabled={isLoading} type="submit" className="btn-block"><PlusCircledIcon className="icon-left" />Create Workspace</Button>
                </Col>
              </form>
            </Row>
          </Hero>
          <h4 className="text-white">My Workspaces</h4>
          <Table responsive hover variant="light">
            <thead>
              <tr>
                <th>Workspace ID</th>
                <th>Workspace Name</th>
                <th>Owner ID</th>
                <th>Created On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workspacesToDisplayInTable}
            </tbody>
          </Table>
        </Container>
      </Show>
      <Show when={myWorkspaces.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
