// const mongoose = require('mongoose');
// const NodeCache = require('node-cache');
// const companyInfoSchema = require('../models/companyInfoModel');
// const productSchema = require('../models/productModel');
// const subscriptionSchema = require('../models/subscriptionModel');
// const userSchema = require('../models/userModel');

// const schemas = {
//     "company-info": companyInfoSchema,
//     "product": productSchema,
//     "subscription": subscriptionSchema,
//     "user": userSchema
// };

// const modelCache = new NodeCache();

// const loadDBModel = (connectionId, modelName) => {
//     const cacheKey = `${connectionId}_${modelName}`;
//     const cachedModel = modelCache.get(cacheKey);
//     if (cachedModel) {
//         return cachedModel;
//     }
//     const DB = mongoose.connections[connectionId];
//     const model = DB.model(modelName, schemas[modelName]);
//     modelCache.set(cacheKey, model);
//     return model;
// };

// module.exports = { loadDBModel };