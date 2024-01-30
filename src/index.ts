import { DatabaseService } from "./Service";
import { Server } from "./Type/Server";
import 'dotenv/config';

// console.log("Process Variables:", process.env);
Server.Start({},
    new DatabaseService()
);