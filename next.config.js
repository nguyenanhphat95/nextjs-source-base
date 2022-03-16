/** @type {import('next').NextConfig} */
module.exports = {
  basePath: "/sso-changePassword",
  assetPrefix: "/sso-changePassword",
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: false,
  },
  env: {
    PORT: process.env.PORT,

    ENABLE_WRITE_LOG_CLIENT: process.env.ENABLE_WRITE_LOG,
    // API_DOMAIN_CLIENT: process.env.API_DOMAIN,
    SIGNATURE_CLIENT: process.env.SIGNATURE,
    PARTNER_ID_CLIENT: process.env.PARTNER_ID,
    GRANT_TYPE_CLIENT: process.env.GRANT_TYPE,
    DOMAIN_DOP_CLIENT: process.env.DOMAIN_DOP,
    // CLIENT_SECRET_CLIENT: process.env.CLIENT_SECRET,

    // Config for SBH
    CHANNEL_CLIENT: process.env.CHANNEL,
    SERVICE_CODE_CLIENT: process.env.SERVICE_CODE,
    NARRATIVE_CLIENT: process.env.NARRATIVE,
    IS_REQ_CHAL_CODE_CLIENT: process.env.IS_REQ_CHAL_CODE,
    CLIENT_ID_SBH_CLIENT: process.env.CLIENT_ID_SBH,
    CLIENT_SECRET_SBH_CLIENT: process.env.CLIENT_SECRET_SBH,
    API_DOMAIN_SANDBOX_SBH_CLIENT: process.env.API_DOMAIN_SANDBOX_SBH,

    // Config for SBH OTP
    PARTNER_ID_SBH_OTP_CLIENT: process.env.PARTNER_ID_SBH_OTP,
    LINK_VERIFY_CALLBACK_SBH_OTP_CLIENT:
      process.env.LINK_VERIFY_CALLBACK_SBH_OTP,
  },
};
