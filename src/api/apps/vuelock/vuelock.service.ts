import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { CreateSecretDto } from "./dto/create-secret.dto"
import { CreateVaultDto } from "./dto/create-vault.dto"
import { VuelockRepository } from "./vuelock.repository"

@Injectable()
export class VuelockService {
  constructor(private readonly vuelockRepository: VuelockRepository) { }

  async createVault(userId: string, createVaultDto: CreateVaultDto) {
    try {
      const { name } = createVaultDto
      const count = await this.vuelockRepository.countVaults(userId)

      if (count < 10) {
        const vaultId = randomBytes(16).toString("hex")
        const vaultSecret = randomBytes(32).toString("hex")
        const vault = await this.vuelockRepository.createVault(userId, name, vaultId, vaultSecret)
        return vault
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getMyVaults(userId: string) {
    try {
      const vaults = await this.vuelockRepository.getVaultsByUserId(userId)
      return vaults
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewVault(userId: string, vaultId: string) {
    try {
      const vault = await this.vuelockRepository.findVaultById(vaultId)
      const { owner } = vault

      if (owner.toString() === userId) {
        const secrets = await this.vuelockRepository.findSecretsByVaultId(userId, vault.id)
        return { vault, secrets }
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteVault(userId: string, vaultId: string) {
    try {
      const vault = await this.vuelockRepository.findVaultById(vaultId)
      const { owner } = vault
      if (owner.toString() === userId) {
        await this.vuelockRepository.deleteVaultById(userId, vaultId)
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

  async createSecret(userId: string, createSecretDto: CreateSecretDto) {
    try {
      const { apiKey, key, secretValue, vaultId, vaultSecret } = createSecretDto
      const vault = await this.vuelockRepository.findVault(vaultId, vaultSecret)

      if (vault.owner.toString() === userId) {
        const vaultId = vault.id
        await this.vuelockRepository.createSecrets(userId, vaultId, key, secretValue, apiKey)
        return true
      }

      else {
        throw new ForbiddenException()
      }
    }

    catch (error) {
      throw new ForbiddenException()
    }
  }

  async deleteSecret(userId: string, secretId: string) {
    try {
      await this.vuelockRepository.deleteSecretById(userId, secretId)
      return true
    }

    catch (error) {
      throw new NotFoundException()
    }
  }
}
