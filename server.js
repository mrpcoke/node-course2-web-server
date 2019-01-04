const express = require('express'); 
const fs = require('fs'); 
var app = express(); 

var hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	
	var now = new Date().toString();
	
	var log = (`${now}: ${req.method} ${req.url}`); 
	console.log(log);
	
	fs.appendFile('server.log', log + '\n', (err) => {
		
		if(err){
			
			console.log('Unable to appeend to server.log'); 
		}
	});
	
	next();
});


/*app.use((req, res, next) => {
	
	res.render('maintenance.hbs');
}); */


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
	
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
	
	return text.toUpperCase();
});

app.disable('etag');//fix for displaying "ok" status as 200

app.get('/', (req, res) =>{

	//res.send('<h1>Hello Express</h1>'); 
	res.render('home.hbs', {
		
		pageTitle:'Home Page',
		welcomeMsg:'Welcome To My Homepage', 
		currentYear: new Date().getFullYear()
		
	}); 
});	


app.get('/about', (req, res) => {
	
	res.render('about.hbs', {
		pageTitle:'About Page', 
		currentYear: new Date().getFullYear()
	});
	
});


app.get('/bad', (req, res) => {
	
	res.send({errorMessage:'Unable to handle request'});
	
});

app.listen(3000, () => {
	
	console.log('Server running on port 3000'); 
}); 