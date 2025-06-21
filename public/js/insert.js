// WhatsApp Duplicate Check
let whatsapp = document.getElementById("whatsapp");
whatsapp.addEventListener("change", (e) => {
  fetch(`${window.location.origin}/memberApi`)
    .then((data) => data.json())
    .then((r) => {
      let found = false;

      for (let i = 0; i < r.length; i++) {
        if (r[i]["whatsapp"] == e.target.value) {
          let submit = document.getElementById("submit");
          submit.disabled = true;
          submit.style.backgroundColor = "tomato";
          document.getElementById("data_status").innerHTML =
            `<p style="color:tomato">${e.target.value} already exists</p>`;
          found = true;
          break;
        }
      }

      if (!found) {
        document.getElementById("data_status").innerHTML = ``;
        let submit = document.getElementById("submit");
        submit.disabled = false;
        submit.style.backgroundColor = "#007BFF";
      }
    });
});

// Submit Button Feedback and Status Logging
let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  submit.textContent = "Adding Member...";
  submit.style.backgroundColor = "tomato";

  // Log selected status
  const selectedStatus = document.querySelector('input[name="status"]:checked');
  if (selectedStatus) {
    console.log("Selected Status:", selectedStatus.value);
  } else {
    console.warn("No status selected");
  }
});

// File Upload Name Display + Image Preview
const fileInput = document.getElementById("file-upload");
const fileNameDisplay = document.getElementById("file-upload-name");
const imagePreview = document.getElementById("preview-image");

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  const fileName = file?.name || "No file selected";
  fileNameDisplay.textContent = fileName;

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.src = "";
    imagePreview.style.display = "none";
  }
});
