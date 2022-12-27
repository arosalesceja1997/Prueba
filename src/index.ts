import "reflect-metadata";
import app from "./app";
import * as Db from "./db";

const {DbSource} = Db;

const main: any = async () => {
  try {
    await DbSource.initialize();
    app.listen(2000);
  } catch (error) {
    console.error(error);
  }
};

main();
