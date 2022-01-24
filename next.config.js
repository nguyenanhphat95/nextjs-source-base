/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: false,
  },
  env: {
    PORT: process.env.PORT,
    ENABLE_WRITE_LOG_CLIENT: process.env.ENABLE_WRITE_LOG,

    API_DOMAIN_CLIENT: process.env.API_DOMAIN,
    PARTNER_ID_CLIENT: process.env.PARTNER_ID,
    KEY_CHECK_SUM_CLIENT: process.env.KEY_CHECK_SUM,
    CHANNEL_HDBS_CLIENT: process.env.CHANNEL_HDBS,
    TOKEN_USERNAME_CLIENT: process.env.TOKEN_USERNAME,
    TOKEN_PASSWORD_CLIENT: process.env.TOKEN_PASSWORD,
    // CLIENT_SECRET_CLIENT: process.env.CLIENT_SECRET,

    // Config for Sanbox
    SERVICE_CODE_CLIENT: process.env.SERVICE_CODE,
    NARRATIVE_CLIENT: process.env.NARRATIVE,
    IS_REQ_CHAL_CODE_CLIENT: process.env.IS_REQ_CHAL_CODE,
    API_DOMAIN_SANDBOX_SBH_CLIENT: process.env.API_DOMAIN_SANDBOX_SBH,
  },
};
