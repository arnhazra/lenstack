import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Data } from "./schemas/data.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model, Types } from "mongoose"
import { statusMessages } from "src/utils/constants/status-messages"

@Injectable()
export class HttpNosqlRepository {
  constructor(@InjectModel(Data.name, DbConnectionMap.HttpNoSql) private model: Model<Data>) { }

  async createKeyValue(orgId: string, key: string, value: string): Promise<Data | null> {
    try {
      const data = await this.model.find({ key, orgId })

      if (data.length > 0) {
        throw new BadRequestException(statusMessages.keyAlreadyExists)
      }

      const doc = new this.model({ orgId: new Types.ObjectId(orgId), key, value })
      await doc.save()
      return doc
    }

    catch (error) {
      throw error
    }
  }

  async readAllValues(orgId: string): Promise<Data[] | null> {
    try {
      return await this.model.find({ orgId })
    }

    catch (error) {
      throw error
    }
  }

  async readValueByKey(orgId: string, key: string): Promise<Data | null> {
    try {
      const data = await this.model.findOne({ orgId, key })
      if (!data) {
        throw new BadRequestException(statusMessages.keyDoesNotExist)
      }

      return data
    }

    catch (error) {
      throw error
    }
  }

  async updateValueByKey(orgId: string, key: string, value: string): Promise<Data | null> {
    try {
      const data = await this.model.findOne({ key, orgId })

      if (!data) {
        throw new BadRequestException(statusMessages.keyDoesNotExist)
      }

      data.value = value
      await data.save()
      return data
    }

    catch (error) {
      throw error
    }
  }

  async deleteValueByKey(orgId: string, key: string): Promise<Data | null> {
    try {
      const data = await this.model.find({ key, orgId })

      if (data.length === 0) {
        throw new BadRequestException(statusMessages.keyDoesNotExist)
      }

      return await this.model.findOneAndDelete({ orgId, key })
    }

    catch (error) {
      throw error
    }
  }
}
