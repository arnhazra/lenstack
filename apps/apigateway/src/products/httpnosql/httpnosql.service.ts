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

  async createKeyValue(workspaceId: string, createDataDto: CreateDataDto) {
    try {
      const { key, value } = createDataDto
      return await this.commandBus.execute<CreateDataCommand, Data>(
        new CreateDataCommand(workspaceId, key, value)
      )
    } catch (error) {
      throw error
    }
  }

  async readAllValues(workspaceId: string) {
    try {
      return await this.queryBus.execute<ReadAllValuesQuery, Data[]>(
        new ReadAllValuesQuery(workspaceId)
      )
    } catch (error) {
      throw error
    }
  }

  async readValueByKey(workspaceId: string, key: string) {
    try {
      return await this.queryBus.execute<ReadValueByKeyQuery, Data>(
        new ReadValueByKeyQuery(workspaceId, key)
      )
    } catch (error) {
      throw error
    }
  }

  async updateValueByKey(workspaceId: string, updateDataDto: CreateDataDto) {
    try {
      const { key, value } = updateDataDto
      return await this.commandBus.execute<UpdateDataCommand, Data>(
        new UpdateDataCommand(workspaceId, key, value)
      )
    } catch (error) {
      throw error
    }
  }

  async deleteValueByKey(workspaceId: string, key: string) {
    try {
      return await this.commandBus.execute<DeleteDataCommand, Data>(
        new DeleteDataCommand(workspaceId, key)
      )
    } catch (error) {
      throw error
    }
  }
}
