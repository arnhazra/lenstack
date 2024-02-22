"use client"
import Loading from "@/components/loading"
import SensitiveInfoPanel from "@/components/infopanel/sensitive-infopanel"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { ArrowRightIcon, CheckCircledIcon, KeyboardIcon, LockOpen1Icon, PlusCircledIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { Fragment, useCallback, useContext, useState } from "react"
import { Badge, Button, Col, Container } from "react-bootstrap"
import toast from "react-hot-toast"
import Error from "@/components/error"
import { usePromptContext } from "@/context/providers/prompt.provider"
import { GenericCard, GenericCardProps } from "@/components/card"
import Grid from "@/components/grid"

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [queryId, setQueryId] = useState("DQID")
  const myWorkspaces = useQuery(["workspaces", queryId], endPoints.findMyWorkspaces, HTTPMethods.GET)
  const { prompt } = usePromptContext()

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
      dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
      toast.success("Workspace switched")
    }

    catch (error) {
      toast.error("Workspace switching failed")
    }
  }

  const displayWorkspaces = useCallback(() => {
    const workspacesToDisplay = myWorkspaces?.data?.myWorkspaces?.map((workspace: any) => {
      const workspaceCardProps: GenericCardProps = {
        header: workspace.name,
        footer: <Fragment>
          <Badge color="white" bg="light" pill className="ps-3 pe-3 p-2 ps-3 pe-3 p-2 align-self-start mb-4">Workspace</Badge>
          <SensitiveInfoPanel credentialIcon={<LockOpen1Icon />} credentialName="Client ID" credentialValue={workspace.clientId} />
          <SensitiveInfoPanel credentialIcon={<KeyboardIcon />} credentialName="Client Secret" credentialValue={workspace.clientSecret} />
          <Button variant="primary" disabled={userState.selectedWorkspaceId === workspace._id} className="btn-block" onClick={(): Promise<void> => switchWorkspace(workspace._id)}>
            <Suspense condition={userState.selectedWorkspaceId !== workspace._id} fallback={<>Selected Workspace<CheckCircledIcon className="icon-right" /></>}>
              Select Workspace<ArrowRightIcon className="icon-right" />
            </Suspense>
          </Button>
        </Fragment >,
      }

      return (
        <Col key={workspace._id} className="mb-3" >
          <GenericCard {...workspaceCardProps} />
        </Col>
      )
    })

    return (
      <Fragment>
        <h4 className="text-white">Workspace Manager</h4>
        <Grid>
          {workspacesToDisplay}
        </Grid>
      </Fragment>
    )
  }, [myWorkspaces?.data, userState.selectedWorkspaceId])

  return (
    <Suspense condition={!myWorkspaces.isLoading} fallback={<Loading />}>
      <Suspense condition={!myWorkspaces.error} fallback={<Error />}>
        <Container>
          {displayWorkspaces()}
          <Button onClick={createWorkspace}>Create Workspace <PlusCircledIcon className="icon-right" /></Button>
        </Container>
      </Suspense>
    </Suspense>
  )
}
