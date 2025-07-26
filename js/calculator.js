// Configuración
const PRECIO_ASH_USDT = 0.001; // 1 ASH = $0.001
const GAS_ESTIMADO_USDT = 0.5;
const DIRECCION_PAGO = "0x72dA92a08a5a542929714858b2Cf56E8C581A937";

// Elementos
const ashAmount = document.getElementById("ashAmount");
const usdtAmount = document.getElementById("usdtAmount");
const userAddress = document.getElementById("userAddress");
const paymentAddress = document.getElementById("paymentAddress");
const qrcode = document.getElementById("qrcode");
const copyBtn = document.getElementById("copyBtn");

// Mostrar QR
new QRCode(qrcode, {
  text: DIRECCION_PAGO,
  width: 180,
  height: 180
});

// Actualizar dirección de pago
paymentAddress.textContent = DIRECCION_PAGO;

// Cálculo automático
function calcular() {
  const cantidad = parseFloat(ashAmount.value) || 0;
  if (cantidad < 100) {
    usdtAmount.value = "Mínimo 100 ASH";
    return;
  }
  const totalUSDT = (cantidad * PRECIO_ASH_USDT) + GAS_ESTIMADO_USDT;
  usdtAmount.value = totalUSDT.toFixed(6) + " USDT";
}

// Copiar dirección
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(DIRECCION_PAGO).then(() => {
    alert("✅ Dirección copiada: " + DIRECCION_PAGO);
  }).catch(err => {
    console.error("Error al copiar:", err);
    alert("❌ No se pudo copiar. Selecciónala manualmente.");
  });
});

// Escuchar cambios
ashAmount.addEventListener("input", calcular);
calcular(); // Inicial