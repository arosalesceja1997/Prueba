import { DataSource } from "typeorm";
import { Companie, TypeCompanie } from "./entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [Companie, TypeCompanie],
  subscribers: [],
  migrations: [],
});
