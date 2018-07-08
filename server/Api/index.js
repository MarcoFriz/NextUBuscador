var express   = require('express'),
    fs        = require("fs"),
    path      = require("path"),
    Storage   = require("../Storage")

var promise = require('es6-promise').Promise;
var Router = express.Router();

//Busca lista las primeras casas con ciudades diferentes
Router.get("/ciudades",function(req,res){
  Storage.getData("ciudades")
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

//Busca lista las primeras casas con tipos diferentes
Router.get("/tipos",function(req,res){
  Storage.getData("tipos")
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

//busca a todas las casas
Router.get("/buscar",function(req,res){
  Storage.getData("All")
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

//busca las casas filtrandolas por rango de precio, locacion y tipo
//si se desea buscar todas las ciudades o tipos se debe usar * como parametro
Router.get("/buscar/:from/:to/:ciudad/:tipo",function(req,res){
  Storage.getData("range",
          req.params.from,
          req.params.to,
          req.params.ciudad,
          req.params.tipo)
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

//se exporta el Router
module.exports = Router;
