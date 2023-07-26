"use client"
import { FC, ReactNode } from "react"
import { Container } from "react-bootstrap"

interface ContainerCompProps {
    children: ReactNode
}

const ContainerComp: FC<ContainerCompProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default ContainerComp