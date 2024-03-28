import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "admin",
        database: "moovy",
        entities: [
          __dirname + "/../**/*.entity{.ts,.js}",
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];