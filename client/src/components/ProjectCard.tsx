"use client"
import { FC } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { ProjectCardProps } from '@/types/Types'
import Link from 'next/link'

const ProjectCard: FC<ProjectCardProps> = ({ id, name }) => {
    return (
        <Col xs={6} sm={6} md={4} lg={4} xl={2} className='mb-4'>
            <Link href={`/products/frostlake/viewproject/${id}`}>
                <Card className='project-card'>
                    <Card.Header className='pt-3 project-card-header'>
                        <div className={`projectContainer pt-4`} />
                    </Card.Header>
                    <Card.Footer className={`pt-4 pb-2 ps-4 projectColor project-card-footer`}>
                        <div className='nameContainer'>
                            <Button className='tag-chip mb-3'>{name}</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Link>
        </Col>
    )
}

export default ProjectCard