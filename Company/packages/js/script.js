document.addEventListener('DOMContentLoaded', function() {
  const fields = ["name", "last_name", "email", "message"];
  const toast = new bootstrap.Toast(document.getElementById("toast"));

  function showToast(message, bg = "bg-success") {
    const toastEl = document.getElementById("toast");
    toastEl.className = `toast align-items-center text-white ${bg} border-0`;
    document.getElementById("toastMessage").textContent = message;
    toast.show();
  }

  function saveFormData() {
    fields.forEach((id) => {
      const val = document.getElementById(id).value.trim();
      if (val) localStorage.setItem(id, val);
    });
  }

  function loadFormData() {
    fields.forEach((id) => {
      const val = localStorage.getItem(id);
      if (val) document.getElementById(id).value = val;
    });
  }

  function clearFormData() {
    fields.forEach((id) => {
      localStorage.removeItem(id);
      document.getElementById(id).value = "";
    });
    document.getElementById("fileInput").value = "";
    document.getElementById("filePreview").textContent = "";
    showToast("Form cleared!", "bg-warning");
  }

  // File preview
  document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("filePreview");
    if (file) {
      preview.textContent = `Selected file: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    } else {
      preview.textContent = "";
    }
  });

  // AJAX submit
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    saveFormData();

    const form = e.target;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          clearFormData();
          showToast("Form submitted successfully!");
        } else {
          showToast("Submission failed.", "bg-danger");
        }
      })
      .catch(() => {
        showToast("Submission error.", "bg-danger");
      });
  });

  // Event bindings
  loadFormData();
  document.getElementById("clearBtn").addEventListener("click", clearFormData);
});