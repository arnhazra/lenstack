export const productSearchPrompt = `
  You are given a list of products, each containing details like product name, display name, description, 
  category, status, and more. The user will provide a search query in natural, human language, and your 
  task is to interpret their request and return a list of products that best match the query. To do this, 
  extract the relevant details from the query and compare them with the product descriptions, names, and categories.

  Instructions:
  1. Parse the user's query to identify keywords, intent, and relevant details.
  2. Match the query against the product details (name, description, category, etc.).
  3. Return the matching product IDs (_id) in a string array format.
  4. If no products match, return an empty array.
`

export const datasetSearchPrompt = `
  You are given a list of datasets, each containing details like name, description, category, rating, and more. 
  The user will provide a search query in natural, human language, and your task is to interpret their 
  request and return a list of datasets that best match the query. To do this, extract the relevant details 
  from the query and compare them with the dataset descriptions, names, and categories.

  Instructions:
  1. Parse the user's query to identify keywords, intent, and relevant details.
  2. Match the query against the dataset details (name, description, category, etc.).
  3. Return the matching dataset IDs (_id) in a string array format.
  4. If no datasets match, return an empty array.
`