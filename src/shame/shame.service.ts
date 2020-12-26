import { Injectable } from '@nestjs/common';
import Shame from './shame.entity';
import ShameRepository from './shame.repository';

@Injectable()
export default class ShameService {
  constructor(private readonly shameRepository: ShameRepository) {}

  /**
   * List all shames
   * @returns Array of Shame
   */
  async list(): Promise<Array<Shame>> {
    return this.shameRepository.list();
  }

  /**
   * Create a new shame
   * @param shame Shame that will be created
   * @returns The created Shame
   */
  async create(shame: Shame): Promise<Shame> {
    return this.shameRepository.create(shame);
  }

  /**
   * Delete a existing shame
   * @param id Shame ID
   * @returns The deleted Shame
   */
  async delete(id: string): Promise<Shame> {
    return this.shameRepository.delete(id);
  }
}
