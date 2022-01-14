const cli = require("next/dist/cli/next-dev");
const env = require("@next/env");

const envConfig = env.loadEnvConfig("./", false);
cli.nextDev(["-p", envConfig.combinedEnv.PORT || 3000]);
