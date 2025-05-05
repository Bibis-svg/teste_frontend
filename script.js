const form = document.getElementById("productForm");
const list = document.getElementById("productList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    price: parseFloat(document.getElementById("price").value),
    category: document.getElementById("category").value
  };

  // Envia o produto via POST
  const response = await fetch("web-production-8273.up.railway.app/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  const result = await response.json();
  console.log("Produto adicionado:", result);

  // Atualiza a lista de produtos após o POST
  await fetchAndDisplayProducts();

  // Limpa os campos do formulário
  form.reset();
});

// Busca os produtos existentes e exibe na tela
async function fetchAndDisplayProducts() {
  const response = await fetch("web-production-8273.up.railway.app/products");
  const products = await response.json();

  list.innerHTML = "";
  products.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.name} - R$ ${p.price.toFixed(2)} [${p.category}]`;
    list.appendChild(item);
  });
}

// Exibe os produtos assim que a página carrega
fetchAndDisplayProducts();
