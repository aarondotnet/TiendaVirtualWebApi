var url = "/api/Productos";
var urlFactura = "/api/Facturas";

var carritoUsuario;

$(function () {
    console.clear();

    $('#cuadroerror').hide();

    $linea = $('#books li');

    //$linea.detach();

    //console.log($linea);

    $.getJSON(url, libroscorrecto).fail(fallo);
    //$.getJSON(urlAuthors, autorescorrecto).fail(fallo);

    $('#formbooks').submit(formsubmit);

    if (!carritoUsuario) {
        carritoUsuario = {
            usuario: {
                Id: 9,
                Nick: 'nombre',
                Password: 'contra'
            },
            productos: [
                //{
            //    producto: {
            //        Id: 1,
            //        Nombre: 'Producto1',
            //        Precio: 10
            //    },
            //    cantidad: 5
            //},
            //{
            //    producto: {
            //        Id: 2,
            //        Nombre: 'Producto2',
            //        Precio: 20
            //    },
            //    cantidad: 3
            //}
            ]
        };

        guardarCarrito(carritoUsuario);
    }
    //Inicio programa

     //inicio:Boton para facturar
    $('#btnFactura').click(function (e) {
        e.preventDefault();

        var carritoDTO = {};
        var carrito = cargarCarrito();

        carritoDTO.IdUsuario = carrito.usuario.Id;
        carritoDTO.IdsProductos = [];
        carritoDTO.CantidadesProductos = [];

        $.each(carrito.productos, function (clave, linea) {
            carritoDTO.IdsProductos.push(linea.producto.Id);
            carritoDTO.CantidadesProductos.push(linea.cantidad);
        });

        console.log(carritoDTO);

        $.ajax({
            url: 'api/Facturas',
            method: 'POST',
            data: JSON.stringify(carritoDTO),
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (factura) {
            document.querySelectorAll('#tituloform')[0].innerHTML = "JSON.stringify(factura)";
            document.querySelectorAll('#formbooks1')[0].innerHTML = JSON.stringify(factura) + "<br>" + "Total: " + factura.Total;
            //document.querySelectorAll('#formbooks1')[0].innerHTML = "Total: " + factura.Total;
            $('#tituloform2').text("Factura Parseada:");
            $('#formbooks2').text("Numero Factura:" + factura.Numero).append('<br />');
            $.each(factura.LineasFactura, function (key, linea) {
                alert(linea);
                //$('#formbooks2').append("Producto:" + linea.producto.Id).append('<br />');
               // $('#formbooks2').append("Producto1:" + linea.producto.cantidad).append('<br />');
                //$('#formbooks2').append("Producto2:" + linea.producto.Nombre).append('<br />');
            });
            $('#formbooks2').append("Fecha:" + factura.Fecha).append('<br />');
            $('#formbooks2').append("Importe sin IVA:" + factura.ImporteSinIva).append('<br />');
            $('#formbooks2').append("Total:" + factura.Total).append('<br />');


            //alert('Factura realizada con exito');
            console.log(factura);
        }).fail(function () {
            alert('Ha habido un error al crear la factura en el servidor');
        });

        //$('#carrito').hide();
        //$('#factura').show();
    });
    //fin::Boton para facturar

    //Fin funcion inicial
});

function formsubmit(e) {
    e.preventDefault();

    var book = {
        //"Title": $('#inputTitle').val(),
        "Nombre": $('#inputGenre').val(),        
        "Precio": $('#inputPrice').val(),
        //"Price": $('#inputPrice').val()
        //"AuthorId": $('#authors').val()
    };

    var bookId = $('#inputId').val();
    var esActualizacion = !!bookId;

    if (esActualizacion) {
        book.Id = bookId;

        $.ajax({
            url: url + "/" + bookId,
            method: 'PUT',
            data: JSON.stringify(book),
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (libro) {
            console.log(libro);
            limpiar();
            $.getJSON(url, libroscorrecto).fail(fallo);
        }).fail(fallo);
    }
    else
        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(book),
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (libro) {
            console.log(libro);
            limpiar();
            $.getJSON(url, libroscorrecto).fail(fallo);
            $('#authors').focus();
        }).fail(fallo);

    console.log(JSON.stringify(book));
}

function limpiar() {
    $('#inputId').remove();
    $('#tituloform').text('Add Book');
    $('#formbooks')[0].reset();
}

function autorescorrecto(autores) {
    $authors = $('#authors');

    $.each(autores, function (key, autor) {
        $authors.append(new Option(autor.Name, autor.Id));
    });
    
}

function libroscorrecto(libros) {
    $books = $('#books');

    $books.empty();

    $.each(libros, function (key, libro) {
        $linea = $linea.clone();

        $linea.find('.AuthorName').text(libro.Nombre);
        $linea.find('.Title').text(libro.Precio + " €");
        $linea.find('.detalles').prop('href', url + "/" + libro.Id).click(librodetalle);
        //$linea.find('.borrar').prop('href', url + "/" + libro.Id).click(libroborrar);
        //$linea.find('.actualizar').prop('href', url + "/" + libro.Id).click(libroactualizar);

        $books.append($linea);

        console.log(key, libro);
    });
}

function libroactualizar(e) {
    e.preventDefault();

    $.getJSON(this.href, function (libro) {
               
        //$('#inputYear').val(libro.Id);
        $('#inputGenre').val(libro.Nombre);
        $('#inputPrice').val(libro.Precio);

        $('#tituloform').text('Actualizar Producto');

        if ($('#inputId').length)
            $('#inputId').val(libro.Id);
        else
            $('#formbooks').
                append('<input type="hidden" id="inputId" value="' + libro.Id + '" />');
    });
}


function libroborrar(e) {
    e.preventDefault();

    $.ajax({
        url: this.href,
        method: 'DELETE',
        //data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (libro) {
        console.log(libro);
        $.getJSON(url, libroscorrecto).fail(fallo);
    }).fail(fallo);
}

function librodetalle(e) {
    e.preventDefault();
    
    $.getJSON(this.href, function (libro) {
        $('#AuthorName').text(libro.Id);
        $('#Title').text(libro.Nombre);
        $('#Year').text(libro.Precio);
        //$('#Genre').text(libro.Genre);
        //$('#Price').text(libro.Price);
        var id = libro.Id;
        var cantidad = 1;

        $.getJSON('api/Productos/' + libro.Id, function (producto) {

            var linea = {
                producto: producto,
                cantidad: parseInt(cantidad)
            };

            carritoUsuario = cargarCarrito();
            carritoUsuario.productos.push(linea);

            guardarCarrito(carritoUsuario);

            //$('#ficha').hide();
            //$('#carrito').show();
        });


        //
    });

}

function fallo(jqXHR, textStatus, errorThrown) {
    if (jqXHR.readyState === 0) {
        errorThrown = "ERROR DE CONEXIÓN";
    }

    console.log(jqXHR, textStatus, errorThrown);

    $('#cuadroerror').show();
    $('#textoerror').text(errorThrown);
}

function guardarCarrito(carrito) {
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    return JSON.parse(sessionStorage.getItem('carrito'));
}