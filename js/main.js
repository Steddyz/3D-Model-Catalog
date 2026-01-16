document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const cardsPerPage = 6;
    const totalPages = Math.ceil(allModelData.length / cardsPerPage);
    const scenes = {};
    
    const burgerMenu = document.getElementById('burger-menu');
    const navMobile = document.getElementById('nav-mobile');
    
    burgerMenu.addEventListener('click', function() {
        navMobile.classList.toggle('active');
    });
    
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
        });
    });
    
    function updatePageInfo() {
        document.getElementById('current-page').textContent = `Страница ${currentPage} из ${totalPages}`;
        document.getElementById('current-page-bottom').textContent = `Страница ${currentPage} из ${totalPages}`;
    }
    
    function displayCurrentPage() {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, allModelData.length);
        const currentModels = allModelData.slice(startIndex, endIndex);
        
        Object.keys(scenes).forEach(key => {
            if (scenes[key] && scenes[key].dispose) {
                scenes[key].dispose();
            }
        });
        
        Object.keys(scenes).forEach(key => delete scenes[key]);
        
        currentModels.forEach(model => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.id = model.id;
            
            card.innerHTML = `
                <div class="card-3d-container" id="card-3d-${model.id}"></div>
                <div class="card-info">
                    <div class="card-title">${model.title}</div>
                    <div class="card-category">${model.category}</div>
                    <div class="card-description">${model.description}</div>
                </div>
                <button class="close-btn">×</button>
            `;
            
            cardsContainer.appendChild(card);
            
            setTimeout(() => {
                try {
                    scenes[model.id] = createThreeDScene(`card-3d-${model.id}`, model);
                } catch (error) {
                    console.error(`Ошибка создания сцены для модели ${model.id}:`, error);
                    const container = document.getElementById(`card-3d-${model.id}`);
                    if (container) {
                        container.innerHTML = '<div class="loading-indicator" style="color: #2C1810;">3D модель загружена</div>';
                    }
                }
            }, 400 * (model.id % cardsPerPage));
            
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('close-btn')) {
                    expandCard(this, model.id);
                }
            });
            
            const closeBtn = card.querySelector('.close-btn');
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                collapseCard(card, model.id);
            });
        });
        
        updatePageInfo();
    }
    
    function expandCard(card, modelId) {
        const overlay = document.getElementById('overlay');
        const allCards = document.querySelectorAll('.card');
        
        allCards.forEach(c => {
            if (c !== card) c.style.opacity = '0';
        });
        
        overlay.classList.add('active');
        card.classList.add('expanded');
        
        if (scenes[modelId]) {
            setTimeout(() => {
                scenes[modelId].resize();
                scenes[modelId].center();
            }, 10);
        }
        
        document.body.style.overflow = 'hidden';
    }
    
    function collapseCard(card, modelId) {
        const overlay = document.getElementById('overlay');
        const allCards = document.querySelectorAll('.card');
        
        allCards.forEach(c => {
            c.style.opacity = '1';
        });
        
        overlay.classList.remove('active');
        card.classList.remove('expanded');
        
        if (scenes[modelId]) {
            setTimeout(() => {
                scenes[modelId].resize();
            }, 10);
        }
        
        document.body.style.overflow = 'auto';
    }
    
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function() {
        const expandedCard = document.querySelector('.card.expanded');
        if (expandedCard) {
            const modelId = expandedCard.dataset.id;
            collapseCard(expandedCard, modelId);
        }
    });
    
    function goToPrevPage() {
        currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
        displayCurrentPage();
    }
    
    function goToNextPage() {
        currentPage = currentPage < totalPages ? currentPage + 1 : 1;
        displayCurrentPage();
    }
    
    document.getElementById('prev-btn').addEventListener('click', goToPrevPage);
    document.getElementById('next-btn').addEventListener('click', goToNextPage);
    
    document.getElementById('prev-btn2').addEventListener('click', goToPrevPage);
    document.getElementById('next-btn2').addEventListener('click', goToNextPage);
    
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
    
    function handleResponsive() {
        const bottomScroll = document.getElementById('bottom-scroll');
        
        if (window.innerWidth <= 768) {
            bottomScroll.style.display = 'none';
        } else {
            bottomScroll.style.display = 'flex';
        }
    }
    
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    displayCurrentPage();
});