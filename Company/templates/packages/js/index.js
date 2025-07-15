// Firebase JS SDK Initialization (add this at the top of your main JS file)
if (typeof firebase === 'undefined') {
  // Firebase SDK not loaded
  alert('Firebase SDK not loaded! Please include the Firebase JS SDK in your HTML.');
} else if (!firebase.apps || !firebase.apps.length) {
  // Initialize Firebase if not already initialized
  firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  });
}

document.addEventListener('DOMContentLoaded', function() {
    // Removed all main-content and footer display/visibility toggling and preloader logic for instant content display.
    // ... keep only the rest of the code ...

    // --- Visit Counter (Background - No Display) ---
    // async function trackVisit() {
    //     try {
    //         // Check if this is a real page visit (not a bot or refresh)
    //         if (navigator.userAgent.includes('bot') || navigator.userAgent.includes('crawler')) {
    //             return; // Don't count bot visits
    //         }
    //         const visitCounter = new VisitCounter();
    //         await visitCounter.incrementVisit();
    //         // Log success for debugging (only in console)
    //         console.log('Visit tracked successfully');
    //     } catch (error) {
    //         console.error('Error tracking visit:', error);
    //     }
    // }
    // trackVisit();

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
                if (preloader) preloader.style.display = 'none';
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
                // Get reCAPTCHA token (if using)
                const recaptchaToken = grecaptcha.getResponse();
                if (!recaptchaToken) {
                    alert('Please complete the reCAPTCHA.');
                    return;
                }
                // Gather form data
                const name = form.elements['name'] ? form.elements['name'].value : '';
                const email = form.elements['email'] ? form.elements['email'].value : '';
                const message = form.elements['message'] ? form.elements['message'].value : '';
                try {
                    await firebase.firestore().collection('contacts').add({
                        name,
                        email,
                        message,
                        recaptchaToken,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    window.location.href = 'thank-you.html';
                } catch (err) {
                    alert('Submission failed: ' + err.message);
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
        function updateNavbarScrolledClass() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', updateNavbarScrolledClass);
        // Run once on page load to set correct state
        updateNavbarScrolledClass();

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
            const href = this.getAttribute('href');
            // Only scroll if href is not just '#' and is a valid selector
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
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
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5C7.305 4.5 3.135 7.634 1.5 12c1.635 4.366 5.805 7.5 10.5 7.5s8.865-3.134 10.5-7.5C20.865 7.634 16.695 4.5 12 4.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>
                            </button>
                            <button class="btn btn-sm btn-danger delete-submission" data-submission-id="${submission.id}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 6h18v2H3V6zm2 3h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm5 3v7h2v-7h-2zm4 0v7h2v-7h-2zm-8 0v7h2v-7H7z"/></svg>
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 20h14v-2H5v2zm7-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.59V8h-2v8.59l-3.29-3.3-1.42 1.42L12 19.41l5.71-5.7-1.42-1.42-3.29 3.3z"/></svg>Download
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
    // (function() {
    //     // Firebase must be initialized and Firestore available as 'db'
    //     if (typeof firebase === 'undefined' || typeof firebase.firestore !== 'function') return;
    //     if (typeof db === 'undefined') {
    //         if (typeof initializeFirebase === 'function') {
    //             initializeFirebase();
    //         }
    //     }
    //     // Helper: Generate UUID
    //     function generateUUID() {
    //         return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    //             (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    //         );
    //     }
    //     // Get or create UUID for this user
    //     let uuid = localStorage.getItem('site_uuid');
    //     if (!uuid) {
    //         uuid = generateUUID();
    //         localStorage.setItem('site_uuid', uuid);
    //     }
    //     // Get page name (use pathname, e.g. 'index.html' or 'portfolio.html')
    //     const pageName = window.location.pathname.split('/').pop() || 'homepage';
    //     // Firestore refs
    //     const usersRef = db.collection('users').doc(uuid);
    //     const analyticsRef = db.collection('analytics').doc('website_visits');
    //     const pageViewsRef = db.collection('analytics').doc('page_views');
    //     // Track user and page view
    //     (async function() {
    //         try {
    //             // 1. Update user doc
    //             const userDoc = await usersRef.get();
    //             const now = new Date();
    //             if (!userDoc.exists) {
    //                 // New user: create doc and increment uniqueVisitors
    //                 await usersRef.set({
    //                     firstVisit: now,
    //                     lastVisit: now,
    //                     pageViews: { [pageName]: 1 }
    //                 });
    //                 // Increment uniqueVisitors in analytics
    //                 await analyticsRef.set({ uniqueVisitors: firebase.firestore.FieldValue.increment(1) }, { merge: true });
    //             } else {
    //                 // Existing user: update lastVisit and increment page view
    //                 const data = userDoc.data();
    //                 const pageViews = data.pageViews || {};
    //                 pageViews[pageName] = (pageViews[pageName] || 0) + 1;
    //                 await usersRef.update({
    //                     lastVisit: now,
    //                     pageViews: pageViews
    //                 });
    //             }
    //             // 2. Increment page view count in analytics/page_views
    //             await pageViewsRef.set({
    //                 [pageName]: firebase.firestore.FieldValue.increment(1)
    //             }, { merge: true });
    //         } catch (err) {
    //             console.error('Analytics tracking error:', err);
    //         }
    //     })();
    // })();

    // Visitor Entry Modal Logic
    (function() {
        const modal = document.getElementById('visitorModal');
        const form = document.getElementById('visitorModalForm');
        if (!modal || !form) return;

        // Check if visitor info is already stored
        const visitorInfo = localStorage.getItem('visitorInfo');
        if (!visitorInfo) {
            // Show modal and block scroll
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            // Focus first input
            setTimeout(() => {
                form.elements[0].focus();
            }, 100);
        }

        // Prevent closing modal by clicking backdrop or pressing Esc
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') e.preventDefault();
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('visitor-modal__backdrop')) {
                e.stopPropagation();
            }
        });

        // Trap focus inside modal
        form.addEventListener('keydown', function(e) {
            const focusable = form.querySelectorAll('input, button');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.visitorName.value.trim();
            const email = form.visitorEmail.value.trim();
            if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                form.visitorName.classList.toggle('is-invalid', name.length < 2);
                form.visitorEmail.classList.toggle('is-invalid', !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
                return;
            }
            // Store info in localStorage
            localStorage.setItem('visitorInfo', JSON.stringify({ name, email }));

            // Store info in Firestore
            if (window.firebase && firebase.firestore) {
                firebase.firestore().collection('visitors').add({
                    name: name,
                    email: email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(function(error) {
                    console.error('Error saving visitor info:', error);
                });
            }

            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    })();

    // Mobile Sidebar Logic (run only once, after DOM is ready)
    const sidebar = document.getElementById('mobileSidebar');
    const openBtn = document.getElementById('sidebarOpenBtn');
    const closeBtn = document.getElementById('sidebarCloseBtn');
    const overlay = document.getElementById('sidebarOverlay');

    if (sidebar && openBtn && closeBtn && overlay) {
        openBtn.addEventListener('click', function() {
            sidebar.classList.add('open');
            sidebar.removeAttribute('aria-hidden');
            sidebar.removeAttribute('inert');
            document.body.style.overflow = 'hidden';
            overlay.classList.add('active');
            setTimeout(() => {
                const firstLink = sidebar.querySelector('.mobile-sidebar__nav a');
                if (firstLink) firstLink.focus();
            }, 100);
        });

        function closeSidebar() {
            sidebar.classList.remove('open');
            sidebar.setAttribute('inert', '');
            document.body.style.overflow = '';
            overlay.classList.remove('active');
            openBtn.focus();
        }
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);

        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== openBtn && e.target !== overlay) {
                closeSidebar();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }

    // Scroll Down Indicator logic
    const scrollDownIndicator = document.getElementById('scrollDownIndicator');
    if (scrollDownIndicator) {
        scrollDownIndicator.addEventListener('click', function() {
            console.log('Scroll icon clicked'); // Debug log
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Dark/Light Mode Toggle
    const toggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    function setThemeIcon(isDark) {
      if (isDark) {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="10"/><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>';
        themeIcon.setAttribute('stroke', '#ffd600');
      } else {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="10"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>';
        themeIcon.setAttribute('stroke', '#8f5fff');
      }
    }
    function applyTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        setThemeIcon(true);
      } else {
        document.body.classList.remove('dark-mode');
        setThemeIcon(false);
      }
    }
    // On load, set theme from localStorage or system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
    toggle.onclick = () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      setThemeIcon(isDark);
    };

    // Scroll Reveal
    const revealEls = document.querySelectorAll('.reveal');
    window.addEventListener('scroll', () => {
      revealEls.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    });

    // Typing Text Animation
    // const text = "Web Developer | Designer | Creator";
    // let i = 0;
    // function type() {
    //   if (i < text.length) {
    //     document.getElementById('typewriter').textContent += text.charAt(i++);
    //     setTimeout(type, 100);
    //   }
    // }
    // type();

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const update = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / 200;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(update, 10);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    // Animate cursor on click
    window.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    window.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    // Animate cursor on link hover
    const addCursorHover = el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    };
    document.querySelectorAll('a, button, .button, .btn').forEach(addCursorHover);

    // Smooth Scrolling
    // (Already enabled via CSS, but for anchor links with JS:)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
      const parallax = document.querySelector('.parallax-bg');
      if (parallax) {
        parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    });

    // Contact Form Submission (Firebase only, no Netlify)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
          contactForm.classList.add('was-validated');
          return;
        }
        // Get form values
        const name = document.getElementById('name').value.trim();
        const lastName = document.getElementById('last_name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const website = document.getElementById('website').value;
        if (website && website.trim() !== '') {
          // Honeypot spam protection: silently ignore
          return;
        }
        // Show loading (optional)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        try {
          if (window.firebase && firebase.firestore) {
            await firebase.firestore().collection('contacts').add({
              name, lastName, email, phone, subject, message,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert('Thank you! Your message has been sent.');
            contactForm.reset();
          } else {
            alert('Firebase is not initialized.');
          }
        } catch (err) {
          alert('Sorry, there was an error sending your message.');
        }
        if (submitBtn) submitBtn.disabled = false;
      });
    }
    // Main Call-to-Action Button Tracking
    const ctaButtons = document.querySelectorAll('.btn-primary, .button, .cta, .main-cta');
    ctaButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        if (typeof gtag === 'function') {
          gtag('event', 'cta_click', {
            'event_category': 'CTA',
            'event_label': btn.textContent.trim() || btn.id || 'cta'
          });
        }
      });
    });
});