export type EventUnion = {
  OrganizationChangeEvent: () => Promise<void>
  SearchEvent: (searchKeyword: string) => Promise<void>
}