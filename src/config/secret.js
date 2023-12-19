import "dotenv/config";
const mongodbURL = process.env.MONGO_LOCAL_URL;
const serverPort = process.env.SERVER_PORT;

export { mongodbURL, serverPort };
