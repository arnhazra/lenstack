import { CheckCircle2 } from "lucide-react"

type TierCardComponentProps = {
  computeTier: string
  responseDelay: number
  estimatedRequestCost: Record<string, number>
}

export function TierCardComponent({
  computeTier,
  responseDelay,
  estimatedRequestCost,
}: TierCardComponentProps) {
  return (
    <div className="grid w-full items-start gap-10 rounded-lg border bg-white p-10 md:grid-cols-[1fr_100px]">
      <div className="grid gap-6">
        <h3 className="text-xl font-bold sm:text-2xl">
          <span className="capitalize">{computeTier} Compute Tier</span>
        </h3>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {Object.entries(estimatedRequestCost).map(([key, value]) => (
            <li
              className="flex items-center text-zinc-600 capitalize"
              key={key}
            >
              <CheckCircle2 className="scale-75" /> {key} $ {value.toFixed(2)}
              /req
            </li>
          ))}
          <li className="flex items-center text-zinc-600 capitalize">
            <CheckCircle2 className="scale-75" /> {responseDelay} ms network
            response time
          </li>
        </ul>
      </div>
    </div>
  )
}
