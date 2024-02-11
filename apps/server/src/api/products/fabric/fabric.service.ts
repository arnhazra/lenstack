import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { CreateKvDto } from "./dto/create-kv.dto"
import { FabricRepository } from "./fabric.repository"

@Injectable()
export class FabricService {
  constructor(private readonly fabricRepository: FabricRepository) { }

  async createKv(workspaceId: string, createKvDto: CreateKvDto) {
    try {
      const { key, value } = createKvDto
      await this.fabricRepository.createKv(workspaceId, key, value)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async readKvList(workspaceId: string) {
    try {
      const kvs = await this.fabricRepository.readKvsByWorkspaceId(workspaceId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteKv(workspaceId: string, kvId: string) {
    try {
      const item = await this.fabricRepository.deleteKvById(workspaceId, kvId)

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
