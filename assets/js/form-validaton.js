/**
 * Form Validation and Submission
 * Handles contact form validation and submission with real-time feedback
 */

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
    const namePattern = /^[A-Za-z\s]{2,50}$/;
    
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
            showFormError('Please fix all errors before submitting.');
            return;
        }
        
        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: document.getElementById('subject')?.value.trim() || '',
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Show loading state
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // In a real application, this would be an API endpoint
            // For demo purposes, we'll simulate a successful submission
            await simulateFormSubmission(formData);
            
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
            showFormError('Failed to send message. Please try again later.');
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
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            if (!emailPattern.test(field.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Name validation
        if (field.id === 'name' && field.value.trim()) {
            if (!namePattern.test(field.value.trim())) {
                isValid = false;
                errorMessage = 'Name must be 2-50 characters and contain only letters';
            }
        }
        
        // Message validation
        if (field.id === 'message' && field.value.trim()) {
            if (field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            
            if (field.value.trim().length > 1000) {
                isValid = false;
                errorMessage = 'Message must be less than 1000 characters';
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
    
    // Simulate form submission (replace with actual API call)
    async function simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                const isSuccess = Math.random() > 0.1; // 90% success rate
                
                if (isSuccess) {
                    // Log to console for demo purposes
                    console.log('Form submitted:', formData);
                    resolve();
                } else {
                    reject(new Error('Simulated server error'));
                }
            }, 1500);
        });
    }
    
    // Add keyboard navigation support
    contactForm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
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