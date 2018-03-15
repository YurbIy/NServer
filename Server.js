const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const fullfil 		   = require('./utils/fullfil');
const path           = require('path');
const log            = require('./libs/log')(module);
const config         = require('./config');
const TransformerModel = require('./libs/mongoose').TransformerModel;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404);
  log.debug('Not found URL: %s',req.url);
  res.send({ error: 'Not found' });
  return;
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s',res.statusCode,err.message);
  res.send({ error: err.message });
  return;
});

MongoClient.connect(db.url, (err, client) => {
  
  if (err) return console.log(err);
  const db = client.db('transformers');
  db.collection('transformers').find().toArray((err, item) => {
			if(err) {
				console.log('error: An error has occurred' + err);
			} 
			if (item.length === 0) {
				fullfil(db.collection('transformers'));
			}
		});
  require('./app/routes')(app, db);
  app.listen(config.port, () => {
    log.info('We live on ' + config.port);
  });
});
