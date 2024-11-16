import { Types } from "mongoose"

export default function objectId(param: string) {
  return new Types.ObjectId(param)
}
