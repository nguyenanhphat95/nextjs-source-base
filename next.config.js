/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: false,
  },
  env: {
    ENABLE_WRITE_LOG_CLIENT: process.env.ENABLE_WRITE_LOG,
    API_DOMAIN_CLIENT: process.env.API_DOMAIN,
    SIGNATURE_CLIENT: process.env.SIGNATURE,
    PARTNER_ID_CLIENT: process.env.PARTNER_ID,
    GRANT_TYPE_CLIENT: process.env.GRANT_TYPE,
    // CLIENT_SECRET_CLIENT: process.env.CLIENT_SECRET,

    // Config for SBH
    CHANNEL_CLIENT: process.env.CHANNEL,
    SERVICE_CODE_CLIENT: process.env.SERVICE_CODE,
    NARRATIVE_CLIENT: process.env.NARRATIVE,
    IS_REQ_CHAL_CODE_CLIENT: process.env.IS_REQ_CHAL_CODE,
    // CLIENT_ID_SBH_CLIENT: process.env.CLIENT_ID_SBH,
    // CLIENT_SECRET_SBH_CLIENT: process.env.CLIENT_SECRET_SBH,
    API_DOMAIN_SANDBOX_SBH_CLIENT: process.env.API_DOMAIN_SANDBOX_SBH,
  },
};
