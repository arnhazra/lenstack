export type EventUnion = {
  WorkspaceChangeEvent: () => Promise<void>
}