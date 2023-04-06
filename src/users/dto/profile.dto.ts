import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  age: number;
}

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  age?: number;
}
