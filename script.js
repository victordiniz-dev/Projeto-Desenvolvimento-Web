// ================================
// TEMA ESCURO / MODO CLARO
// ================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Alternância de tema
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
        themeToggle.title = 'Alternar para modo claro';
    } else {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
        themeToggle.title = 'Alternar para modo escuro';
    }
}

// ================================
// MENU RESPONSIVO
// ================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ================================
// NAVEGAÇÃO ATIVA
// ================================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`[data-section="${section.id}"]`);
        
        if (navLink) {
            if (rect.top <= 100 && rect.bottom >= 100) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ================================
// FORMULÁRIO DE CONTATO
// ================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            assunto: document.getElementById('subject').value,
            mensagem: document.getElementById('message').value
        };
        
        // Aqui você pode enviar os dados para um servidor
        console.log('Formulário enviado:', formData);
        
        // Feedback ao usuário
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Mensagem enviada!';
        submitBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            contactForm.reset();
        }, 3000);
    });
}

// ================================
// ANIMAÇÃO DE SCROLL
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.resource-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ================================
// SCROLL SUAVE
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
