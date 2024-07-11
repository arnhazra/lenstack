export type EventUnion = {
  WorkspaceChangeEvent: () => Promise<void>
  SearchEvent: (searchKeyword: string) => Promise<void>
}