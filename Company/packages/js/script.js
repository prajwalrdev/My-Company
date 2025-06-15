document.addEventListener('DOMContentLoaded', function() {
  const fields = ["name", "last_name", "email", "message"];
  const toastEl = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMessage");
  const toast = toastEl ? new bootstrap.Toast(toastEl) : null;

  function showToast(message, bg = "bg-success") {
    if (!toastEl || !toastMsg || !toast) return;
    toastEl.className = `toast align-items-center text-white ${bg} border-0`;
    toastMsg.textContent = message;
    toast.show();
  }

  function saveFormData() {
    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const val = el.value.trim();
        if (val) localStorage.setItem(id, val);
      }
    });
  }

  function loadFormData() {
    fields.forEach((id) => {
      const el = document.getElementById(id);
      const val = localStorage.getItem(id);
      if (el && val) el.value = val;
    });
  }

  function clearFormData() {
    fields.forEach((id) => {
      localStorage.removeItem(id);
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    const fileInput = document.getElementById("fileInput");
    const filePreview = document.getElementById("filePreview");
    if (fileInput) fileInput.value = "";
    if (filePreview) filePreview.textContent = "";
    showToast("Form cleared!", "bg-warning");
  }

  // File preview
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      const preview = document.getElementById("filePreview");
      if (preview) {
        if (file) {
          preview.textContent = `Selected file: ${file.name} (${Math.round(file.size / 1024)} KB)`;
        } else {
          preview.textContent = "";
        }
      }
    });
  }

  // AJAX submit
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
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
  }

  // Event bindings
  loadFormData();
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) clearBtn.addEventListener("click", clearFormData);
});