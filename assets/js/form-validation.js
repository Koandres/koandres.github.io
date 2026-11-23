/**
 * Form Validation and Submission
 * Handles contact form validation and submission with real-time feedback
 */

// Isi dengan endpoint Formspree, mis. 'https://formspree.io/f/xxxxxxxx'.
// Jika kosong, form membuka aplikasi email (mailto) sebagai gantinya.
const FORM_ENDPOINT = '';

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('.form__submit');
    const successMessage = document.getElementById('form-success');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[\p{L}\s.'-]{2,50}$/u;
    
    // Real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
        
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageInput);
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showFormError(t('form.fix'));
            return;
        }
        
        // Tanpa endpoint: buka aplikasi email, jangan tampilkan "berhasil terkirim"
        if (!FORM_ENDPOINT) {
            const subject = document.getElementById('subject').value.trim() || t('form.mailSubject');
            const body = `${messageInput.value.trim()}\n\n${nameInput.value.trim()} (${emailInput.value.trim()})`;
            window.location.href = `mailto:koaan16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            return;
        }
        
        // Show loading state
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = t('form.sending');
        submitButton.disabled = true;
        
        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(contactForm)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            // Show success message
            successMessage.style.display = 'block';
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            showFormError(t('form.fail'));
            console.error('Form submission error:', error);
            
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
    
    // Field validation function
    function validateField(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        // Required field validation
        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = t('form.required');
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            if (!emailPattern.test(field.value.trim())) {
                isValid = false;
                errorMessage = t('form.emailInvalid');
            }
        }
        
        // Name validation
        if (field.id === 'name' && field.value.trim()) {
            if (!namePattern.test(field.value.trim())) {
                isValid = false;
                errorMessage = t('form.nameInvalid');
            }
        }
        
        // Message validation
        if (field.id === 'message' && field.value.trim()) {
            if (field.value.trim().length < 10) {
                isValid = false;
                errorMessage = t('form.msgShort');
            }
            
            if (field.value.trim().length > 1000) {
                isValid = false;
                errorMessage = t('form.msgLong');
            }
        }
        
        // Update UI based on validation
        if (!isValid && errorElement) {
            errorElement.textContent = errorMessage;
            field.classList.add('invalid');
            field.classList.remove('valid');
        } else if (field.value.trim() && errorElement) {
            field.classList.remove('invalid');
            field.classList.add('valid');
        } else {
            field.classList.remove('invalid', 'valid');
        }
        
        return isValid;
    }
    
    // Show form-level error
    function showFormError(message) {
        // Create or update error container
        let errorContainer = contactForm.querySelector('.form__error--global');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'form__error form__error--global';
            contactForm.insertBefore(errorContainer, submitButton);
        }
        
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 5000);
        
        // Scroll to error
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Add keyboard navigation support
    contactForm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            e.preventDefault();
            
            // Find next focusable element
            const focusableElements = contactForm.querySelectorAll(
                'input, textarea, button'
            );
            const currentIndex = Array.from(focusableElements).indexOf(e.target);
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            
            if (focusableElements[nextIndex]) {
                focusableElements[nextIndex].focus();
            }
        }
    });
}