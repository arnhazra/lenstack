import Constants from "@/constants/global.constants"
import toast from "react-hot-toast"

export const copyCredential = (credential: string | null): void => {
  navigator.clipboard.writeText(`${credential}`)
  toast.success(Constants.CopiedToClipBoard)
}