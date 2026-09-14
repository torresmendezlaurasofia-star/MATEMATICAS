//calculadora de fracciones//
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



// Datos de cada opción: 3 respuestas CORRECTAS y 1 INCORRECTA
const ejercicios = {
    A: {
        enunciado: "Resuelve: 29 + 63X = 8 + 41X",
        respuestasCorrectas: [-0.95, -0.9545, -21/22],
        respuestaIncorrecta: 36
    },
    B: {
        enunciado: "Resuelve: 15X - 42 = 8X - 6",
        respuestasCorrectas: [5.14, 5.1428, 36/7],
        respuestaIncorrecta: 22
    },
    C: {
        enunciado: "Resuelve: 8(X + 5) = 72 - 2X",
        respuestasCorrectas: [3.2, 16/5, 3.20],
        respuestaIncorrecta: 45
    }
};

const datos = {
    A: { ecuacion: "29 + 63X = 8 + 41X", buenas: [-0.95, -0.9545, "-21/22"], mala: 36 },
    B: { ecuacion: "15X - 42 = 8X - 6", buenas: [5.14, 5.1428, "36/7"], mala: 22 },
    C: { ecuacion: "8(X + 5) = 72 - 2X", buenas: [3.2, "16/5", 3.2], mala: 45 }
};

function mostrarOpciones(letra) {
    const d = datos[letra];
    const area = document.getElementById("area-resultado");
    document.getElementById("texto-ejercicio").textContent = d.ecuacion;
    document.getElementById("mensaje-validacion").textContent = "";
    
    const ops = [...d.buenas, d.mala].sort(() => Math.random() - 0.5);
    const contenedor = document.querySelector(".grupo-opciones");
    contenedor.innerHTML = "";

    ops.forEach(v => {
        const btn = Object.assign(document.createElement("button"), {
            textContent: v,
            style: "padding:12px 22px; border-radius:50%; border:3px solid #f06292; background:#f8cddf; color:#ad1457; font-size:17px; font-weight:bold; width:75px; height:75px; cursor:pointer; transition:all 0.25s ease;"
        });
        btn.onclick = () => validar(v, d.buenas, btn);
        contenedor.appendChild(btn);
    });
    area.style.display = "block";
}

function validar(valor, buenas, btn) {
    const ok = buenas.some(b => Math.abs(parseFloat(valor) - parseFloat(b)) < 0.01);
    const msg = document.getElementById("mensaje-validacion");
    if (ok) {
        msg.textContent = "✅ ¡Correcto!"; msg.style.color = "#2e7d32";
        btn.style.background = "#c8e6c9"; btn.style.borderColor = "#4caf50";
    } else {
        msg.textContent = "❌ Incorrecto. Inténtalo de nuevo."; msg.style.color = "#c62828";
        btn.style.background = "#ffcdd2"; btn.style.borderColor = "#f44336";
    }
}

function reiniciarEjercicio() {
    document.getElementById("area-resultado").style.display = "none";
}