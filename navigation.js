(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animate = (element) => {
    if (!reduced.matches && window.gsap) gsap.fromTo(element, {opacity: .6, y: 8}, {opacity: 1, y: 0, duration: .28, ease: 'power2.out', clearProps: 'all'});
  };
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    let count = 0;
    document.querySelectorAll('.project').forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    document.querySelector('#project-count').textContent = `${count}개 프로젝트`;
  }));
  document.querySelectorAll('.project').forEach(project => project.addEventListener('toggle', () => {
    if (project.open) animate(project.querySelector('.project-body'));
  }));
  const scenarios = {
    normal: {steps: ['새 멱등키 확인','계좌 순서로 잠금','한 트랜잭션으로 완료'], states: ['active','active','active'], text: '첫 요청은 계좌를 정해진 순서로 잠그고, 잔액과 거래내역을 함께 반영합니다.'},
    retry: {steps: ['같은 멱등키 감지','중복 이체 차단','기존 처리 상태 확인'], states: ['active','skip','active'], text: '같은 멱등키로 다시 요청하면 UNIQUE 제약으로 중복 실행을 막습니다. 잔액을 다시 차감하지 않도록 요청을 구분합니다.'},
    failure: {steps: ['새 요청 처리 시작','처리 중 예외 발생','트랜잭션 전체 롤백'], states: ['active','active','active'], text: '트랜잭션 중 실패하면 잔액과 거래내역을 함께 되돌립니다. 일부만 반영된 상태가 남지 않도록 처리 범위를 묶었습니다.'}
  };
  document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    const scenario = scenarios[button.dataset.scenario];
    document.querySelectorAll('[data-scenario]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelectorAll('[data-step]').forEach((step,i) => {step.querySelector('strong').textContent = scenario.steps[i];step.dataset.state = scenario.states[i];});
    document.querySelector('#scenario-description').textContent = scenario.text;
    animate(document.querySelector('.scenario-flow'));
  }));
  if (document.querySelector('#about') && 'IntersectionObserver' in window) {
    const links = document.querySelectorAll('nav a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if (entry.isIntersecting) links.forEach(a => {if(a.hash === '#' + entry.target.id) a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});
    }, {rootMargin:'-10% 0px -60% 0px',threshold:0});
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
  }
})();
// Keep previously shared section links useful after the page split.
if (location.pathname === '/' && ['#projects','#journey'].includes(location.hash)) {
  location.replace(location.hash === '#projects' ? './projects/' : './activities/');
}
