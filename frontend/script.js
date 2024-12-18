// Select the form element
/*const form = document.getElementById('contactForm');

// Add event listener to handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Collect form data
  const name = document.getElementById('name').value;
  const rating = document.getElementById('rating').value;
  const review = document.getElementById('review').value;
  const suggession = document.getElementById('suggession').value;

  let errorMessage = '';

  // Name validation (ensure it's not empty)
  if (!name.trim()) {
    errorMessage += 'Please enter your name.<br>';
  }

  // Email validation (checks if '@' is present)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(rating)) {
    errorMessage += 'Please enter a valid email address.<br>';
  }

  // Phone number validation (checks for exactly 10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(review)) {
    errorMessage += 'Phone number must be exactly 10 digits.<br>';
  }

  // Message validation (ensure it's not empty)
  if (!message.trim()) {
    errorMessage += 'Please enter your message.<br>';
  }

  // If there are validation errors, display them and prevent form submission
  if (errorMessage) {
    document.getElementById('error-message').innerHTML = errorMessage;
  } else {
    // Send a POST request to the server if validation passes
    const data = { name, rating, review, suggession };

    fetch('http://localhost:3000/api/rf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Form submitted successfully') {
          alert('Form submitted successfully');
          form.reset(); // Clear the form after successful submission
        } else {
          alert('Failed to submit contact form');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit contact form');
      });
  }
});*/


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form from reloading the page

        // Get form data
        const name = form.querySelector('input[placeholder="Enter your name"]').value;
        const rating = form.querySelector('input[placeholder="Rating(out of 5)"]').value;
        const review = form.querySelector('textarea[placeholder="Review of the Product"]').value;
        const suggession = form.querySelector('textarea[placeholder="Suggestions for Enhancement"]').value;

        try {
            // Send POST request to backend
            const response = await fetch('http://localhost:3000/api/rf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, rating, review, suggession }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                form.reset(); // Reset form after successful submission
            } else {
                alert(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit feedback. Please try again later.');
        }
    });
});
