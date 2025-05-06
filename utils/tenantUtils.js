const axios = require('axios');
const NodeCache = require('node-cache');
const cryptoUtils = require('./cryptoUtils');

const tenantCache = new NodeCache({ stdTTL: 600 }); // TTL in seconds

const ADMIN_SERVER_BASE_URL = process.env.ADMIN_SERVER_BASE_URL;

const getTenantConfig = async (tenantId) => {
    try {
        const cachedConfig = tenantCache.get(tenantId);
        if (cachedConfig) {
            return cachedConfig;
        }
        const response = await axios.get(`${ADMIN_SERVER_BASE_URL}/api/tenant/get-tenant-config/${tenantId}`);
        // console.log(response.data.config);
        if (response.data?.config) {
            const decryptedConfig = cryptoUtils.decryptData(response.data?.config);
            // console.log('Decrypted Data: ', JSON.parse(decryptedConfig));
            tenantCache.set(tenantId, JSON.parse(decryptedConfig));
            return JSON.parse(decryptedConfig);
        }
    } catch (error) {
        const newError = new Error(error.response.data?.error || 'Error while retrieving tenant configuration!');
        newError.code = error.response.status || 500;
        throw newError;
    }
};

// getTenantConfig('example123');

module.exports = { getTenantConfig };
