// ---------- CALCULADORA DE FRACCIONES ----------
function mcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
}
function simplificar(n, d) {
    if (d === 0) return {num:NaN, den:NaN};
    const div = mcd(n, d);
    let sig = 1;
    if (n < 0) sig *= -1;
    if (d < 0) sig *= -1;
    return {num: sig * Math.abs(n/div), den: Math.abs(d/div)};
}
document.querySelector('.boton-calcular').addEventListener('click', () => {
    const n1 = parseInt(document.getElementById('num1').value);
    const d1 = parseInt(document.getElementById('den1').value);
    const n2 = parseInt(document.getElementById('num2').value);
    const d2 = parseInt(document.getElementById('den2').value);
    const op = document.getElementById('operador').value;
    const resDiv = document.getElementById('resultado');
    if (!n1 || !d1 || !n2 || !d2) {
        resDiv.textContent = "Completa todos los campos";
        return;
    }
    if (d1 === 0 || d2 === 0) {
        resDiv.textContent = "El denominador no puede ser cero";
        return;
    }
    let nr, dr;
    switch(op) {
        case '+': nr = n1*d2 + n2*d1; dr = d1*d2; break;
        case '-': nr = n1*d2 - n2*d1; dr = d1*d2; break;
        case '*': nr = n1*n2; dr = d1*d2; break;
        case '/': 
            if (n2 === 0) { 
                resDiv.textContent = "No se puede dividir entre cero"; 
                return; 
            }
            nr = n1*d2; dr = d1*n2; break;
    }
    const s = simplificar(nr, dr);
    resDiv.textContent = `Resultado: ${s.num} / ${s.den} ≈ ${(s.num/s.den).toFixed(4)}`;
});

// ---------- EJERCICIOS DE FUNCIONES ----------
const listaEjercicios = [
    { ecuacion: "29 + 63X = 8 + 41X", correcta: "-0.95", opciones: ["-0.95", "36", "1.25"] },
    { ecuacion: "15X - 42 = 8X - 6", correcta: "5.14", opciones: ["22", "5.14", "7.80"] },
    { ecuacion: "8(X + 5) = 72 - 2X", correcta: "3.2", opciones: ["45", "6.4", "3.2"] }
];
let ejercicioActual = null;

function cargarEjercicioAleatorio() {
    const indice = Math.floor(Math.random() * listaEjercicios.length);
    ejercicioActual = listaEjercicios[indice];
    const opcionesMezcladas = [...ejercicioActual.opciones].sort(() => Math.random() - 0.5);
    document.getElementById("texto-ejercicio").textContent = ejercicioActual.ecuacion;
    document.getElementById("mensaje-validacion").textContent = "";
    const contenedor = document.querySelector(".grupo-opciones");
    contenedor.innerHTML = "";
    opcionesMezcladas.forEach((valor) => {
        const btn = Object.assign(document.createElement("button"), {
            textContent: valor,
            style: `
                display: block;
                margin: 10px auto;
                padding: 12px 30px;
                border-radius: 8px;
                border: 3px solid #f06292;
                background: #f8cddf;
                color: #ad1457;
                font-size: 17px;
                font-weight: bold;
                min-width: 180px;
                cursor: pointer;
                transition: all 0.25s ease;
            `
        });
        btn.onclick = () => validarRespuesta(valor, btn);
        contenedor.appendChild(btn);
    });
    document.getElementById("area-resultado").style.display = "block";
}

function validarRespuesta(valor, btn) {
    const msg = document.getElementById("mensaje-validacion");
    const esCorrecta = Math.abs(parseFloat(valor) - parseFloat(ejercicioActual.correcta)) < 0.01;
    if (esCorrecta) {
        msg.textContent = "✅ ¡Correcto! Bien hecho.";
        msg.style.color = "#2e7d32";
        btn.style.background = "#c8e6c9";
        btn.style.borderColor = "#4caf50";
    } else {
        msg.textContent = "❌ Incorrecto. Inténtalo de nuevo.";
        msg.style.color = "#c62828";
        btn.style.background = "#ffcdd2";
        btn.style.borderColor = "#f44336";
    }
}

function reiniciarEjercicio() {
    document.getElementById("area-resultado").style.display = "none";
    setTimeout(cargarEjercicioAleatorio, 200);
}

// ---------- FIGURAS GEOMÉTRICAS ----------
function calcularCuadrado() {
    const lado = parseInt(document.getElementById('cuadrado-lado').value);
    if (!lado || lado <= 0) {
        document.getElementById('cuadrado-resultado').innerHTML = "Escribe un número mayor a 0";
        return;
    }
    document.getElementById('cuadrado-resultado').innerHTML = 
        "Perímetro: " + (lado * 4) + "<br>Área: " + (lado * lado);
}

function calcularRectangulo() {
    const base = parseInt(document.getElementById('rectangulo-base').value);
    const altura = parseInt(document.getElementById('rectangulo-altura').value);
    if (!base || !altura || base <= 0 || altura <= 0) {
        document.getElementById('rectangulo-resultado').innerHTML = "Escribe valores mayores a 0";
        return;
    }
    document.getElementById('rectangulo-resultado').innerHTML = 
        "Perímetro: " + ((base * 2) + (altura * 2)) + "<br>Área: " + (base * altura);
}

function calcularTriangulo() {
    const l1 = parseInt(document.getElementById('triangulo-lado1').value);
    const l2 = parseInt(document.getElementById('triangulo-lado2').value);
    const l3 = parseInt(document.getElementById('triangulo-lado3').value);
    const b = parseInt(document.getElementById('triangulo-base').value);
    const h = parseInt(document.getElementById('triangulo-altura').value);
    if (!l1 || !l2 || !l3 || !b || !h || l1 <= 0) {
        document.getElementById('triangulo-resultado').innerHTML = "Escribe todos los valores mayores a 0";
        return;
    }
    document.getElementById('triangulo-resultado').innerHTML = 
        "Perímetro: " + (l1 + l2 + l3) + "<br>Área: " + ((b * h) / 2);
}

function calcularCirculo() {
    const r = parseInt(document.getElementById('circulo-radio').value);
    if (!r || r <= 0) {
        document.getElementById('circulo-resultado').innerHTML = "Escribe un número mayor a 0";
        return;
    }
    const PI = 3.1416;
    document.getElementById('circulo-resultado').innerHTML = 
        "Perímetro: " + (2 * PI * r).toFixed(2) + "<br>Área: " + (PI * r * r).toFixed(2);
}

function calcularTrapecio() {
    const B = parseInt(document.getElementById('trapecio-baseMayor').value);
    const b = parseInt(document.getElementById('trapecio-baseMenor').value);
    const l1 = parseInt(document.getElementById('trapecio-lado1').value);
    const l2 = parseInt(document.getElementById('trapecio-lado2').value);
    const h = parseInt(document.getElementById('trapecio-altura').value);
    if (!B || !b || !l1 || !l2 || !h || B <= 0) {
        document.getElementById('trapecio-resultado').innerHTML = "Escribe todos los valores mayores a 0";
        return;
    }
    document.getElementById('trapecio-resultado').innerHTML = 
        "Perímetro: " + (B + b + l1 + l2) + "<br>Área: " + (((B + b) / 2) * h);
}

// CARGAR TODO AL INICIO
window.onload = function() {
    cargarEjercicioAleatorio();
    document.getElementById('btn-cuadrado').addEventListener('click', calcularCuadrado);
    document.getElementById('btn-rectangulo').addEventListener('click', calcularRectangulo);
    document.getElementById('btn-triangulo').addEventListener('click', calcularTriangulo);
    document.getElementById('btn-circulo').addEventListener('click', calcularCirculo);
    document.getElementById('btn-trapecio').addEventListener('click', calcularTrapecio);
};