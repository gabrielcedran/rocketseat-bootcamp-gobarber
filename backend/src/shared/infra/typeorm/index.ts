import { createConnection } from "typeorm";

createConnection();

// to create new migrations, run "yarn typeorm migration:create -n {NAME}"
// to apply new migrations, run "yarn typeorm migration:run"
