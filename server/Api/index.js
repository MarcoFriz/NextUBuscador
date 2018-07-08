var express   = require('express'),
    fs        = require("fs"),
    path      = require("path"),
    Storage   = require("../Storage")

var promise = require('es6-promise').Promise;
var Router = express.Router();

Router.get("/ciudades",function(req,res){
  Storage.getData("ciudades")
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

Router.get("/tipos",function(req,res){
  Storage.getData("tipos")
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

Router.get("/buscar",function(req,res){
  Storage.getData("All")
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

Router.get("/buscar/:from/:to/:ciudad/:tipo",function(req,res){
  Storage.getData("range", req.params.from, req.params.to, req.params.ciudad, req.params.tipo)
        .then(function(data){
          res.json(data)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

module.exports = Router;
