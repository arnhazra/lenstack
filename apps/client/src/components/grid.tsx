import { ReactNode } from "react"

interface GridProps {
  children: ReactNode
  sm: number
  md: number
  lg: number
  xl: number
}

export default function Grid({ children, sm, md, lg, xl }: GridProps) {
  return (
    <div className={`grid sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl} gap-6`}>
      {children}
    </div>
  )
}
