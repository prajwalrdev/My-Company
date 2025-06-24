document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeSwitcher = document.getElementById('themeSwitcher');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    themeSwitcher.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // Visit Counter (Background - No Display)
    async function trackVisit() {
        try {
            // Check if this is a real page visit (not a bot or refresh)
            if (navigator.userAgent.includes('bot') || navigator.userAgent.includes('crawler')) {
                return; // Don't count bot visits
            }
            
            const visitCounter = new VisitCounter();
            await visitCounter.incrementVisit();
            
            // Log success for debugging (only in console)
            console.log('Visit tracked successfully');
        } catch (error) {
            console.error('Error tracking visit:', error);
        }
    }

    // Initialize visit tracking (silent)
    trackVisit();

    // Run after full page load
    window.addEventListener('load', function() {
      const preloader = document.querySelector('.preloader');
      const mainContent = document.getElementById('main-content');
      const footer = document.querySelector('.site-footer');

      if (preloader) {
        // Fade out preloader
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }

      if (mainContent) {
        // Show main content after fade out
        setTimeout(() => {
          preloader.style.display = 'none';
          mainContent.style.display = 'block';
          if (footer) {
            footer.style.visibility = 'visible';
          }
        }, 500);
      }

      // Scroll Progress Indicator
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);

      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      });

      // Intersection Observer for Section Animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1
      });

      document.querySelectorAll('.main-section').forEach(section => {
        observer.observe(section);
      });

      // Enhanced Image Loading
      document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
          img.classList.add('loaded');
        } else {
          img.addEventListener('load', function() {
            this.classList.add('loaded');
          });
        }
      });

      // Enhanced Form Handling
      const form = document.getElementById('contactForm');
      if (form) {
        form.addEventListener('submit', async function(e) {
          e.preventDefault();
          const submitBtn = this.querySelector('button[type="submit"]');
          submitBtn.classList.add('btn-loading');
          
          try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const toast = new bootstrap.Toast(document.getElementById('toast'));
            document.getElementById('toastMessage').textContent = 'Message sent successfully!';
            toast.show();
            form.reset();
          } catch (error) {
            document.getElementById('toastMessage').textContent = 'Error sending message. Please try again.';
            toast.show();
          } finally {
            submitBtn.classList.remove('btn-loading');
          }
        });
      }

      // Enhanced File Input
      const fileInput = document.getElementById('fileInput');
      const filePreview = document.getElementById('filePreview');
      if (fileInput && filePreview) {
        fileInput.addEventListener('change', function() {
          if (this.files && this.files[0]) {
            const file = this.files[0];
            const size = (file.size / 1024 / 1024).toFixed(2);
            filePreview.textContent = `Selected: ${file.name} (${size}MB)`;
            
            // Preview image if it's an image file
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.marginTop = '10px';
                filePreview.appendChild(img);
              };
              reader.readAsDataURL(file);
            }
          } else {
            filePreview.textContent = '';
            filePreview.innerHTML = '';
          }
        });
      }

      // Enhanced Clear Button
      const clearBtn = document.getElementById('clearBtn');
      if (clearBtn && form) {
        clearBtn.addEventListener('click', function() {
          form.reset();
          if (filePreview) {
            filePreview.textContent = '';
            filePreview.innerHTML = '';
          }
          const toast = new bootstrap.Toast(document.getElementById('toast'));
          document.getElementById('toastMessage').textContent = 'Form cleared!';
          toast.show();
        });
      }

      // Enhanced Navbar Functionality
      window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY;

        // Add scrolled class to navbar
        if (scrollPosition > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        navLinks.forEach(link => {
          const section = document.querySelector(link.getAttribute('href'));
          if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          }
        });
      });

      // Smooth scroll with active state update
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all links
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          
          // Add active class to clicked link
          this.classList.add('active');
          
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.custom-toggler');
        
        if (navbar.classList.contains('show') && 
            !navbar.contains(e.target) && 
            !toggler.contains(e.target)) {
          new bootstrap.Collapse(navbar).hide();
        }
      });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Add this to your existing script
    document.addEventListener('DOMContentLoaded', function() {
      // Set submission date
      const submissionDateInput = document.getElementById('submissionDate');
      submissionDateInput.value = new Date().toISOString();

      // Admin check (you can modify this based on your authentication method)
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const viewSubmissionsBtn = document.getElementById('viewSubmissions');
      if (isAdmin) {
        viewSubmissionsBtn.style.display = 'block';
      }

      // View Submissions Button Click
      viewSubmissionsBtn.addEventListener('click', function() {
        const submissionsModal = new bootstrap.Modal(document.getElementById('submissionsModal'));
        submissionsModal.show();
        loadSubmissions();
      });

      // Load Submissions
      async function loadSubmissions() {
        try {
          const response = await fetch('/.netlify/functions/get-submissions');
          const submissions = await response.json();
          
          const tableBody = document.getElementById('submissionsTableBody');
          tableBody.innerHTML = '';

          submissions.forEach(submission => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${new Date(submission.data['submission-date']).toLocaleString()}</td>
              <td>${submission.data.name}</td>
              <td>${submission.data.last_name}</td>
              <td>${submission.data.email}</td>
              <td>${submission.data.message}</td>
              <td>${submission.data.attachment ? 'Yes' : 'No'}</td>
              <td>
                <button class="btn btn-sm btn-info view-details" data-submission-id="${submission.id}">
                  <i class="fa fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-submission" data-submission-id="${submission.id}">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            `;
            tableBody.appendChild(row);
          });

          // Add event listeners for action buttons
          document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', viewSubmissionDetails);
          });

          document.querySelectorAll('.delete-submission').forEach(btn => {
            btn.addEventListener('click', deleteSubmission);
          });
        } catch (error) {
          console.error('Error loading submissions:', error);
          showToast('Error loading submissions', 'error');
        }
      }

      // View Submission Details
      async function viewSubmissionDetails(e) {
        const submissionId = e.target.closest('button').dataset.submissionId;
        try {
          const response = await fetch(`/.netlify/functions/get-submission/${submissionId}`);
          const submission = await response.json();
          
          // Show submission details in a modal
          const detailsModal = new bootstrap.Modal(document.getElementById('submissionDetailsModal'));
          document.getElementById('submissionDetailsBody').innerHTML = `
            <dl class="row">
              <dt class="col-sm-3">Date</dt>
              <dd class="col-sm-9">${new Date(submission.data['submission-date']).toLocaleString()}</dd>
              
              <dt class="col-sm-3">Name</dt>
              <dd class="col-sm-9">${submission.data.name}</dd>
              
              <dt class="col-sm-3">Last Name</dt>
              <dd class="col-sm-9">${submission.data.last_name}</dd>
              
              <dt class="col-sm-3">Email</dt>
              <dd class="col-sm-9">${submission.data.email}</dd>
              
              <dt class="col-sm-3">Message</dt>
              <dd class="col-sm-9">${submission.data.message}</dd>
              
              ${submission.data.attachment ? `
                <dt class="col-sm-3">Attachment</dt>
                <dd class="col-sm-9">
                  <a href="${submission.data.attachment}" target="_blank" class="btn btn-sm btn-primary">
                    <i class="fa fa-download me-2"></i>Download
                  </a>
                </dd>
              ` : ''}
            </dl>
          `;
          detailsModal.show();
        } catch (error) {
          console.error('Error loading submission details:', error);
          showToast('Error loading submission details', 'error');
        }
      }

      // Delete Submission
      async function deleteSubmission(e) {
        if (!confirm('Are you sure you want to delete this submission?')) return;
        
        const submissionId = e.target.closest('button').dataset.submissionId;
        try {
          await fetch(`/.netlify/functions/delete-submission/${submissionId}`, {
            method: 'DELETE'
          });
          showToast('Submission deleted successfully', 'success');
          loadSubmissions();
        } catch (error) {
          console.error('Error deleting submission:', error);
          showToast('Error deleting submission', 'error');
        }
      }

      // Export to CSV
      document.getElementById('exportSubmissions').addEventListener('click', async function() {
        try {
          const response = await fetch('/.netlify/functions/get-submissions');
          const submissions = await response.json();
          
          const csvContent = [
            ['Date', 'Name', 'Last Name', 'Email', 'Message', 'Attachment'],
            ...submissions.map(sub => [
              new Date(sub.data['submission-date']).toLocaleString(),
              sub.data.name,
              sub.data.last_name,
              sub.data.email,
              sub.data.message,
              sub.data.attachment ? 'Yes' : 'No'
            ])
          ].map(row => row.join(',')).join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `submissions_${new Date().toISOString().split('T')[0]}.csv`;
          link.click();
        } catch (error) {
          console.error('Error exporting submissions:', error);
          showToast('Error exporting submissions', 'error');
        }
      });

      // Check if user has visited before
      const hasVisited = localStorage.getItem('hasVisited');
      const visitorInfo = JSON.parse(localStorage.getItem('visitorInfo') || '{}');

      // Show welcome modal for first-time visitors
      if (!hasVisited) {
        const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
        welcomeModal.show();
      }

      // Handle visitor registration
      const visitorForm = document.getElementById('visitorRegistrationForm');
      const completeRegistrationBtn = document.getElementById('completeRegistration');
      const visitorNameInput = document.getElementById('visitorName');
      const visitorEmailInput = document.getElementById('visitorEmail');

      if (visitorForm && completeRegistrationBtn) {
        completeRegistrationBtn.addEventListener('click', function() {
          if (visitorForm.checkValidity()) {
            const welcomeModal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
            if (welcomeModal) {
              welcomeModal.hide();
            }
            if (visitorNameInput) {
              localStorage.setItem('visitorName', visitorNameInput.value);
            }
            if (visitorEmailInput) {
              localStorage.setItem('visitorEmail', visitorEmailInput.value);
            }
          } else {
            visitorForm.classList.add('was-validated');
          }
        });
      }

      if (visitorNameInput) {
        visitorNameInput.value = localStorage.getItem('visitorName') || '';
      }

      if (visitorEmailInput) {
        visitorEmailInput.value = localStorage.getItem('visitorEmail') || '';
      }

      // Add visitor info to form if returning visitor
      if (hasVisited && Object.keys(visitorInfo).length > 0) {
        const visitorInfoField = document.createElement('input');
        visitorInfoField.type = 'hidden';
        visitorInfoField.name = 'visitor_info';
        visitorInfoField.value = JSON.stringify(visitorInfo);
        document.getElementById('contactForm').appendChild(visitorInfoField);
      }

      // Add visitor name to form if available
      if (visitorInfo.name) {
        const nameInput = document.getElementById('name');
        if (nameInput) {
          nameInput.value = visitorInfo.name;
        }
      }

      // Add visitor email to form if available
      if (visitorInfo.email) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
          emailInput.value = visitorInfo.email;
        }
      }
    });

    // Update the form submission handler
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const buttonText = submitBtn.querySelector('.button-text');
      const spinner = submitBtn.querySelector('.spinner-border');
      
      submitBtn.disabled = true;
      buttonText.textContent = 'Sending...';
      spinner.classList.remove('d-none');

      try {
        // Get form data
        const formData = new FormData(this);
        
        // Add submission date
        formData.append('submission-date', new Date().toISOString());
        
        // Submit to Netlify
        const response = await fetch('/', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        // Show success message
        showToast('Message sent successfully!', 'success');

        // Reset form
        this.reset();
        this.classList.remove('was-validated');

        // Reset button state
        submitBtn.disabled = false;
        buttonText.textContent = 'Submit';
        spinner.classList.add('d-none');

        // Redirect to thank you page after a short delay
        setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 1500);
      } catch (error) {
        console.error('Error submitting form:', error);
        showToast('Error sending message. Please try again.', 'error');

        // Reset button state
        submitBtn.disabled = false;
        buttonText.textContent = 'Submit';
        spinner.classList.add('d-none');
      }
    });

    // Add this to your existing script
    document.addEventListener('DOMContentLoaded', function() {
      var toggler = document.querySelector('.custom-toggler');
      var collapse = document.getElementById('navbar-collapse-toggle');
      if (toggler && collapse) {
        collapse.addEventListener('show.bs.collapse', function() {
          toggler.classList.remove('collapsed');
        });
        collapse.addEventListener('hide.bs.collapse', function() {
          toggler.classList.add('collapsed');
        });
        // Set initial state
        if (!collapse.classList.contains('show')) {
          toggler.classList.add('collapsed');
        }
      }
    });

    // Scroll Animations
    const animatedItems = document.querySelectorAll('.animated-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });

    // --- Unique User and Page View Tracking ---
    (function() {
        // Firebase must be initialized and Firestore available as 'db'
        if (typeof firebase === 'undefined' || typeof firebase.firestore !== 'function') return;
        if (typeof db === 'undefined') {
            if (typeof initializeFirebase === 'function') {
                initializeFirebase();
            }
        }
        // Helper: Generate UUID
        function generateUUID() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
        // Get or create UUID for this user
        let uuid = localStorage.getItem('site_uuid');
        if (!uuid) {
            uuid = generateUUID();
            localStorage.setItem('site_uuid', uuid);
        }
        // Get page name (use pathname, e.g. 'index.html' or 'portfolio.html')
        const pageName = window.location.pathname.split('/').pop() || 'homepage';
        // Firestore refs
        const usersRef = db.collection('users').doc(uuid);
        const analyticsRef = db.collection('analytics').doc('website_visits');
        const pageViewsRef = db.collection('analytics').doc('page_views');
        // Track user and page view
        (async function() {
            try {
                // 1. Update user doc
                const userDoc = await usersRef.get();
                const now = new Date();
                if (!userDoc.exists) {
                    // New user: create doc and increment uniqueVisitors
                    await usersRef.set({
                        firstVisit: now,
                        lastVisit: now,
                        pageViews: { [pageName]: 1 }
                    });
                    // Increment uniqueVisitors in analytics
                    await analyticsRef.set({ uniqueVisitors: firebase.firestore.FieldValue.increment(1) }, { merge: true });
                } else {
                    // Existing user: update lastVisit and increment page view
                    const data = userDoc.data();
                    const pageViews = data.pageViews || {};
                    pageViews[pageName] = (pageViews[pageName] || 0) + 1;
                    await usersRef.update({
                        lastVisit: now,
                        pageViews: pageViews
                    });
                }
                // 2. Increment page view count in analytics/page_views
                await pageViewsRef.set({
                    [pageName]: firebase.firestore.FieldValue.increment(1)
                }, { merge: true });
            } catch (err) {
                console.error('Analytics tracking error:', err);
            }
        })();
    })();
});