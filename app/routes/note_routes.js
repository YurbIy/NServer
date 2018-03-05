// routes/note_routes.js
module.exports = function(app, db) {
	app.post('/notes', (req, res) => {
    const reqBody = req.body;
    res.send('Hello' + ' ' + reqBody);
  });
};