import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Data } from "./schemas/data.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model, Types } from "mongoose"
import { statusMessages } from "src/shared/utils/constants/status-messages"

@Injectable()
export class HttpNosqlRepository {
  constructor(
    @InjectModel(Data.name, DbConnectionMap.HttpNoSql)
    private model: Model<Data>
  ) {}

  async createKeyValue(
    workspaceId: string,
    key: string,
    value: Record<string, any> | Record<string, any>[] | string | string[]
  ): Promise<Data | null> {
    try {
      const data = await this.model.find({
        key,
        workspaceId: new Types.ObjectId(workspaceId),
      })

      if (data.length > 0) {
        throw new BadRequestException(statusMessages.keyAlreadyExists)
      }

      const doc = new this.model({
        workspaceId: new Types.ObjectId(workspaceId),
        key,
        value,
      })
      await doc.save()
      return doc
    } catch (error) {
      throw error
    }
  }

  async readAllValues(workspaceId: string): Promise<Data[] | null> {
    try {
      return await this.model.find({
        workspaceId: new Types.ObjectId(workspaceId),
      })
    } catch (error) {
      throw error
    }
  }

  async readValueByKey(workspaceId: string, key: string): Promise<Data | null> {
    try {
      const data = await this.model.findOne({
        workspaceId: new Types.ObjectId(workspaceId),
        key,
      })

      if (!data) {
        throw new BadRequestException(statusMessages.keyDoesNotExist)
      }

      return data
    } catch (error) {
      throw error
    }
  }

  async updateValueByKey(
    workspaceId: string,
    key: string,
    value: Record<string, any> | Record<string, any>[] | string | string[]
  ): Promise<Data | null> {
    try {
      const data = await this.model.findOne({
        key,
        workspaceId: new Types.ObjectId(workspaceId),
      })

      if (!data) {
        throw new BadRequestException(statusMessages.keyDoesNotExist)
      }

      data.value = value
      await data.save()
      return data
    } catch (error) {
      throw error
    }
  }

  async deleteValueByKey(
    workspaceId: string,
    key: string
  ): Promise<Data | null> {
    try {
      const data = await this.model.find({
        key,
        workspaceId: new Types.ObjectId(workspaceId),
      })

      if (data.length === 0) {
        throw new BadRequestException(statusMessages.keyDoesNotExist)
      }

      return await this.model.findOneAndDelete({
        workspaceId: new Types.ObjectId(workspaceId),
        key,
      })
    } catch (error) {
      throw error
    }
  }
}
