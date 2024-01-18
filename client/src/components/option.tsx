"use client"
import { RocketIcon } from "@radix-ui/react-icons"
import { Button } from "react-bootstrap"

interface OptionProps {
  isSelected: boolean
  value: string
  handleChange: (value: string) => void
}

export default function Option({ isSelected, value, handleChange }: OptionProps) {
  return (
    <Button variant={isSelected ? "primary" : "secondary"} className="btn-block text-capitalize" onClick={() => handleChange(value)}>
      <RocketIcon className="icon-left" />{value}
    </Button>
  )
}
