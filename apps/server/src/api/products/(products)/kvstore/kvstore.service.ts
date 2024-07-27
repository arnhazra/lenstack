import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { CreateKvDto } from "./dto/create-kv.dto"
import { createKv } from "./commands/create-kv.command"
import { readKvsByOrgId } from "./commands/delete-kv.command"
import { deleteKvById } from "./queries/get-kv-list.query"

@Injectable()
export class KvstoreService {
  async createKv(orgId: string, createKvDto: CreateKvDto) {
    try {
      const { key, value } = createKvDto
      await createKv(orgId, key, value)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async readKvList(orgId: string) {
    try {
      const kvs = await readKvsByOrgId(orgId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteKv(orgId: string, kvId: string) {
    try {
      const item = await deleteKvById(orgId, kvId)

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
