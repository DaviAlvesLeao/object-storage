import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class MinioVariables {
    @IsNotEmpty()
    @IsString()
    endPoint: string
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(65535)
    port: number

    @IsNotEmpty()
    @IsBoolean()
    useSSL: boolean

    @IsNotEmpty()
    @IsString()
    accessKey: string

    @IsNotEmpty()
    @IsString()
    secretKey: string
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  MINIO: MinioVariables
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}