
var imagenes = [];
imagenes["10"] = "bs10.png";
imagenes["20"] = "bs20.png";
imagenes["50"] = "bs50.png";
imagenes["100"] = "bs100.png";
imagenes["200"] = "bs200.png";

class Billete {
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor];
    }
    mostrar() {
        document.body.appendChild(this.imagen);
    }
    restar(cantidad) {
        this.cantidad = this.cantidad - cantidad;
    }
    agregar(cantidad) {
        this.cantidad = this.cantidad + cantidad;
    }

}

var caja = [];
var entregado = [];
var agregado = [];
var dinero = 0;
var div = 0;
var papeles = 0;


caja.push(new Billete(200, 2));
caja.push(new Billete(100, 2));
caja.push(new Billete(50, 2));
caja.push(new Billete(20, 2));
caja.push(new Billete(10, 2));
var mMontoDisponible = document.getElementById("mMontoDisponible");
var mensaje = document.getElementById("mensaje");
var resultado = document.getElementById("resultado");
var txtMontoIngresado = document.getElementById("txtMontoIngresado");
var b = document.getElementById("extraer");
b.addEventListener("click", validaMontoIngresado);

var txtValor = document.getElementById("txtValor");
var txtCantidad = document.getElementById("txtCantidad");
var ingresar = document.getElementById("ingresar");
ingresar.addEventListener("click", IngresoCajero);
mMontoDisponible.innerHTML = "<strong>DISPONIBLE EN CAJA:" + verificaDisponibilidad() + "</strong>";

function verificaDisponibilidad() {
    var dineroDisponible = 0;
    entregado.splice(0, entregado.length);
    agregado.splice(0, agregado.length);
    for (var d of caja) {
        dineroDisponible = dineroDisponible + (d.valor * d.cantidad);
    }
    return dineroDisponible;
}

function entregarDinero(t) {
    dinero = t;
    for (var bi of caja) {
        if (dinero > 0) {
            div = Math.floor(dinero / bi.valor);
            if (div > bi.cantidad) {
                papeles = bi.cantidad;
            } else {
                papeles = div;
            }
            entregado.push(new Billete(bi.valor, papeles));
            dinero = dinero - (bi.valor * papeles);
            bi.restar(papeles);
        }
    }
    check(t);

}


function validaMontoIngresado() {

    var montoIngresado = parseInt(txtMontoIngresado.value);
    console.log("M. D.: " + verificaDisponibilidad(), montoIngresado);
    if (montoIngresado > verificaDisponibilidad()) {
        mensaje.innerHTML = "<strong>NO TENEMOS DINERO DISPONIBLE PARA UN RETIRARO DE ESE MONTO</strong>";
    } else {
        if (montoIngresado % 10 == 0) {
            mensaje.innerHTML = "";
            entregarDinero(montoIngresado);
        } else if (txtMontoIngresado.value == "") {
            mensaje.innerHTML = "<strong>DEBE INGRESAR UN MONTO PARA RETIRAR </strong>";
        }
        else {
            mensaje.innerHTML = "<strong>" + montoIngresado + "</strong> NO ES ACEPTADO DEBE INGRESAR UN MONTO MAYOR A 0 Y MULTIPLO DE 10";
            txtMontoIngresado.value = "";
        }
    }

}


function check(t) {
    resultado.innerHTML += "<br /> USTED RETIRÓ: BS "+t+" <br />";
    for (e of entregado) {
        for (var i = 0; i < e.cantidad; i++) {
            resultado.innerHTML += "<img style='padding: 10px; text-align: left;' src=" + e.imagen.src + " />";
        }
    }
    mMontoDisponible.innerHTML = "<strong>DISPONIBLE EN CAJA:" + verificaDisponibilidad() + "</strong>";
    txtMontoIngresado.value= "";
    mensaje.innerHTML = "";
}

function verificaCorte(valor) {
    var sw = false;
    for (var c of caja) {
        if (c.valor == valor) {
            sw = true;
        }

    }
    return sw;
}

function IngresoCajero() {
    var iValor = parseInt(txtValor.value);
    var iCantidad = parseInt(txtCantidad.value);
    if (!txtValor.value == "") {
        if (!txtCantidad.value == "") {
            if (iValor > 0) {
                if (iCantidad > 0) {
                    if (verificaCorte(iValor)) {
                        for (var c of caja) {
                            if (c.valor == iValor) {
                                c.agregar(iCantidad);
                                agregado.push(new Billete(iValor, iCantidad));
                            }
                            //console.log(c);
                        }
                        checkAgregar(iValor,iCantidad);

                    } else {
                        mensaje.innerHTML = "<strong>DEBE INGRESAR EN VALOR EL CORTE DE BILLETE ADMITIDO: </strong><br>";
                        for (var c of caja) {
                            mensaje.innerHTML = mensaje.innerHTML + "Bs " + c.valor + ", "
                        }
                    }
                } else {
                    mensaje.innerHTML = "<strong>DEBE INGRESAR LA CANTIDAD MAYOR A CERO</strong>";
                }

            } else {
                mensaje.innerHTML = "<strong>DEBE INGRESAR EL VALOR MAYOR A CERO</strong>";
            }

        } else {
            mensaje.innerHTML = "<strong>DEBE INGRESAR LA CANTIDAD</strong>";
        }
    } else {
        mensaje.innerHTML = "<strong>DEBE INGRESAR EL VALOR</strong>";
    }

}

function checkAgregar(valor, cantidad) {
    resultado.innerHTML += "<br /> SE AGREGO: "+cantidad+" BILLETES DE BS "+valor+"<br /> <hr>";
    for (e of agregado) {
        for (var i = 0; i < e.cantidad; i++) {
            resultado.innerHTML += "<img style='padding: 10px; text-align: right;' src=" + e.imagen.src + " />";
        }
    }
    mMontoDisponible.innerHTML = "<strong>DISPONIBLE EN CAJA:" + verificaDisponibilidad() + "</strong>";
    txtValor.value = "";
    txtCantidad.value = "";
    mensaje.innerHTML = "";
}