import { Account, Client, Databases, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || "")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || "");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, Query};
