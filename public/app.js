let fromData=0;
let toData=0;
this.customSearch = true;

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$",
  onStart: (data)=>{
    fromData = data.from;
    toData = data.to;
  },
  onChange: (data)=>{
    fromData = data.from;
    toData = data.to;
  }
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}
setSearch()
//
function setOptions() {
  let ciudadOptions = $("#ciudad")
  let tipoOptions = $("#tipo")
  $.ajax("api/ciudades").done(data=>{
    for (var i = 0; i < data.length; i++) {
      let template = `<option value='${data[i].Ciudad}'>${data[i].Ciudad}</option>`
      ciudadOptions.append(template)
    }
    $("select").material_select()
  })
  $.ajax("api/tipos").done(data=>{
    for (var i = 0; i < data.length; i++) {
      data[i]
      let template = `<option value='${data[i].Tipo}'>${data[i].Tipo}</option>`
      tipoOptions.append(template)
    }
    $("select").material_select()
  })
}

setOptions();

function Search (){
  let btn = $('#buscar')
  btn.click((e)=>{
    //Obtenemos los parametros
    var ciudadOptions = $("#ciudad")
    var tipoOptions = $("#tipo")
    var ciudad = ciudadOptions.val()
    var tipo = tipoOptions.val()
    if(ciudad=="")
      ciudad="*";
    if(tipo=="")
      tipo="*";
    //Realizamos un ajax
    var url = `api/buscar/`
    if(!this.customSearch)
      url += `${fromData}/${toData}/${ciudad}/${tipo}`;
    $.ajax(url).done(data=>{
      //Obtenemos el json
      //Renderizamos el json
      RenderData(data)
    })
  })
}

function RenderData(data) {
  //buscamos la lista
  var lista = $(".lista");
  lista.empty();
  for (var i=0; i<data.length; i++) {
    var template = `<div class="card horizontal">
                      <div class="card-image">
                        <img src="img/home.jpg">
                      </div>
                      <div class="card-stacked">
                        <div class="card-content">
                          <div>
                            <b>Direccion: ${data[i].Direccion}</b><p></p>
                          </div>
                          <div>
                            <b>Ciudad: ${data[i].Ciudad}</b><p></p>
                          </div>
                          <div>
                            <b>Telefono: ${data[i].Telefono}</b><p></p>
                          </div>
                          <div>
                            <b>Código postal: ${data[i].Codigo_Postal}</b><p></p>
                          </div>
                          <div>
                            <b>Precio: ${data[i].Precio}</b><p></p>
                          </div>
                          <div>
                            <b>Tipo: ${data[i].Tipo}</b><p></p>
                          </div>
                        </div>
                        <div class="card-action right-align">
                          <a href="#${data[i].Id}">Ver más</a>
                        </div>
                      </div>
                    </div>`;
    lista.append(template);
  }
}

Search()
