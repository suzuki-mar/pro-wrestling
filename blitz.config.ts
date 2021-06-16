import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz';

const config: BlitzConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },

  middleware: [
    sessionMiddleware({
      cookiePrefix: 'pro-wrestling',
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
};

module.exports = config;
