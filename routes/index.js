var express = require('express');//Carrega o motor de reinderização
var router = express.Router();//

/* GET home page. */
router.get('/', function(req, res, next) {
var mongoClient = require("mongodb").MongoClient;
  mongoClient.connect("mongodb://localhost:27017/workshoptdc",
  function(err, conn){
    if(err){return console.log(err);}
    conn.collection("customers").find({}).toArray(
      function(e, docs){
        if(err){return console.log(err);}
        res.render('index', { title: 'Lista de clientes', docs: docs });
      }
    );
  });  
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var ObjectId = require("mongodb").ObjectId;  
  var mongoClient = require("mongodb").MongoClient;
  mongoClient.connect("mongodb://localhost:27017/workshoptdc",
  function(err, conn){
    if(err){return console.log(err);}
    conn.collection("customers").find({_id: new ObjectId(id)}).toArray(
      function(err, docs){
        if(err){return console.log(err);}
        res.render('edit', { title: 'Edição de clientes', doc: docs[0]});
      }
    );
  });  
});

router.post('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  var ObjectId = require("mongodb").ObjectId;  
  var mongoClient = require("mongodb").MongoClient;
  mongoClient.connect("mongodb://localhost:27017/workshoptdc",
  function(err, conn){
    if(err){return console.log(err);}
    conn.collection("customers").updateOne({_id: new ObjectId(id)}, {nome, idade},
    function(e, r){
      if(e){return console.log(e);}
      res.redirect('/');
    });
  });  
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  var ObjectId = require("mongodb").ObjectId;  
  var mongoClient = require("mongodb").MongoClient;
  mongoClient.connect("mongodb://localhost:27017/workshoptdc",
  function(err, conn){
    if(err){return console.log(err);}
    conn.collection("customers").deleteOne({_id: new ObjectId(id)},
      function(err, docs){
        if(err){return console.log(err);}
        res.redirect('/');
      });
  });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro' });
});

router.post('/save', function(req, res, next) {
  var nome = req.body.nome;//Recuperando o nome da tela
  var idade = parseInt(req.body.idade);
  var mongoClient = require("mongodb").MongoClient;
  mongoClient.connect("mongodb://localhost:27017/workshoptdc", 
  function(err, conn){
    if(err){return console.log(err);}
    conn.collection("customers").insert({nome, idade}, 
      function(e, r){
        if(e){console.log(e);}
        res.redirect('/');//Se resposta positiva redireciona para o index
    })
  })
});

module.exports = router;
