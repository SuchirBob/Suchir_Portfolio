// ============ Footer year ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ Terminal boot animation ============
const terminalBody = document.getElementById('terminalBody');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const script = [
  { type: 'prompt', text: 'guest@suchir:~$ whoami' },
  { type: 'out',    text: 'Suchir Bobbili — CS undergrad, Cybersecurity & Ethical Hacking' },
  { type: 'prompt', text: 'guest@suchir:~$ cat objective.txt' },
  { type: 'out',    text: 'Securing systems by understanding how they break.' },
  { type: 'prompt', text: 'guest@suchir:~$ nmap -sV --top-ports 4 suchir.dev' },
  { type: 'accent', text: 'PORT      STATE   SERVICE' },
  { type: 'accent', text: '21/tcp    open    vuln-scanner' },
  { type: 'accent', text: '514/tcp   open    soc-log-analyzer' },
  { type: 'accent', text: '4444/tcp  open    reverse-shell-lab' },
  { type: 'accent', text: '80/tcp    open    bruteforce-sim' },
  { type: 'prompt', text: 'guest@suchir:~$ echo "scroll for details"' },
];

function renderStatic() {
  terminalBody.innerHTML = '';
  script.forEach(line => {
    const div = document.createElement('div');
    div.className = line.type === 'prompt' ? 'line-prompt' : line.type === 'accent' ? 'line-accent' : 'line-out';
    div.textContent = line.text;
    terminalBody.appendChild(div);
  });
}

async function typeLine(lineEl, text, speed) {
  for (let i = 0; i < text.length; i++) {
    lineEl.textContent += text[i];
    await new Promise(r => setTimeout(r, speed));
  }
}

async function runBoot() {
  const cursor = document.createElement('span');
  cursor.className = 'term-cursor';

  for (const line of script) {
    const div = document.createElement('div');
    div.className = line.type === 'prompt' ? 'line-prompt' : line.type === 'accent' ? 'line-accent' : 'line-out';
    terminalBody.appendChild(div);
    div.appendChild(cursor);

    const speed = line.type === 'prompt' ? 28 : 10;
    for (let i = 0; i < line.text.length; i++) {
      div.textContent = line.text.slice(0, i + 1);
      div.appendChild(cursor);
      await new Promise(r => setTimeout(r, speed));
    }
    await new Promise(r => setTimeout(r, 120));
  }
  cursor.remove();
  const finalCursor = document.createElement('span');
  finalCursor.className = 'term-cursor';
  terminalBody.appendChild(finalCursor);
}

if (terminalBody) {
  if (prefersReducedMotion) {
    renderStatic();
  } else {
    runBoot();
  }
}

// ============ Active nav link on scroll ============
const sections = document.querySelectorAll('main .section, .hero');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--amber)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(sec => { if (sec.id) observer.observe(sec); });
