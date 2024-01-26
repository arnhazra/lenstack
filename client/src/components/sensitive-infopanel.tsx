import { uiConstants } from "@/constants/global-constants"
import { CopyIcon } from "@radix-ui/react-icons"
import { ReactNode } from "react"
import { Col, Row } from "react-bootstrap"
import toast from "react-hot-toast"

interface SensitiveInfoPanelInterface {
  credentialIcon: ReactNode
  credentialName: string
  credentialValue: string
}

export default function SensitiveInfoPanel({ credentialIcon, credentialName, credentialValue }: SensitiveInfoPanelInterface) {
  const maskCredential = (credential: string | null): string => {
    const displayCredential = `(${credential?.substring(0, 3)}...${credential?.substring(credential?.length - 3)})`
    return displayCredential
  }

  const copyCredential = (credential: string | null): void => {
    navigator.clipboard.writeText(`${credential}`)
    toast.success(uiConstants.copiedToClipBoard)
  }

  return (
    <Row className="mt-3 mb-3">
      <Col className="categorycol">
        {credentialIcon}
      </Col>
      <Col>
        <p className="boxcategory-key">{credentialName}</p>
        <div className="boxcategory-value">
          {maskCredential(credentialValue)}<CopyIcon className="icon-right" onClick={(): void => copyCredential(credentialValue)} />
        </div>
      </Col>
    </Row>
  )
}