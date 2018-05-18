var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('noticeboard', ['notices']);
var ObjectId= mongojs.ObjectId;

var app= express();

app.use(express.static(path.resolve('./public')));

app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



app.get('/',function(req,res)
{
	db.notices.find(function(err,docs){
		res.render('main',{
		name : 'Notice Board',
		notices : docs
	});
	});
	
});

app.post('/notices/add',function(req,res){
	var newNotice = {
		date : req.body.date,
		description : req.body.description,
		notice : req.body.notice
	}
	db.notices.insert(newNotice,function(err,result){
		if(err){
			console.log(err);
		}res.redirect('/');
	});
});



app.delete('/notices/delete/:id', function(req,res){
		
	db.notices.remove({_id: ObjectId(req.params.id)}, function(err, result){
		if(err){
			console.log(err);

		}

		res.redirect('/');
		});

});




app.get('/add',function(req,res){
	res.render('add',{name : 'Add A notice '});
	
});


app.get('/about',function(req,res){
	res.render('about',{
		name : 'About'
	});
});

app.get('/search',function(req,res){
	res.render('search',{
		name : 'Search'
	});
});
app.listen(8888);