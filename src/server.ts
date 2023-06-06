import app from "./app";
const PORT: number = 8080;

import sequelizeConnection from "./config/db";

const start = async (): Promise<void> => {
  try {
    await sequelizeConnection.sync();
    app.listen(PORT, () => {
      console.log("🏃🏃🏃 SERVER IS UP AT: http://localhost:" + PORT + " 🏃");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
