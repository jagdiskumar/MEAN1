var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,format=require('util').format;
app.use(express.static(__dirname+'/Public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
var objectId = require('mongodb').ObjectID;
var BSON = require('mongodb').BSONPure;
var db

MongoClient.connect('mongodb://127.0.0.1:27017/myMEANdb', function(err, database){
  if (err) return console.log(err)
  db = database
  app.listen(8088,function(){console.log('Server start:8088')});
})
// Get List
app.get('/Ulist',function(req,res){
	 db.collection('User').find().toArray(function(err, result){
    if (err) return console.log(err);
    res.json(result);
});
});
// Add
app.post('/Ulist',function(req,res){
  console.log(req.body);
  db.collection('User').save(req.body, function(err, result){
    if (err) return console.log(err)
    console.log('saved to database');
     res.json('data has saved');
    });
});
//Remove
app.delete('/Ulist/:id',function(req,res){
  db.collection('User').deleteOne({_id:objectId(req.params.id)}, function(err, result){
    if (err) return console.log(err)
     res.json(result);
    });
});

//GET Detail
app.get('/Ulist/:id',function(req,res){
  db.collection('User').findOne({_id:objectId(req.params.id)}, function(err, result){
    if (err) return console.log(err)
     res.json(result);
    });
});
//Update
app.put('/Ulist',function(req,res){
  var item={
    name:req.body.name,
    email:req.body.email,
    number:req.body.number
  }
  db.collection('User').updateOne({_id:objectId(req.body._id)},{$set:item}, function(err, result){
    if (err) return console.log(err)
     res.json(result);
    });
});

app.get('/contactlist',function(req,res){
	console.log('angular controller calling express api');
  user1 = {name:'Jagdish Kargwal', email:'jagdish@yopmail.com', number:'111-1111-1111'};
  user2 = {name:'Santosh Kargwal', email:'santosh@yopmail.com', number:'111-2222-1111'};
  user3 = {name:'Manvi Kargwal', email:'manvi@yopmail.com', number:'111-3333-1111'};
  var userlist =[user1,user2,user3];
  res.json(userlist);
});
