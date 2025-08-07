const fakeStockInfo = {
  "SBI": {
    price: 805.15,
    volume: "3,955,677",
    description: "State Bank of India is India’s largest public sector bank.",
    sector: "Banking"
  },
  "HDFC": {
    price: 1585.90,
    volume: "2,123,987",
    description: "HDFC Bank is one of India’s top private sector banks.",
    sector: "Banking"
  },
  "ITC": {
    price: 412.00,
    volume: "8,495,104",
    description: "ITC Limited is a diversified conglomerate with a strong FMCG business.",
    sector: "FMCG"
  },
  "TCS": {
    price: 3799.75,
    volume: "1,623,450",
    description: "Tata Consultancy Services is a global IT services giant.",
    sector: "IT Services"
  },
  "RELIANCE": {
    price: 2855.40,
    volume: "6,234,909",
    description: "Reliance Industries operates across energy, petrochemicals, and retail.",
    sector: "Conglomerate"
  }
};

const topStocks = [
  { name: "SBI", price: 805.15, change: "+1.25%", marketCap: "₹7.2T" },
  { name: "HDFC", price: 1585.90, change: "-0.75%", marketCap: "₹9.5T" },
  { name: "ITC", price: 412.00, change: "+0.55%", marketCap: "₹5.1T" },
  { name: "TCS", price: 3799.75, change: "+0.35%", marketCap: "₹13.4T" },
  { name: "RELIANCE", price: 2855.40, change: "-0.15%", marketCap: "₹19.7T" }
];

function trackStock() {
  const stockInput = document.getElementById("stockInput").value.toUpperCase();
  const stockData = fakeStockInfo[stockInput];

  const stockInfoDiv = document.getElementById("stockInfo");
  if (stockData) {
    stockInfoDiv.innerHTML = `
      <h3>${stockInput}</h3>
      <p><strong>Price:</strong> ₹${stockData.price}</p>
      <p><strong>Volume:</strong> ${stockData.volume}</p>
      <p><strong>Sector:</strong> ${stockData.sector}</p>
      <p><strong>Description:</strong> ${stockData.description}</p>
    `;
  } else {
    stockInfoDiv.innerHTML = `<p>Stock not found. Try SBI, HDFC, ITC, TCS, RELIANCE.</p>`;
  }
}

function showSuggestions() {
  const input = document.getElementById("stockInput").value.toUpperCase();
  const suggestionsDiv = document.getElementById("suggestions");
  const suggestions = Object.keys(fakeStockInfo).filter(stock => stock.startsWith(input));
  suggestionsDiv.innerHTML = suggestions.join(", ");
}

function showTopStocks() {
  const tbody = document.querySelector("#topStocks tbody");
  tbody.innerHTML = '';
  topStocks.forEach(stock => {
    tbody.innerHTML += `
      <tr>
        <td>${stock.name}</td>
        <td>${stock.price}</td>
        <td>${stock.change}</td>
        <td>${stock.marketCap}</td>
      </tr>
    `;
  });
}

document.getElementById("stockInput").addEventListener("input", showSuggestions);
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

window.onload = () => {
  showTopStocks();
};
