
//usar el evento submit para detecatr que el elemento ha sido enviado

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
  
    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = 'Ingrese un correo válido.';
      return;
    }
  
    // Password validation
    if (password.length < 6) {
      passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
  
    alert('Formulario enviado correctamente.');
  });
  
  // Show/hide password
  document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
  });
  