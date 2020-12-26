import { IsDateString, IsNotEmpty, MaxLength } from 'class-validator';

export default class CreateShameDto {
  /**
   * Event name
   * @example John Doe Birthday
   */
  @IsNotEmpty()
  @MaxLength(255)
  event: string;

  /**
   * Reason for not going to the event
   * @example He was sick
   */
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;

  /**
   * Event date
   * @example 2020-12-24T20:56:05.525Z
   */
  @IsDateString()
  date: Date;
}
