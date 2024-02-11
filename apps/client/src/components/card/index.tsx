import { ReactNode } from "react"
import { CubeIcon } from "@radix-ui/react-icons"
import "./style.sass"

export interface GenericCardInterface {
  headerText: ReactNode
  footerText: ReactNode
}

export interface GenericCardProps {
  genericCardProps: GenericCardInterface
}

export default function GenericCard({ genericCardProps }: GenericCardProps) {
  return (
    <div className="generic-card pt-2 ps-4 pe-4 pb-1">
      <div className="generic-card-header">
        <p className="generic-card-header pt-2 pb-1">
          <CubeIcon className="icon-generic" />
          {genericCardProps.headerText}
        </p>
      </div>
      <div className="generic-card-footer pt-1">
        <p className="muted-text">
          {genericCardProps.footerText}
        </p>
      </div>
    </div>
  )
}