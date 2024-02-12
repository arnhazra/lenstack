import { ReactNode } from "react"
import { CubeIcon } from "@radix-ui/react-icons"
import "./style.sass"

export interface GenericCardProps {
  header: string
  footer: ReactNode
}

export function GenericCard({ header, footer }: GenericCardProps) {
  return (
    <div className="generic-card pt-2 ps-4 pe-4 pb-1">
      <div className="generic-card-header">
        <p className="generic-card-header pt-2 pb-1">
          <CubeIcon className="icon-generic" />
          {header}
        </p>
      </div>
      <div className="generic-card-footer pt-1">
        {footer}
      </div>
    </div>
  )
}