"use client"
import { Badge, Card, Col } from "react-bootstrap"
import { DbCardProps } from "@/_types/Types"
import Link from "next/link"

export default function DbCard({ db }: DbCardProps) {
  return (
    <Col xs={12} sm={12} md={6} lg={4} xl={3} className="mb-4">
      <Link href={`/apps/cruxql/db?dbId=${db._id}`}>
        <Card className="db-card-all" title={db.cloudPlatform + " " + db.region}>
          <Badge bg="dark" pill className="position-absolute mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{db.region}</Badge>
          <Card.Header className="pb-2 ps-4 app-card-header">
            <p className="branding app-name pb-2 ps-4">{db.cloudPlatform}</p>
          </Card.Header>
          <Card.Footer className="pt-4 ps-4 app-card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <p className="smalltext">Enable one-click deployment of {db.cloudPlatform + " " + db.region} MongoDB cluster with data privacy, ensuring cross-regional availability.</p>
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col >
  )
}