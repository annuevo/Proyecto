document.querySelectorAll('.icon-item').forEach((item) => {
    const img = item.querySelector('img');
    const h4 = item.querySelector('h4');
    const p = item.querySelector('p');
  
    // Guardamos los textos originales
    const originalTextH4 = h4.textContent;
    const originalTextP = p.textContent;
  
    // Eventos para el mouse
    item.addEventListener('mouseover', () => {
      // Cambiar la imagen al hover
      const hoverSrc = img.getAttribute('data-hover-src');
      if (hoverSrc) img.src = hoverSrc;
  
      // Cambiar el texto
      const hoverTextH4 = h4.getAttribute('data-hover-text');
      const hoverTextP = p.getAttribute('data-hover-text');
      if (hoverTextH4) h4.textContent = hoverTextH4;
      if (hoverTextP) p.textContent = hoverTextP;
    });
  
    item.addEventListener('mouseout', () => {
      // Restaurar la imagen original
      const originalSrc = img.getAttribute('data-original-src');
      if (originalSrc) img.src = originalSrc;
  
      // Restaurar el texto original
      h4.textContent = originalTextH4;
      p.textContent = originalTextP;
    });
  });
  