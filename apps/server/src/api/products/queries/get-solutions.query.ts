import { SolutionModel } from "../schemas/solutions.schema"

export async function getSolutionsQuery() {
  const solutions = await SolutionModel.find()
  return solutions
}