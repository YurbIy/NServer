// routes/routes.js
const ObjectID = require('mongodb').ObjectID;
const TransformerModel = require('../../libs/mongoose').TransformerModel;

module.exports = function(app, db) {
	
	app.get('/transformers/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		TransformerModel.find(details, (err, item) => {
        if (err) {
			res.send({'error':'An error has occurred'});
		} else {
			res.send(item);
		}
    });
  });
 //get all transformers 
  app.get('/transformers', (req, res) => {
		db.collection('transformers').find().toArray((err, item) => {
			if(err) {
				res.send({'error':'An error has occurred'});
			} 
			res.send(item);

		});
  });
  
	app.post('/transformers', (req, res) => {
    const transformer = { name: req.body.name, transformation: req.body.transformation};
	db.collection('transformers').insert(transformer, (err, results) => {
		if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(results.ops[0]);
      }
  });
});

	app.delete('/transformers/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('transformers').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send('Transformer ' + id + ' deleted!');
			} 
		});
	});
	
  app.put ('/transformers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const transformer = { name: req.body.name, transformation: req.body.transformation };
    db.collection('transformers').update(details, transformer, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(transformer);
      } 
    });
  });

  app.get('/ErrorExample', (req, res, next) => {
    next(new Error('Random error!'));
  });

}