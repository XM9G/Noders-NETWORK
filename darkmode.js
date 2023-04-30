const themeToggle = document.querySelector('#theme-toggle');
const body = document.querySelector('body');

themeToggle.addEventListener('click', function() {
  body.classList.toggle('light-mode');
  setTimeout(() => {
    body.classList.toggle('fade');
  }, 100);
});
