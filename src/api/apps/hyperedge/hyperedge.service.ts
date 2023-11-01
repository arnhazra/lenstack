import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { CreateKvDto } from "./dto/create-kv.dto"
import { CreateDbDto } from "./dto/create-db.dto"
import { HyperedgeRepository } from "./hyperedge.repository"

@Injectable()
export class HyperedgeService {
  constructor(private readonly hyperedgeRepository: HyperedgeRepository) { }

  async createDb(userId: string, createDbDto: CreateDbDto) {
    try {
      const { name } = createDbDto
      const count = await this.hyperedgeRepository.countDbs(userId)

      if (count < 10) {
        const dbId = randomBytes(16).toString("hex")
        const dbPassword = randomBytes(32).toString("hex")
        const db = await this.hyperedgeRepository.createDb(userId, name, dbId, dbPassword)
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

  async getMyDbs(userId: string) {
    try {
      const dbs = await this.hyperedgeRepository.getDbsByUserId(userId)
      return dbs
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewDb(userId: string, dbId: string) {
    try {
      const db = await this.hyperedgeRepository.findDbById(dbId)
      const { owner } = db

      if (owner.toString() === userId) {
        const kvs = await this.hyperedgeRepository.findKvsByDbId(userId, db.id)
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

  async deleteDb(userId: string, dbId: string) {
    try {
      const db = await this.hyperedgeRepository.findDbById(dbId)
      const { owner } = db
      if (owner.toString() === userId) {
        await this.hyperedgeRepository.deleteDbById(userId, dbId)
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

  async createKv(userId: string, createKvDto: CreateKvDto) {
    try {
      const { apiKey, key, value, dbId, dbPassword } = createKvDto
      const db = await this.hyperedgeRepository.findDb(dbId, dbPassword)

      if (db.owner.toString() === userId) {
        const dbId = db.id
        await this.hyperedgeRepository.createKv(userId, dbId, key, value)
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

  async deleteKv(userId: string, kvId: string) {
    try {
      await this.hyperedgeRepository.deleteKvById(userId, kvId)
      return true
    }

    catch (error) {
      throw new NotFoundException()
    }
  }
}
