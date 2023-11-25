import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { CreateKvDto } from "./dto/create-kv.dto"
import { CreateDbDto } from "./dto/create-db.dto"
import { FabricRepository } from "./fabric.repository"

@Injectable()
export class FabricService {
  constructor(private readonly fabricRepository: FabricRepository) { }

  async createDb(workspaceId: string, createDbDto: CreateDbDto) {
    try {
      const { name } = createDbDto
      const count = await this.fabricRepository.countDbs(workspaceId)

      if (count < 10) {
        const dbId = randomBytes(16).toString("hex")
        const dbPassword = randomBytes(32).toString("hex")
        const db = await this.fabricRepository.createDb(workspaceId, name, dbId, dbPassword)
        return db
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getMyDbs(workspaceId: string, searchQuery: string) {
    try {
      const dbs = await this.fabricRepository.getDbsByWorkspaceId(workspaceId, searchQuery)
      return dbs
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewDb(workspaceId: string, dbId: string) {
    try {
      const db = await this.fabricRepository.findDbById(dbId)

      if (db.workspaceId.toString() === workspaceId) {
        const kvs = await this.fabricRepository.findKvsByDbId(workspaceId, db.id)
        return { db, kvs }
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async viewDbOutsidePlatform(workspaceId: string, dbId: string, dbPassword: string) {
    try {
      const db = await this.fabricRepository.findDb(dbId, dbPassword)

      if (db.workspaceId.toString() === workspaceId) {
        const kvs = await this.fabricRepository.findKvsByDbId(workspaceId, db.id)
        return { db, kvs }
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteDb(workspaceId: string, dbId: string) {
    try {
      const db = await this.fabricRepository.findDbById(dbId)
      if (db.workspaceId.toString() === workspaceId) {
        await this.fabricRepository.deleteDbById(workspaceId, dbId)
        return true
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async createKv(workspaceId: string, createKvDto: CreateKvDto) {
    try {
      const { key, value, dbId, dbPassword } = createKvDto
      const db = await this.fabricRepository.findDb(dbId, dbPassword)

      if (db.workspaceId.toString() === workspaceId) {
        const dbId = db.id
        await this.fabricRepository.createKv(workspaceId, dbId, key, value)
        return true
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async deleteKv(workspaceId: string, kvId: string) {
    try {
      const item = await this.fabricRepository.deleteKvById(workspaceId, kvId)
      if (item) {
        return true
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
