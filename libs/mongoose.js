const mongoose    = require('mongoose');
const log         = require('./log')(module);
const config      = require('../config');

mongoose.connect(config.mongoose.uri);
const db = mongoose.connection;

db.on('error', (err) => {
    log.error('connection error:', err.message);
});
db.once('open', () => {
    log.info("Connected to DB!");
});

const Schema = mongoose.Schema;

// Schemas
const Transformers = new Schema({
    name: {
      type: String,
      required: true
    },
    transformation: {
        type: String
    }
});

const TransformerModel = mongoose.model('Transformers', Transformers);

module.exports.TransformerModel = TransformerModel;