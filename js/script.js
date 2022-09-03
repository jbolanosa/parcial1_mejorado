let catalogo = [];
let carrito = [];
let producto;
let miLocalStorage = window.localStorage;

function agregarProductoCarrito(codigo) {
  let cantidad = document.getElementById("cantidad-" + codigo).value;
  let productoEncontrado = catalogo.find(
    (producto) => producto.codigo == codigo
  );

  let productoCarrito = {
    producto: productoEncontrado,
    cantidad: cantidad,
    subtotal: cantidad * productoEncontrado.precio,
  };

  carrito.push(productoCarrito);
  console.log(carrito);
  miLocalStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProductoCatalogo() {
  let codigoProducto = document.getElementById("codigo").value;
  let nombreProducto = document.getElementById("nombre").value;
  let precioProducto = document.getElementById("precio").value;
  let imagenProducto = document.getElementById("imagen").files;

  if (
    codigoProducto.value == "" ||
    nombreProducto.value == "" ||
    precioProducto.value == "" ||
    imagenProducto.length == 0
  ) {
    alert("Todos los campos deben llenarse");
    return;
  }

  if (catalogo.find((producto) => producto.codigo == codigo) != undefined) {
    alert("El codigo de producto ya existe");
    return;
  }

  let reader = new FileReader();
  reader.onload = () => {
    let srcData = reader.result;
    producto = {
      codigo: codigoProducto,
      nombre: nombreProducto,
      precio: precioProducto,
      imagen: srcData,
    };

    catalogo.push(producto);
    miLocalStorage.setItem("catalogo", JSON.stringify(catalogo));
  };
  reader.readAsDataURL(imagenProducto[0]);
}

function llenarCatalogo() {
  if (miLocalStorage.length == 0) {
    return;
  }
  catalogo = JSON.parse(miLocalStorage.getItem("catalogo"));
  imagenes = JSON.parse(miLocalStorage.getItem("imagenes"));
  let tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tabla-contenido");

  catalogo.forEach((producto) => {
    let fila = document.createElement("tr");
    fila.setAttribute("id", producto.codigo);
    fila.setAttribute("name", producto.codigo);

    fila.innerHTML = `
        <td style="text-align: center;">
            <span>${producto.codigo}</span>
        </td>
        <td>
            <div class="contenedor-flex">
                            <span>${producto.nombre}</span>
                <form action="">
                    <label for="cantidad-${producto.codigo}">Cantidad</label>
                    <input type="number" name="cantidad-${producto.codigo}" id="cantidad-${producto.codigo}" value="1" min="1">
                </form>
            </div>
        </td>
        <td>
            <div class="contenedor-flex">
                <span style="text-align: right;">Q. <span id="precio-${producto.codigo}">${producto.precio}</span></span>
                <button type="button" class="btn-agregar-carrito" onclick="agregarProductoCarrito(${producto.codigo});">Agregar al carrito</button>
            </div>
        </td>
        <td style="text-align: center;">
            <img src="${producto.imagen}" alt="Error" class="imagen-producto">
        </td>
        `;

    tbody.appendChild(fila);
  });
  document.getElementById("tabla-productos").appendChild(tbody);
}
