import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Data } from "./schemas/data.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model, Types } from "mongoose"

@Injectable()
export class HttpNosqlRepository {
  constructor(@InjectModel(Data.name, DbConnectionMap.HttpNoSql) private model: Model<Data>) { }

  async createKeyValue(orgId: string, key: string, value: string) {
    try {
      const data = await this.model.find({ key, orgId })

      if (data.length > 0) {
        throw new BadRequestException("Same Key Exists")
      }

      const doc = new this.model({ orgId: new Types.ObjectId(orgId), key, value })
      await doc.save()
      return doc
    }

    catch (error) {
      throw error
    }
  }

  async readAllValues(orgId: string) {
    try {
      return await this.model.find({ orgId })
    }

    catch (error) {
      throw error
    }
  }

  async readValueByKey(orgId: string, key: string) {
    try {
      const data = await this.model.findOne({ orgId, key })
      if (!data) {
        throw new BadRequestException("Key does not exist")
      }

      return data
    }

    catch (error) {
      throw error
    }
  }

  async updateValueByKey(orgId: string, key: string, value: string) {
    try {
      const data = await this.model.findOne({ key, orgId })

      if (!data) {
        throw new BadRequestException("Key Does not Exist")
      }

      data.value = value
      await data.save()
      return data
    }

    catch (error) {
      throw error
    }
  }

  async deleteValueByKey(orgId: string, key: string) {
    try {
      const data = await this.model.find({ key, orgId })

      if (data.length === 0) {
        throw new BadRequestException("Key does not Exist")
      }

      await this.model.findOneAndDelete({ orgId, key })
      return { success: true }
    }

    catch (error) {
      throw error
    }
  }
}
