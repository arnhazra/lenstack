import { Injectable } from "@nestjs/common"
import { VuelockVaultModel } from "./entities/vuelock-vault.entity"
import { VuelockSecretModel } from "./entities/vuelock-secret.entity"

@Injectable()
export class VuelockRepository {
  async countVaults(userId: string) {
    const count = await VuelockVaultModel.find({ owner: userId }).count()
    return count
  }

  async createVault(owner: string, name: string, vaultId: string, vaultSecret: string) {
    const vault = new VuelockVaultModel({ owner, name, vaultId, vaultSecret })
    await vault.save()
    return vault
  }

  async getVaultsByUserId(owner: string) {
    const vaults = await VuelockVaultModel.find({ owner })
    return vaults
  }

  async findVaultById(vaultId: string) {
    const vault = await VuelockVaultModel.findById(vaultId)
    return vault
  }

  async findVault(vaultId: string, vaultSecret: string) {
    const vault = await VuelockVaultModel.findOne({ vaultId, vaultSecret })
    return vault
  }

  async findSecretsByVaultId(owner: string, vaultId: string) {
    const secrets = await VuelockSecretModel.find({ owner, vaultId }).select("-apiKey -owner -vaultId").sort({ createdAt: -1 })
    return secrets
  }

  async deleteVaultById(owner: string, vaultId: string) {
    await VuelockSecretModel.deleteMany({ owner, vaultId })
    await VuelockVaultModel.findByIdAndDelete(vaultId)
    return true
  }

  async createSecrets(userId: string, vaultId: string, key: string, secretValue: string, apiKey: string) {
    const secrets = new VuelockSecretModel({ owner: userId, vaultId, key, secretValue, apiKey })
    await secrets.save()
    return true
  }

  async deleteSecretById(owner: string, secretId: string) {
    await VuelockSecretModel.findOneAndDelete({ owner, _id: secretId })
    return true
  }
}
