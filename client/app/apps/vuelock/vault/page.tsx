"use client"
import Error from "@/_components/ErrorComp"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useConfirm from "@/_hooks/useConfirm"
import useFetch from "@/_hooks/useFetch"
import { ArchiveIcon, CopyIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment, useContext } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { AppContext } from "@/_context/appStateProvider"
import { toast } from "react-hot-toast"
import Constants from "@/_constants/appConstants"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const searchParams = useSearchParams()
  const vaultId = searchParams.get("vaultId")
  const vault = useFetch("view vault", `${endPoints.vuelockViewVaultEndpoint}?vaultId=${vaultId}`, HTTPMethods.POST, { apiKey: userState.apiKey }, true)
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()

  const secretsToDisplay = vault?.data?.secrets?.map((secret: any) => {
    return (
      <tr key={secret._id}>
        <td>{secret.key}</td>
        <td>{secret.secretValue}</td>
      </tr>
    )
  })

  const archiveVault = async () => {
    const userConsent = await confirm("Are you sure to archive this vault?")

    if (userConsent) {
      await axios.delete(`${endPoints.vuelockDeleteVaultEndpoint}?vaultId=${vaultId}`)
      router.push("/apps/vuelock")
    }
  }

  const copyVaultId = (): void => {
    navigator.clipboard.writeText(`${vault?.data?.vault?.vaultId}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  const copyVaultSecret = (): void => {
    navigator.clipboard.writeText(`${vault?.data?.vault?.vaultSecret}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  return (
    <Fragment>
      <Show when={!vault?.isLoading}>
        <Show when={!vault.error || !!vaultId}>
          <Container>
            <div className="jumbotron p-4">
              <p className="display-6 text-capitalize">{vault?.data?.vault?.name}</p>
              <p className="lead mt-3">Your Vault secrets will be displayed below (if any)</p>
              <Button onClick={copyVaultId}>Copy Vault Id<CopyIcon className="icon-right" /></Button>
              <Button onClick={copyVaultSecret}>Copy Vault Secret<CopyIcon className="icon-right" /></Button>
              <Button onClick={archiveVault}>Archive Vault<ArchiveIcon className="icon-right" /></Button>
            </div>
            <Show when={!!vault?.data?.secrets && vault?.data?.secrets.length}>
              <h4 className="text-white">secrets</h4>
              <Table responsive hover variant="light">
                <thead>
                  <tr>
                    <th>Secret Key</th>
                    <th>Secret Value</th>
                  </tr>
                </thead>
                <tbody>
                  {secretsToDisplay}
                </tbody>
              </Table>
            </Show>
            {confirmDialog()}
          </Container>
        </Show>
        <Show when={!!vault.error || !vaultId}>
          <Error />
        </Show>
      </Show>
      <Show when={vault?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
