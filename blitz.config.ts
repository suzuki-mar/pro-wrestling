import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz';

const config: BlitzConfig = {
  // 公式でこういうふうに書くことを推奨されているため
  // @ts-ignore
  webpack: (config, { isServer }) => {
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
