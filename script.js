const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    cards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.style.display = show ? 'block' : 'none';
    });
  });
});
