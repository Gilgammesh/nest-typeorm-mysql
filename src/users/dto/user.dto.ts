import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { UserAuthStrategy } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([UserAuthStrategy.AUTH0, UserAuthStrategy.AZURE])
  authStrategy: UserAuthStrategy;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([UserAuthStrategy.AUTH0, UserAuthStrategy.AZURE])
  @IsOptional()
  authStrategy?: UserAuthStrategy;
}
