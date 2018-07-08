var express = require('express'),
    fs    = require("fs"),
    path  = require("path")

var promise = require('es6-promise').Promise;


module.exports = {
  getData: (type,from,to,ciudad,tipo)=>{
    var dataPath = __dirname+path.join("/data.json")
    return new promise((res,rej)=>{
        fs.readFile(dataPath,"utf8", (err, readData)=>{
          if(err) rej(err)
          var data = JSON.parse(readData)
          switch (type) {
            case "ciudades":
              var list=[];
              data = data.filter(item => {
                let index = list.indexOf(item.Ciudad)
                if(index==-1){list[list.length]= item.Ciudad}
                else{return false}
                return true
              })
              break;
            case "tipos":
              var list=[];
              data = data.filter(item => {
                let index = list.indexOf(item.Tipo)
                if(index==-1){list[list.length]= item.Tipo}
                else{return false}
                return true
              })
              break;
            case "range":
              var list=[];
              data = data.filter(item => {
                let precio = item.Precio
                precio = precio.replace("$","")
                precio = precio.replace(",","")
                precio = Number(precio)
                from = Number(from)
                to = Number(to)
                return ((from <= precio) &&  (precio <= to))
              })
              //ahora por ciudad
              if(ciudad!="*"){
                data = data.filter(item => item.Ciudad==ciudad)
              }
              //ahora por tipo
              if(tipo!="*"){
                data = data.filter(item => item.Tipo==tipo)
              }
              break;
          }
          res(data)
        })
    })
  }
}


  // module.exports = {
  //   getData: (type)=>{
  //     fs.readFile(dataPath,"utf8", (err, readData)=>{
  //       var dataPath = __dirname+path.join("/data.json")
  //       console.log(type);
  //       // switch (type) {
  //       //   case expression:
  //       //
  //       //     break;
  //       //   default:
  //       //
  //       // }
  //         return new promise ((resolve, reject)=>{
  //             if(err) reject(err)
  //             resolve(JSON.parse(readData))
  //           })
  //         }
  //       }
  //   }




// switch (type) {
//   case "ciudades":
//     let data = JSON.parse(readData);
//     console.log(data[0].Ciudad);
//     break;
//   default:
//   return new promise ((resolve, reject)=>{
//       if(err) reject(err)
//       resolve(JSON.parse(readData))
//     }
//     })
//   })
// }
