"use client"
import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons"
import { Button, Col } from "react-bootstrap"

interface OptionProps {
  isSelected: boolean
  value: string
  label: string
  handleChange: (value: string) => void
}

export default function Option({ isSelected, value, label, handleChange }: OptionProps) {
  return (
    <Col>
      <Button variant="secondary" className="btn-block" onClick={() => handleChange(value)}>
        {isSelected ? <CheckCircledIcon className="icon-left" /> : <CircleIcon className="icon-left" />}{label}
      </Button>
    </Col>
  )
}
