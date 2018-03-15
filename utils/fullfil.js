const TransformerModel = require('../libs/mongoose').TransformerModel;

module.exports = (col) => {
	const transformers = [
		{
			name: 'Optimus Prime', 
			transformation: 'Truck'
		},
		{
			name: 'Megathrone', 
			transformation: 'Gun'
		},
		{
			name: 'BumbleBee', 
			transformation: 'Car'
		},
		{
			name: 'Starscream', 
			transformation: 'Jet fighter'
		}
	];
	
	transformers.map(transformer => {
		col.insert(transformer, (err, results) => {
		if (err) { 
        console.log('error: An error has occurred'); 
      }
  });
	});
}