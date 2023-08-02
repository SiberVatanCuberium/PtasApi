import { app } from "./src/app.js";
import { CONFIG } from "./src/config.js";

app.listen(CONFIG.PORT, () =>
	console.log(`P-TAS API is listening on :${CONFIG.PORT}`)
);
