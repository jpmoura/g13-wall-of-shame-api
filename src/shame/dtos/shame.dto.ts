export default class ShameDto {
  /**
   * Shame ID
   * @example 5e5fccac9d16bf2d325cd57a
   */
  id: string;

  /**
   * Event name
   * @example John Doe Birthday
   */
  event: string;

  /**
   * Reason for not going to the event
   * @example He was sick
   */
  reason: string;

  /**
   * Event date
   * @example 2020-12-24T20:56:05.525Z
   */
  date: Date;
}
