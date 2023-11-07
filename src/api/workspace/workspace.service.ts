import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { WorkspaceRepository } from "./workspace.repository"
import { statusMessages } from "src/constants/statusMessages"

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) { }

  async createWorkspace(userId: string, createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const { name } = createWorkspaceDto
      const workspace = await this.workspaceRepository.createWorkspace(name, userId)
      return workspace
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async findMyWorkspaces(userId: string) {
    try {
      const workspaces = await this.workspaceRepository.findMyWorkspaces(userId)
      return workspaces
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async removeWorkspace(userId: string, workspaceId: string) {
    try {
      const { ownerId } = await this.workspaceRepository.findWorkspaceById(workspaceId)

      if (ownerId.toString() === userId) {
        await this.workspaceRepository.deleteWorkspaceById(workspaceId)
        return true
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
