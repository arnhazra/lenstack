"use client"
import { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

function ReactQueryProvider({ children }: React.PropsWithChildren) {
    const [client] = useState(
        new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
    )

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider