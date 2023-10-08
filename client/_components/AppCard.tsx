import { FC } from "react"
import { Card, Col, Badge } from "react-bootstrap"
import { AppCardProps } from "@/_types/Types"
import { useRouter } from "next/navigation"

const AppCard: FC<AppCardProps> = ({ appName, description, appStatus }) => {
  const router = useRouter()

  const redirectToApp = () => {
    if (appStatus === "Available") {
      router.push(`/apps?appName=${appName}`)
    }
  }

  return (
    <Col xs={12} sm={12} md={6} lg={6} xl={3} className="mb-4">
      <Card onClick={redirectToApp} className={`app-card-${appName.toLowerCase()}`}>
        <Badge bg="dark" pill className="position-absolute mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{appStatus}</Badge>
        <Card.Header className="pb-2 ps-4 app-card-header">
          <p className="branding app-name pb-2 ps-4">{appName}</p>
        </Card.Header>
        <Card.Footer className="pt-4 ps-4 app-card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <p className="smalltext">{description}</p>
          </div>
        </Card.Footer>
      </Card>
    </Col >
  )
}

export default AppCard
