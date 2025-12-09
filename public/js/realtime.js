const socket = io();

// Cuando el servidor diga "updateProducts", recargar la lista
socket.on("updateProducts", async () => {
  const response = await fetch("/api/products");
  const products = await response.json();

  const list = document.getElementById("productsList");
  list.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.title} - $${p.price}`;
    list.appendChild(li);
  });
});

// Enviar creación por websocket
const form = document.getElementById("productForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  socket.emit("newProduct", data);

  fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(() => {
    form.reset();
  });
});
