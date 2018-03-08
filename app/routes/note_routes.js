// routes/note_routes.js
module.exports = function(app, db) {
	app.post('/transformers', (req, res) => {
    const transformer = { name: req.body.name, race: req.body.race};
	db.collection('/transformers').insert(transformer, (err, results) => {
		if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(results.ops[0]);
      }
  });
});
}