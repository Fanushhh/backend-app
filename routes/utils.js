const mongoose = require('mongoose');

const castToMongoObjectId = (id) => mongoose.Types.ObjectId(id.trim());



module.exports = {castToMongoObjectId};