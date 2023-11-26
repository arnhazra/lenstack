export const maskCredential = (credential: string | null): string => {
  const displayCredential = `(${credential?.substring(0, 3)}...${credential?.substring(credential?.length - 3)})`
  return displayCredential
}