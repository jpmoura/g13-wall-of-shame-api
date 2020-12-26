import CreateShameDto from './dtos/create-shame.dto';
import ShameDto from './dtos/shame.dto';
import Shame from './shame.entity';

export default class ShameConverter {
  /**
   * Convert a ShameDto into a Shame entity
   * @param dto The DTO that will be converted into an entity
   */
  static toEntity(dto: CreateShameDto): Shame {
    const entity: Shame = new Shame();
    entity.event = dto.event;
    entity.date = dto.date;
    entity.reason = dto.reason;

    return entity;
  }

  /**
   * Convert a Shame entity into a ShameDto
   * @param entity The Entity that will be converted into a DTO
   */
  static toDto(entity: Shame): ShameDto {
    return {
      date: entity.date,
      event: entity.event,
      id: entity.id,
      reason: entity.reason,
    } as ShameDto;
  }
}
