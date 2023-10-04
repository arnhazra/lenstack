import { FC } from "react"
import { Button, Card, Col } from "react-bootstrap"
import { AppCardProps } from "@/_types/Types"
import { useRouter } from "next/navigation"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

const AppCard: FC<AppCardProps> = ({ appName, description, url, appAvailable, dbRegion }) => {
  const router = useRouter()

  const redirectToApp = () => {
    if (appAvailable) {
      router.push(url)
    }
  }

  return (
    <Col xs={12} sm={12} md={6} lg={6} xl={3} className="mb-4">
      <Card onClick={redirectToApp} className={`app-card-${appName.toLowerCase()}`}>
        <Card.Header className="pb-2 ps-4 app-card-header">
          <p className="branding app-name pb-2 ps-4">{appName}</p>
          <Button className="circle-btn mb-3"><ArrowTopRightIcon /></Button>
        </Card.Header>
        <Card.Footer className="pt-4 ps-4 app-card-footer">
          <p className="smalltext">{description}</p>
        </Card.Footer>
      </Card>
    </Col >
  )
}

export default AppCard