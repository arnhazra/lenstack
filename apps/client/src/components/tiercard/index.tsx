"use client"
import { Check } from "lucide-react"
import { Button } from "../ui/button"
import Suspense from "../suspense"

type TierCardComponentProps = {
  disabled: boolean,
  planName: string,
  price: number,
  grantedCredits: number,
  features: string[],
  handleClick: (planName: string) => void
}

export function TierCardComponent({ disabled, planName, price, grantedCredits, features }: TierCardComponentProps) {
  return (
    <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
      <div className="grid gap-6">
        <h3 className="text-xl font-bold sm:text-2xl">
          What's included in the <span className="uppercase">{planName}</span> plan
        </h3>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {
            features.map((feature) => (
              <li className="flex items-center text-slate-600" key={feature}>
                <Check className="mr-2 h-4 w-4" /> {feature}
              </li>
            ))
          }
          <li className="flex items-center text-slate-600">
            <Check className="mr-2 h-4 w-4" /> $ {Number(grantedCredits).toLocaleString()} API Requests
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h4 className="text-4xl font-bold">${price}</h4>
          <p className="text-sm font-medium text-muted-foreground">
            Billed Monthly
          </p>
        </div>
      </div>
    </div>
  )
}