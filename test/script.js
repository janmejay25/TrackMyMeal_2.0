// 
// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
  
    // Show modal when login button clicked
    loginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
    });
  
    // Hide modal when close button clicked
    closeLogin.addEventListener('click', () => {
      loginModal.classList.add('hidden');
    });
  
    // Hide modal when clicking outside modal content
    window.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.add('hidden');
      }
    });
  });
  