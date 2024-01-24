"use client"
import { RocketIcon } from "@radix-ui/react-icons"
import { Button, Col } from "react-bootstrap"

interface OptionProps {
  isSelected: boolean
  value: string
  handleChange: (value: string) => void
}

export default function Option({ isSelected, value, handleChange }: OptionProps) {
  return (
    <Col>
      <Button variant={isSelected ? "primary" : "secondary"} className="btn-block text-capitalize" onClick={() => handleChange(value)}>
        <RocketIcon className="icon-left" />{value}
      </Button>
    </Col>
  )
}
