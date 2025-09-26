export function setupProjectModal(onCreateProject) {
  const addBtn = document.querySelector('.add-project-btn');
  const modalOverlay = document.querySelector('.modal-overlay');
  const form = document.querySelector('.project-form');
  const input = document.querySelector('.project-name-input');
  const closeBtn = document.querySelector('.close-modal-btn');

  addBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    input.value = '';
    input.focus();
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      onCreateProject(input.value.trim());
      modalOverlay.style.display = 'none';
      form.reset();
    }
  });
}
