const fakeStockInfo = {
  "SBI": {
    price: 805.15,
    volume: "3,955,677",
    description: "State Bank of India is the country’s largest public sector bank.",
    sector: "Banking"
  },
  "ITC": {
    price: 412.00,
    volume: "8,495,104",
    description: "ITC Limited is a conglomerate with FMCG, cigarettes, and more.",
    sector: "Consumer Goods"
  },
  "Bajaj Finance": {
    price: 876.65,
    volume: "2,483,494",
    description: "Bajaj Finance Ltd is a major NBFC in consumer and SME lending.",
    sector: "Financial Services"
  },
  "Infosys": {
    price: 1523.10,
    volume: "5,340,901",
    description: "Infosys is a global IT consulting and services company.",
    sector: "Technology"
  },
  "Reliance": {
    price: 2810.75,
    volume: "6,754,000",
    description: "Reliance Industries operates in petrochemicals, telecom, and retail.",
    sector: "Conglomerate"
  }
};

window.onload = () => {
  const stockInput = document.getElementById("stockInput");
  const stockData = document.getElementById("stockData");
  const suggestionBox = document.getElementById("suggestions");

  function trackStock() {
    const input = stockInput.value.trim().toLowerCase();
    if (!input) {
      stockData.innerHTML = "⚠️ Please enter a stock name.";
      return;
    }

    const cleanedInput = input.replace(/[^a-z0-9]/gi, "");
    let matched = null;

    for (const name in fakeStockInfo) {
      const cleanName = name.toLowerCase().replace(/[^a-z0-9]/gi, "");
      if (cleanName.includes(cleanedInput)) {
        matched = name;
        break;
      }
    }

    if (matched) {
      const s = fakeStockInfo[matched];
      stockData.innerHTML = `
        <strong>📊 ${matched}</strong><br>
        💵 Price: ₹${s.price}<br>
        📦 Volume: ${s.volume}<br>
        🏭 Sector: ${s.sector}<br>
        📝 About: ${s.description}
      `;
    } else {
      stockData.innerHTML = `❌ Sorry, "${input}" not found in database.`;
    }

    stockInput.value = "";
    suggestionBox.innerHTML = "";
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  function showSuggestions() {
    const input = stockInput.value.trim().toLowerCase();
    suggestionBox.innerHTML = "";

    if (!input) return;

    const matches = Object.keys(fakeStockInfo).filter(name =>
      name.toLowerCase().includes(input)
    );

    matches.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      li.onclick = () => {
        stockInput.value = name;
        suggestionBox.innerHTML = "";
        trackStock();
      };
      suggestionBox.appendChild(li);
    });
  }

  function displayAvailableStocks() {
    const list = Object.keys(fakeStockInfo).join(', ');
    document.getElementById("stockList").innerText = `📦 Available: ${list}`;
  }

  // Events
  stockInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      trackStock();
    }
  });

  stockInput.addEventListener("input", showSuggestions);
  document.addEventListener("click", e => {
    if (e.target !== stockInput) suggestionBox.innerHTML = "";
  });

  // Expose functions
  window.trackStock = trackStock;
  window.toggleDarkMode = toggleDarkMode;

  displayAvailableStocks();
};
