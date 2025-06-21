let membershipId = document.getElementById("membership-id");
let whatsapp = document.getElementById("whatsapp");
let name = document.getElementById("name");
let gmail = document.getElementById("gmail");
let membershipDate = document.getElementById("membership-date");
let membershipDuration = document.getElementById("membership-duration");
let feesPaid = document.getElementById("fees-paid");
let image = document.getElementById("image");
let offer = document.getElementById("offer");
let pending = document.getElementById('pending')
let remaining = document.getElementById('remaining')
whatsapp.addEventListener("change", (e) => {
  fetch(`${window.location.origin}/memberApi`)
    .then((data) => data.json())
    .then((r) => {
      console.log(r)
      let status = document.getElementById("status");
      status.innerHTML = ``;
      let submit = document.getElementById("submit");
      submit.disabled = false;

      for (i = 0; i < r.length; i++) {
        if (r[i]["whatsapp"] == e.target.value) {
          membershipId.value = r[i]["id"];
          name.value = r[i]["name"];
          gmail.value = r[i]["gmail"];
          membershipDate.value = r[i]["membership_date"];
          membershipDuration.value = r[i]["membership_duration"];
          feesPaid.value = r[i]["fees_paid"];
          offer.value = r[i]["offer"];
          image.value = r[i]["image"];
          if(r[i]["status"] == "Pending")
            pending.checked = true
          if(r[i]["status"] == "Clear")
            remaining.checked = true
          let status = document.getElementById("status");
          status.innerHTML = ``;
          let submit = document.getElementById("submit");
          submit.disabled = false;
          return;
        } else {
          let submit = document.getElementById("submit");
          submit.disabled = true;
          let status = document.getElementById("status");
          status.innerHTML = `<p style="color:red">No data found</p>`;
        }
      }
    });
});
