"use client"
import { ReactNode } from "react"
import Show from "@/shared/components/show"
import MaskText from "@/shared/components/mask"

interface SectionPanelProps {
  title: string
  icon: ReactNode
  content: string
  masked?: boolean
  actionComponent?: ReactNode
}

export default function SectionPanel({
  title,
  content,
  masked,
  actionComponent,
  icon,
}: SectionPanelProps) {
  return (
    <section className="grid gap-6 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="flex flex-row items-center gap-4">
          {icon}
          <div className="space-y-0.5">
            <p className="text-sm">{title}</p>
            <p className="text-sm text-slate-500">
              <Show condition={!!masked} fallback={content}>
                <MaskText value={content} />
              </Show>
            </p>
          </div>
        </div>
        <div>
          <Show condition={!!actionComponent}>{actionComponent}</Show>
        </div>
      </div>
    </section>
  )
}
