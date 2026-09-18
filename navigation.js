const sections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...document.querySelectorAll('nav a')];
function updateNavigation() {
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 150) current = section;
  }
  for (const link of navLinks) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll', updateNavigation, {passive:true});
window.addEventListener('resize', updateNavigation);
updateNavigation();
