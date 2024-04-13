import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="fixed inset-0 overflow-y-auto flex justify-center items-center">
        <div className="flex flex-col sm:gap-4 mt-6">
          <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2 p-3">
                  <div className="p-3">
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-[125px] w-[max] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[5]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[5]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <Skeleton className="h-8" />
                  </div>
                </Card>
                <Card className="sm:col-span-2 p-3">
                  <div className="p-3">
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-[125px] w-[max] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[5]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[5]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <Skeleton className="h-8" />
                  </div>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <TabsContent value="week">
                  <Card>
                    <div className="p-7">
                      <div><Skeleton className="h-4 w-[200px]" /></div>
                      <div>
                        <Skeleton className="h-4 mt-2 w-[100px]" />
                      </div>
                    </div>
                    <div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead><Skeleton className="h-4 w-[120px]" /></TableHead>
                            <TableHead className="hidden sm:table-cell">
                              <Skeleton className="h-4 w-[80px]" />
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              <Skeleton className="h-4 w-[80px]" />
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              <Skeleton className="h-4 w-[80px]" />
                            </TableHead>
                            <TableHead className="text-right"><Skeleton className="h-4 w-[80px]" /></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-accent">
                            <TableCell>
                              <div className="font-medium"><Skeleton className="h-4 w-[80px]" /></div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                <Skeleton className="h-4 mt-2 w-[120px]" />
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Skeleton className="h-4 w-[80px]" />
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Skeleton className="h-4 w-[80px]" />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Skeleton className="h-4 w-[80px]" />
                            </TableCell>
                            <TableCell className="text-right"><Skeleton className="h-4 w-[80px]" /></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Card className="overflow-hidden">
                <div className="flex flex-row items-start bg-muted/50 p-5">
                  <div className="grid gap-0.5">
                    <div className="group flex items-center gap-2 text-lg">
                      <Skeleton className="h-6 mt-2 w-[120px]" />
                    </div>
                    <div><Skeleton className="h-4 mt-2 w-[max]" /></div>
                  </div>
                </div>
                <div className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold"><Skeleton className="h-4 mt-2 w-[max]" /></div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          <Skeleton className="h-6 mt-2 w-[120px]" />
                        </span>
                        <Skeleton className="h-6 mt-2 w-[80px]" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          <Skeleton className="h-6 mt-2 w-[120px]" />
                        </span>
                        <Skeleton className="h-6 mt-2 w-[80px]" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          <Skeleton className="h-6 mt-2 w-[120px]" />
                        </span>
                        <Skeleton className="h-6 mt-2 w-[80px]" />
                      </li>
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          <Skeleton className="h-6 mt-2 w-[120px]" />
                        </span>
                        <Skeleton className="h-6 mt-2 w-[80px]" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          <Skeleton className="h-6 mt-2 w-[120px]" />
                        </span>
                        <Skeleton className="h-6 mt-2 w-[80px]" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          <Skeleton className="h-6 mt-2 w-[120px]" />
                        </span>
                        <Skeleton className="h-6 mt-2 w-[80px]" />
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                </div>
                <div className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    <Skeleton className="h-6 mt-2 w-[120px]" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
