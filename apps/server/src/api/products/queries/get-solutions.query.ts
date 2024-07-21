import { SolutionModel } from "../models/solutions.model"

export async function getSolutionsQuery() {
  const solutions = await SolutionModel.find()
  return solutions
}