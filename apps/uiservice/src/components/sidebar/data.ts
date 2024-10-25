export const getBreadcrumbTitle = (uri: string) => {
  if (uri.includes("apireference")) {
    return "API Reference"
  }

  if (uri.includes("settings")) {
    return "Settings"
  }

  if (uri.includes("datamarketplace")) {
    return "Data MarketPlace"
  }

  if (uri.includes("httpnosql")) {
    return "HTTP NoSQL"
  }

  if (uri.includes("intelligence")) {
    return "Intelligence"
  }

  if (uri.includes("webanalytics")) {
    return "Web Analytics"
  }

  return ""
}
