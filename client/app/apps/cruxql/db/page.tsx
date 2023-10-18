"use client"
import DbCard from "@/_components/DbCard"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import appConstants from "@/_constants/appConstants"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import useFetchRealtime from "@/_hooks/useFetchRealtime"
import { CruxQlDb } from "@/_types/Types"
import { ArrowRightIcon, CopyIcon } from "@radix-ui/react-icons"
import { useSearchParams } from "next/navigation"
import { Badge, Button, Col, Container, Row } from "react-bootstrap"
import { toast } from "sonner"
import useConfirm from "@/_hooks/useConfirm"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "@/_context/appStateProvider"
import { useRouter } from "next/navigation"
import Error from "@/_components/ErrorComp"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { confirm, confirmDialog } = useConfirm()
  const dbId = searchParams.get("dbId")
  const apiKey = userState.apiKey
  const db = useFetchRealtime("view db", endPoints.cruxqlViewDatabase, HTTPMethods.POST, { dbId })
  const availableDbList = useFetch("availableDbList", endPoints.cruxqlGetAvailableDbList, HTTPMethods.POST)
  const selectedDb = db?.data?.dataBase

  const copyDbConnString = (): void => {
    navigator.clipboard.writeText(`${selectedDb?.connectionString}`)
    toast.success(appConstants.CopiedToClipBoard)
  }

  const purchaseDb = async () => {
    try {
      const userConsent = await confirm("Are you sure, you want to purchase this DB? Cost: 15000 tokens")
      if (userConsent) {
        await axios.post(endPoints.cruxqlPurchaseDb, { apiKey, dbId })
        router.push('/apps/cruxql/mydblist')
        toast.error(appConstants.ToastSuccess)
      }
    }

    catch (error) {
      toast.error(appConstants.ToastError)
    }
  }

  return (
    <Container>
      <Show when={!db.isLoading && !availableDbList.isLoading}>
        <Show when={!db.error && !!dbId}>
          <div className="jumbotron p-4">
            <div>
              <img src={process.env.NODE_ENV === "development" ? `http://localhost:3000/${selectedDb?.cloudPlatform}.png` : `https://lenstack.vercel.app/${selectedDb?.cloudPlatform}.png`} width="100" height="100"></img>
            </div>
            <p className="lead mt-2">Enable one-click deployment of {selectedDb?.cloudPlatform + ' ' + selectedDb?.region} MongoDB cluster with data privacy, ensuring cross-regional availability.</p>
            <Badge pill bg="dark" className="mt-2 me-2 mb-2 top-0 end-0 ps-3 pe-3 p-2" key={Math.random().toString()}>{selectedDb?.region}</Badge><br />
            <Show when={!!selectedDb?.connectionString}>
              <Button onClick={copyDbConnString}>Db Connection String <CopyIcon className="icon-right" /></Button>
            </Show>
            <Show when={!selectedDb?.connectionString}>
              <Button onClick={purchaseDb}>Deploy & Own<ArrowRightIcon className="icon-right" /></Button>
            </Show>
          </div>
          <h4 className="text-white mb-4">Other Databases</h4>
          <Row>
            {availableDbList?.data?.dbList?.map((db: CruxQlDb) => <DbCard key={db._id} db={db} />)}
          </Row>
        </Show>
        <Show when={db.error || !dbId}>
          <Error />
        </Show>
      </Show>
      <Show when={db.isLoading || availableDbList.isLoading}>
        <Loading />
      </Show>
      {confirmDialog()}
    </Container>
  )
}
