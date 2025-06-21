let filter = document.getElementById("filter");
let commaNumber = document.getElementById("commaNumber");
let copy = document.getElementById("copy");
let sendMail = document.getElementById("sendMail");
let tableBody = document.getElementById("table_body");

copy.style.display = "none";
sendMail.style.backgroundColor = "tomato";
sendMail.disabled = true;

function isExpired(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry < now;
}

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach(v => {
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
}

fetch(`${window.location.origin}/memberApi`)
  .then(res => res.json())
  .then(data => renderTable(data));

filter.addEventListener("change", (e) => {
  fetch(`${window.location.origin}/memberApi`)
    .then(res => res.json())
    .then(data => {
      let filtered = [];

      switch (e.target.value) {
        case "all":
          sendMail.disabled = true;
          sendMail.style.backgroundColor = "tomato";
          filtered = data;
          break;

        case "expiry":
          filtered = data.filter(v => isExpired(v.expiry));
          sendMail.disabled = filtered.length === 0;
          sendMail.style.backgroundColor = filtered.length ? "lightgreen" : "tomato";
          break;

        case "pending":
          filtered = data.filter(v => v.status === "Pending");
          sendMail.disabled = true;
          sendMail.style.backgroundColor = "tomato";
          break;

        case "clear":
          filtered = data.filter(v => v.status === "Clear");
          sendMail.disabled = true;
          sendMail.style.backgroundColor = "tomato";
          break;
      }

      renderTable(filtered);
    });
});

document.getElementById("printButton").addEventListener("click", () => {
  window.print();
});

function getExpiredList() {
  fetch(`${window.location.origin}/memberApi`)
    .then(res => res.json())
    .then(data => {
      const expiredWhatsapp = data
        .filter(v => isExpired(v.expiry))
        .map(v => `+91${v.whatsapp}`);

      commaNumber.innerText = expiredWhatsapp.join(",");
      copy.style.display = "flex";
    })
    .catch(err => console.error("Error:", err));
}

function getPendingList() {
  fetch(`${window.location.origin}/memberApi`)
    .then(res => res.json())
    .then(data => {
      const pendingList = data.filter(v => v.status === "Pending");
      renderTable(pendingList);
      commaNumber.innerText = pendingList.map(v => `+91${v.whatsapp}`).join(",");
      copy.style.display = "flex";
    })
    .catch(err => console.error("Error:", err));
}

function copyIt() {
  const text = document.getElementById("commaNumber").innerText;
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  document.getElementById("commaNumber").innerText = "Text copied to clipboard!";
  copy.style.display = "none";
}

document.getElementById("sendMail").addEventListener("click", function () {
  this.style.backgroundColor = 'tomato';
  this.innerHTML = "Sending please wait....";
});
