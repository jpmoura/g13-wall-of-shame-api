import { IsMongoId, IsNotEmpty } from 'class-validator';

export default class FindOneParams {
  /**
   * Resource ID
   */
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
