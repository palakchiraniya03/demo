const topStocks = [
  { name: "Reliance", price: "1390.85", change: "-0.15%", marketCap: "₹43.5L Cr" },
  { name: "TCS", price: "3032.30", change: "—", marketCap: "₹11L Cr" },
  { name: "HDFC Bank", price: "1995.40", change: "+0.63%", marketCap: "₹15.5L Cr" },
  { name: "Infosys", price: "1437.65", change: "+0.13%", marketCap: "₹6L Cr" },
  { name: "ICICI Bank", price: "1444.75", change: "+0.03%", marketCap: "₹10.5L Cr" },
];

// Render table
function showTopStocks() {
  const tbody = document.querySelector("#topStocks tbody");
  tbody.innerHTML = '';
  topStocks.forEach(stock => {
    tbody.innerHTML += `<tr>
      <td>${stock.name}</td>
      <td>${stock.price}</td>
      <td>${stock.change}</td>
      <td>${stock.marketCap}</td>
    </tr>`;
  });
}

// Dark mode toggle
document.getElementById('darkToggle').onclick = () => {
  document.body.classList.toggle('dark-mode');
};

// Stock search & suggestions
const stockInput = document.getElementById('stockInput');
const suggestions = document.getElementById('suggestions');
const stockInfo = document.getElementById('stockInfo');

stockInput.addEventListener('input', () => {
  suggestions.innerHTML = '';
  const query = stockInput.value.toLowerCase();
  if (!query) return;
  topStocks.forEach(s => {
    if (s.name.toLowerCase().includes(query)) {
      const li = document.createElement('li');
      li.textContent = s.name;
      li.onclick = () => {
        stockInput.value = s.name;
        suggestions.innerHTML = '';
        showStock(s.name);
      };
      suggestions.append(li);
    }
  });
});

document.getElementById('trackBtn').onclick = () => showStock(stockInput.value.trim());

function showStock(name) {
  const s = topStocks.find(stock => stock.name.toLowerCase() === name.toLowerCase());
  if (!s) {
    stockInfo.innerHTML = `<p>Stock "${name}" not found.</p>`;
    return;
  }
  stockInfo.innerHTML = `
    <h3>${s.name}</h3>
    <p><strong>Price:</strong> ₹${s.price}</p>
    <p><strong>Change:</strong> ${s.change}</p>
    <p><strong>Market Cap:</strong> ${s.marketCap}</p>
  `;
}

// Initialize
window.onload = showTopStocks;
