// Script para o site de Letícia Moura - Terapias Integrativas

document.addEventListener('DOMContentLoaded', () => {
    // Função de debounce para melhorar desempenho no scroll
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Animações no scroll
    const scrollElements = document.querySelectorAll('.expertise-card, .therapy-card, .education-item, .differential-item, .contact-item, .about-image, .about-content');
    
    scrollElements.forEach((el, index) => {
        el.classList.add('js-scroll');
        
        // Alternar entre diferentes tipos de animação
        if (index % 3 === 0) {
            el.classList.add('fade-in');
        } else if (index % 3 === 1) {
            el.classList.add('fade-in-bottom');
        } else if (index % 3 === 2) {
            if (index % 2 === 0) {
                el.classList.add('fade-in-left');
            } else {
                el.classList.add('fade-in-right');
            }
        }
    });

    // Função para verificar a posição dos elementos no scroll
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = debounce(() => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    }, 15);

    // Inicializar animações
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // Menu de navegação fixo com efeito de scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(243, 197, 197, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'var(--rosa-claro)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        });
    } else {
        console.warn('Elemento header ou heroSection não encontrado.');
    }

    // Botão de voltar ao topo
    const handleBackToTopButton = () => {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            });
        } else {
            console.warn('Botão de voltar ao topo não encontrado.');
        }
    };
    
    handleBackToTopButton();

    // Navegação suave para links internos
    const smoothScroll = () => {
        const navLinks = document.querySelectorAll('.nav-links a, .btn[href^="#"], .back-to-top');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    smoothScroll();

    // Efeitos nos cards
    const cards = document.querySelectorAll('.expertise-card, .therapy-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
        });
    });

    // Menu móvel responsivo
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navbar || !navLinks) {
            console.warn('Elementos navbar ou nav-links não encontrados.');
            return;
        }

        let menuButton = navbar.querySelector('.mobile-menu-btn');
        if (!menuButton) {
            console.warn('Botão de menu móvel não encontrado.');
            return;
        }
        
        const toggleMenuDisplay = () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                menuButton.style.display = 'block';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                menuButton.style.display = 'none';
            }
        };
        
        toggleMenuDisplay();
        
        menuButton.addEventListener('click', () => {
            if (navLinks.style.display === 'none' || navLinks.style.display === '') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                menuButton.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                navLinks.style.display = 'none';
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        window.addEventListener('resize', toggleMenuDisplay);
    };
    
    createMobileMenu();

    // Adicionar pré-carregamento para imagens
    const preloadImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    };
    
    preloadImages();
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;

        // Fecha todos os outros abertos
        document.querySelectorAll('.faq-item').forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });

        // Alterna a atual
        item.classList.toggle('active');
    });
});