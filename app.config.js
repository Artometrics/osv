/**
 * Dynamic Expo config so EXPO_PUBLIC_* from Netlify / EAS / .env
 * land in Constants.expoConfig.extra (required for static web export).
 */
module.exports = ({ config }) => {
  const siteUrl =
    process.env.EXPO_PUBLIC_SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    "https://osv.example";

  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      EXPO_PUBLIC_SITE_URL: siteUrl,
      PUBLIC_SITE_URL: siteUrl,
    },
  };
};
