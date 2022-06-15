document.addEventListener('DOMContentLoaded', () => {
    (() => {
        "use strict";

        const isElement = (element) => {
            if (Array.isArray(element)) {
                return element.every(isElement);
            }

            try {
                return (element.constructor.__proto__.prototype.constructor.name) ? true : false;
            } catch (error) {
                return false;
            }
        }

        const select = (selector, selectAll = false) => {
            try {
                selector = selector.trim()
                if (selectAll) {
                    return [...document.querySelectorAll(selector)];
                }
                return document.querySelector(selector);
            } catch (error) { }

            if (isElement(selector)) {
                return selector;
            }

            return null;
        }

        const on = (type, selector, listener, selectAll = false) => {
            const element = select(selector, selectAll);
            if (element) {
                if (selectAll) {
                    element.forEach(e => e.addEventListener(type, listener))
                } else {
                    element.addEventListener(type, listener)
                }
            }

        }

        const navbarlinks = select('#navbar .scrollto', true)
        const navbarlinksActive = () => {
            const position = window.scrollY + 200
            navbarlinks.forEach(navbarlink => {
                if (!navbarlink.hash) return
                const section = select(navbarlink.hash)
                if (!section) return
                if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                    navbarlink.classList.add('active')
                } else {
                    navbarlink.classList.remove('active')
                }
            })
        }
        window.addEventListener('load', navbarlinksActive)
        on('scroll', document, navbarlinksActive)

        const scrollto = (element) => {
            const header = select('#header');
            let offset = header.offsetHeight;

            if (!header.classList.contains('header-scrolled')) {
                offset -= 20
            }

            const elementPos = select(element).offsetTop;
            window.scrollTo({
                top: elementPos - offset,
                behavior: 'smooth'
            });
        }

        const selectHeader = select('#header')
        if (selectHeader) {
            const headerScrolled = () => {
                if (window.scrollY > 100) {
                    selectHeader.classList.add('header-scrolled')
                } else {
                    selectHeader.classList.remove('header-scrolled')
                }
            }
            window.addEventListener('load', headerScrolled)
            on('scroll', document, headerScrolled)
        }

        const backtotop = select('.back-to-top')
        if (backtotop) {
            const toggleBacktotop = () => {
                if (window.scrollY > 100) {
                    backtotop.classList.add('active')
                } else {
                    backtotop.classList.remove('active')
                }
            }
            window.addEventListener('load', toggleBacktotop)
            on('scroll', document, toggleBacktotop)
        }

        on('click', '.mobile-nav-toggle', function () {
            select('#navbar').classList.toggle('navbar-mobile')
            this.classList.toggle('bi-list')
            this.classList.toggle('bi-x')
        })

        on('click', '.navbar .dropdown > a', event => {
            if (select('#navbar').classList.contains('navbar-mobile')) {
                event.preventDefault()
                this.nextElementSibling.classList.toggle('dropdown-active')
            }
        }, true)

        on('click', '.scrollto', event => {
            if (select(this.hash)) {
                event.preventDefault()

                const navbar = select('#navbar')
                if (navbar.classList.contains('navbar-mobile')) {
                    navbar.classList.remove('navbar-mobile')
                    const navbarToggle = select('.mobile-nav-toggle')
                    navbarToggle.classList.toggle('bi-list')
                    navbarToggle.classList.toggle('bi-x')
                }
                scrollto(this.hash)
            }
        }, true)

        window.addEventListener('load', () => {
            if (window.location.hash) {
                if (select(window.location.hash)) {
                    scrollto(window.location.hash)
                }
            }
        });

        const skilsContent = select('.skills-content');
        if (skilsContent) {
            new Waypoint({
                element: skilsContent,
                offset: '80%',
                handler: (direction) => {
                    const progress = select('.progress .progress-bar', true);
                    progress.forEach((el) => {
                        el.style.width = el.getAttribute('aria-valuenow') + '%'
                    });
                }
            })
        }

        new Swiper('.testimonials-slider', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                type: 'bulconsts',
                clickable: true
            }
        });

        window.addEventListener('load', () => {
            const portfolioContainer = select('.portfolio-container');
            if (portfolioContainer) {
                const portfolioIsotope = new Isotope(portfolioContainer, {
                    itemSelector: '.portfolio-item'
                });

                const portfolioFilters = select('#portfolio-filters li', true);

                on('click', '#portfolio-filters li', function(event) {
                    event.preventDefault();
                    portfolioFilters.forEach(element => {
                        element.classList.remove('filter-active');
                    });
                    this.classList.add('filter-active');

                    portfolioIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });

                }, true);
            }

        });

        new Swiper('.portfolio-details-slider', {
            speed: 400,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bulconsts',
                clickable: true
            }
        });
    })()
});
