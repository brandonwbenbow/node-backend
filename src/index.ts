import { DatabaseService } from "./Service";
import { Server } from "./Type/Server";
import 'dotenv/config';

import { LoadDirectoryExports } from "./Utility";

// Load all models from directory (no index file needed)
// LoadDirectoryExports(__dirname, './Model');

// console.log("Process Variables:", process.env);
Server.Start({},
    new DatabaseService()
);