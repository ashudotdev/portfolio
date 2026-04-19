    document.addEventListener("DOMContentLoaded", () => {
      const descriptions = document.querySelectorAll('.project-item p');

      descriptions.forEach(p => {
        const btn = p.querySelector('.read-more-btn');
        if (!btn) return;

        p.removeChild(btn);
        const fullText = p.textContent.trim();

        // Use the first sentence as the compact text for a clean layout
        let breakPoint = fullText.indexOf('.');
        if (breakPoint === -1 || breakPoint > 180) {
          breakPoint = 120;
        }

        const shortText = fullText.substring(0, breakPoint + 1);

        // Render the compact vs full elements correctly
        const textSpan = document.createElement('span');
        textSpan.textContent = shortText + '... ';

        p.textContent = '';
        p.appendChild(textSpan);
        p.appendChild(btn);

        let isExpanded = false;

        btn.addEventListener('click', () => {
          isExpanded = !isExpanded;
          if (isExpanded) {
            textSpan.textContent = fullText + ' ';
            btn.textContent = 'Read Less';
          } else {
            textSpan.textContent = shortText + '... ';
            btn.textContent = 'Read More';
          }
        });
      });
    });
