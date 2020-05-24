import { createConnections } from "typeorm";

createConnections();

// to create new migrations, run "yarn typeorm migration:create -n {NAME}"
// to apply new migrations, run "yarn typeorm migration:run"
