import { Injectable } from '@nestjs/common';
import { Workspace } from './models/workspace.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWorkspace } from './models/userWorkspace.model';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private repository: Repository<Workspace>,
    @InjectRepository(UserWorkspace)
    private userWorkspaceRepository: Repository<UserWorkspace>,
  ) {}

  async createOne(workspace: any, user: any): Promise<Workspace> {
    try {
      const newWorspace = await this.repository.save(workspace);
      await this.userWorkspaceRepository.save({
        userId: user.userId,
        workspaceId: newWorspace.workspaceId,
      });
      return newWorspace;
    } catch (error) {
      throw error;
    }
  }

  async getOne(workspaceId: number) {
    return await this.repository.findOne({
      where: { workspaceId },
      relations: ['channels'],
    });
  }

  async getAll(userId: number) {
    return await this.repository.find();
  }

  async filter(accountId: number, workspaceId: number, params: any) {
    const whereOptions: FindOptionsWhere<Workspace> = {
      workspaceId,
      accountId,
    };
    if (params) {
      console.log(params);
    }
    return await this.repository.findOne({
      where: whereOptions,
      relations: ['channels'],
    });
  }
}
