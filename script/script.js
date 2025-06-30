// script/script.js

document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para todos los links del navbar
  const links = document.querySelectorAll('nav a.nav-link');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Validación del formulario de contacto
  const form = document.getElementById('formulario-contacto');
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Inputs
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    // Validaciones simples
    if (nombre === '') {
      alert('Por favor, ingresa tu nombre.');
      form.nombre.focus();
      return;
    }

    if (!validateEmail(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      form.email.focus();
      return;
    }

    if (mensaje === '') {
      alert('Por favor, escribe un mensaje.');
      form.mensaje.focus();
      return;
    }

    // Simular apertura de correo (enviar mailto)
    const mailtoLink = `mailto:contacto@clinicaveterinaria.com?subject=Consulta de ${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje + '\n\nCorreo: ' + email)}`;
    window.location.href = mailtoLink;

    // Mostrar modal de confirmación
    const modal = new bootstrap.Modal(document.getElementById('modalCorreo'));
    modal.show();

    // Opcional: Resetear formulario después de enviar
    form.reset();
  });
});

// Función para validar email con regex simple
function validateEmail(email) {
  // Regex básico para validar email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
