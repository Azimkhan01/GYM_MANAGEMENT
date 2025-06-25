const filter = document.getElementById("filter");
const commaNumber = document.getElementById("commaNumber");
const copy = document.getElementById("copy");
const sendMail = document.getElementById("sendMail");
const tableBody = document.getElementById("table_body");
const container = document.querySelector(".container");

copy.style.display = "none";
sendMail.style.backgroundColor = "tomato";
sendMail.disabled = true;

let allData = [];
let filteredData = [];
let currentPage = 1;
const rowsPerPage = 100;

function isExpired(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry < now;
}

function renderTable(data, page = 1) {
  tableBody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedItems = data.slice(start, end);

  paginatedItems.forEach(v => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.id}</td>
      <td><img src="${v.image}" alt="${v.name}" class="passport"></td>
      <td>${v.name}</td>
      <td>${v.whatsapp}</td>
      <td>${v.gmail}</td>
      <td>${v.membership_date}</td>
      <td>${v.membership_duration}</td>
      <td>${v.fees_paid}</td>
      <td>${v.expiry}</td>
      <td>${v.offer}</td>
      <td>${v.status}</td>
    `;
    tableBody.appendChild(tr);
  });

  renderPagination(data, page);
}

function renderPagination(data, page) {
  const oldPagination = document.getElementById("pagination");
  if (oldPagination) oldPagination.remove();

  const pagination = document.createElement("div");
  pagination.id = "pagination";
  pagination.style.marginTop = "20px";
  pagination.style.textAlign = "center";
  pagination.style.display = "flex";
  pagination.style.justifyContent = "center";
  pagination.style.flexWrap = "wrap";
  pagination.style.gap = "8px";

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = page === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderTable(filteredData, currentPage);
  };
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.style.margin = "0 5px";
    if (i === page) {
      pageBtn.style.fontWeight = "bold";
      pageBtn.disabled = true;
      pageBtn.style.backgroundColor = "#28a745"; // Active page style
      pageBtn.style.color = "#fff";
    }
    pageBtn.onclick = () => {
      currentPage = i;
      renderTable(filteredData, currentPage);
    };
    pagination.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = page === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    renderTable(filteredData, currentPage);
  };
  pagination.appendChild(nextBtn);

  container.appendChild(pagination);
}

// Initial load
fetch(`${window.location.origin}/memberApi`)
  .then(res => res.json())
  .then(data => {
    allData = data;
    filteredData = allData;
    renderTable(filteredData, currentPage);
  });

filter.addEventListener("change", (e) => {
  currentPage = 1;
  const value = e.target.value;

  switch (value) {
    case "all":
      filteredData = allData;
      sendMail.disabled = true;
      sendMail.style.backgroundColor = "tomato";
      break;

    case "expiry":
      filteredData = allData.filter(v => isExpired(v.expiry));
      sendMail.disabled = filteredData.length === 0;
      sendMail.style.backgroundColor = filteredData.length ? "lightgreen" : "tomato";
      break;

    case "pending":
      filteredData = allData.filter(v => v.status === "Pending");
      sendMail.disabled = true;
      sendMail.style.backgroundColor = "tomato";
      break;

    case "clear":
      filteredData = allData.filter(v => v.status === "Clear");
      sendMail.disabled = true;
      sendMail.style.backgroundColor = "tomato";
      break;
  }

  renderTable(filteredData, currentPage);
});

document.getElementById("printButton").addEventListener("click", () => {
  window.print();
});

function getExpiredList() {
  const expiredWhatsapp = allData
    .filter(v => isExpired(v.expiry))
    .map(v => `+91${v.whatsapp}`);

  commaNumber.innerText = expiredWhatsapp.join(",");
  copy.style.display = "flex";
}

function getPendingList() {
  const pendingList = allData.filter(v => v.status === "Pending");
  filteredData = pendingList;
  currentPage = 1;
  renderTable(filteredData, currentPage);
  commaNumber.innerText = pendingList.map(v => `+91${v.whatsapp}`).join(",");
  copy.style.display = "flex";
}

function copyIt() {
  const text = commaNumber.innerText;
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  commaNumber.innerText = "Text copied to clipboard!";
  copy.style.display = "none";
}

// 🔁 Send mail for current page only (max 100)
sendMail.addEventListener("click", async (e) => {
  e.preventDefault();

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentPageData = filteredData.slice(start, end);

  if (currentPageData.length === 0) {
    alert("No members on current page to send mail to.");
    return;
  }

  sendMail.innerText = "Sending... Please wait";
  sendMail.style.backgroundColor = "gray";

  try {
    const response = await fetch("/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentPageData)
    });

    const html = await response.text();
    document.open();
    document.write(html);
    document.close();
  } catch (err) {
    console.error("Mail sending failed:", err);
    alert("Error sending mail. Try again.");
    sendMail.innerText = "Send Mail";
    sendMail.style.backgroundColor = "tomato";
  }
});
