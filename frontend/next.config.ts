import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
    };

    config.plugins = [
      ...(config.plugins || []),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ];

    return config;
  },
};

export default nextConfig;
