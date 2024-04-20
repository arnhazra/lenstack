export function convertToTitleCase(str: string) {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase()
  }).replace(/([A-Z])/g, ' $1').trim()
}