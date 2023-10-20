"use client"
import { Card, Col } from "react-bootstrap"
import { DatasetCardProps } from "@/_types/Types"
import { Rating } from "react-simple-star-rating"
import Link from "next/link"

export default function DatasetCard({ id, category, name, rating }: DatasetCardProps) {
  return (
    <Col xs={6} sm={6} md={4} lg={4} xl={2} className="mb-4">
      <Link href={`/apps/airlake/dataset?datasetid=${id}`}>
        <Card className="dataset-card">
          <Card.Header className="pt-3 dataset-card-header">
            <div className={`${category?.toLowerCase()}Container pt-4`} />
          </Card.Header>
          <Card.Footer className={`pt-4 pb-2 ps-4 ${category?.toLowerCase()}Color dataset-card-footer`}>
            <div className="nameContainer">
              <p>{name}</p>
            </div>
            <p className="category">{category}</p>
            <Rating className="card-rating" initialValue={rating} allowHover={false} allowFraction size={15} readonly />
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}