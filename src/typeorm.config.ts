import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from './users.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mydb',
  port: 3306,
  username: 'root',
  password: 'DE-k&ySJ6a5BrY9G',
  database: 'localmysql',
  entities: [Users],
  synchronize: true,
  // migrations: ['dist/src/db/migrations/*.js'],
  // cli: {
  //   migrationsDir: 'src/db/migrations',
  // },
};
