import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { CreateKvDto } from "./dto/create-kv.dto"
import { createKv } from "./commands/create-kv.command"
import { readKvsByWorkspaceId } from "./commands/delete-kv.command"
import { deleteKvById } from "./queries/get-kv-list.query"

@Injectable()
export class KvstoreService {
  async createKv(workspaceId: string, createKvDto: CreateKvDto) {
    try {
      const { key, value } = createKvDto
      await createKv(workspaceId, key, value)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async readKvList(workspaceId: string) {
    try {
      const kvs = await readKvsByWorkspaceId(workspaceId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteKv(workspaceId: string, kvId: string) {
    try {
      const item = await deleteKvById(workspaceId, kvId)

      if (item) {
        return { success: true }
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }
}
