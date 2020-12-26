import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Shame from './shame.entity';
import { ShameDocument } from './shame.schema';

@Injectable()
export default class ShameRepository {
  constructor(
    @InjectModel(Shame.name) private ShameCollection: Model<ShameDocument>,
  ) {}

  /**
   * Persist a new Shame in persistence layer
   * @param shame Shame to be persisted
   * @returns Persisted Shame
   */
  async create(shame: Shame): Promise<Shame> {
    const shameDocument: ShameDocument = new this.ShameCollection(shame);
    return shameDocument.save();
  }

  /**
   * List all persisted Shames
   * @returns Array of persisted Shames
   */
  async list(): Promise<Array<Shame>> {
    return this.ShameCollection.find().exec();
  }

  /**
   * Removes a Shame from persistence layer
   * @param id Shame ID
   * @returns Shame removed from persistence layer
   */
  async delete(id: string): Promise<Shame> {
    return this.ShameCollection.findByIdAndDelete(id).exec();
  }
}
