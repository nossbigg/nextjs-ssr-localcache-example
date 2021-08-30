const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const webpackConfigFn = (config, { isServer }) => {
  // for webpack to resolve import alias correctly
  config.resolve.alias["@SERVER_ONLY_MODULES"] = "src/SERVER_ONLY_MODULES";

  if (!isServer) {
    // resolve @SERVER_ONLY_MODULES as empty module on client
    config.resolve.alias["@SERVER_ONLY_MODULES"] = false;
  }

  return config;
};

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack: webpackConfigFn,
});
