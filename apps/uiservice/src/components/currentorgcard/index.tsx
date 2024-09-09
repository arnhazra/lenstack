import { GlobalContext } from "@/context/providers/globalstate.provider"
import { useContext } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Orbit } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function CurrentOrgCard() {
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Organization
        </CardTitle>
        <Orbit className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {userState.selectedOrgName}
        </div>
        <p className="text-sm text-slate-600">
          Your current organization
        </p>
      </CardContent>
      <CardFooter className="-mt-3">
        <Button onClick={(): void => router.push("/account?tab=organization")}>View Organizations</Button>
      </CardFooter>
    </Card>
  )
}
