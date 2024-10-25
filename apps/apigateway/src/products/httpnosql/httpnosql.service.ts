import { Injectable } from "@nestjs/common"
import { CreateDataDto } from "./dto/create-data.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateDataCommand } from "./commands/impl/create-data.command"
import { UpdateDataCommand } from "./commands/impl/update-data.command"
import { DeleteDataCommand } from "./commands/impl/delete-data.command"
import { ReadAllValuesQuery } from "./queries/impl/read-all-values.query"
import { ReadValueByKeyQuery } from "./queries/impl/read-value-by-key.query"
import { Data } from "./schemas/data.schema"

@Injectable()
export class HttpNosqlService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createKeyValue(orgId: string, createDataDto: CreateDataDto) {
    try {
      const { key, value } = createDataDto
      return await this.commandBus.execute<CreateDataCommand, Data>(
        new CreateDataCommand(orgId, key, value)
      )
    } catch (error) {
      throw error
    }
  }

  async readAllValues(orgId: string) {
    try {
      return await this.queryBus.execute<ReadAllValuesQuery, Data[]>(
        new ReadAllValuesQuery(orgId)
      )
    } catch (error) {
      throw error
    }
  }

  async readValueByKey(orgId: string, key: string) {
    try {
      return await this.queryBus.execute<ReadValueByKeyQuery, Data>(
        new ReadValueByKeyQuery(orgId, key)
      )
    } catch (error) {
      throw error
    }
  }

  async updateValueByKey(orgId: string, updateDataDto: CreateDataDto) {
    try {
      const { key, value } = updateDataDto
      return await this.commandBus.execute<UpdateDataCommand, Data>(
        new UpdateDataCommand(orgId, key, value)
      )
    } catch (error) {
      throw error
    }
  }

  async deleteValueByKey(orgId: string, key: string) {
    try {
      return await this.commandBus.execute<DeleteDataCommand, Data>(
        new DeleteDataCommand(orgId, key)
      )
    } catch (error) {
      throw error
    }
  }
}
