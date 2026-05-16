import { Expose, Type } from "class-transformer";
import { WorkshopResponseDto } from "src/workshop/dto/workshop-response.dto";

export class RegisterResponseDto {
  @Expose()
  @Type(() => WorkshopResponseDto)
  workshop: WorkshopResponseDto
}
