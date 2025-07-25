import { execSync } from "child_process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    GIT_COMMIT: execSync("git rev-parse HEAD").toString().trim(),
  }
};

export default nextConfig;
