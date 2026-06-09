console.log(">>> THE CONFIG IS LOADING FROM THE CORRECT ROOT");
import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ...your other config
};

export default nextConfig;
