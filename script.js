// ===== NAVEGAÇÃO ENTRE SEÇÕES =====
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu hamburger
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const content = document.querySelector('.content');
    
    // Alternar menu hamburger
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        content.classList.toggle('shifted');
    });
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        this.classList.remove('active');
        content.classList.remove('shifted');
    });
    
    // Navegação entre seções
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            
            // Atualizar links ativos
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar seção correspondente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Fechar menu no mobile
            if (window.innerWidth <= 768) {
                hamburgerMenu.classList.remove('active');
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                content.classList.remove('shifted');
            }
        });
    });
    
    // ===== CALCULADORA FINANCEIRA =====
    const btnCalcular = document.getElementById('btn-calcular');
    const btnLimpar = document.getElementById('btn-limpar');
    const calculatorResult = document.getElementById('calculator-result');
    
    btnCalcular.addEventListener('click', function() {
        // Obter valores dos inputs
        const valorInicial = parseFloat(document.getElementById('valor-inicial').value) || 0;
        const aporteMensal = parseFloat(document.getElementById('aporte-mensal').value) || 0;
        const taxaJuros = parseFloat(document.getElementById('taxa-juros').value) || 0;
        const periodicidade = document.querySelector('input[name="periodicidade"]:checked').value;
        const tempo = parseInt(document.getElementById('tempo').value) || 0;
        
        // Calcular taxa mensal
        let taxaMensal;
        if (periodicidade === 'anual') {
            taxaMensal = Math.pow(1 + taxaJuros/100, 1/12) - 1;
        } else {
            taxaMensal = taxaJuros / 100;
        }
        
        // Calcular valor futuro
        let valorFuturo = valorInicial * Math.pow(1 + taxaMensal, tempo);
        
        for (let i = 1; i <= tempo; i++) {
            valorFuturo += aporteMensal * Math.pow(1 + taxaMensal, tempo - i);
        }
        
        // Calcular outros valores
        const totalInvestido = valorInicial + (aporteMensal * tempo);
        const jurosAcumulados = valorFuturo - totalInvestido;
        const rentabilidade = (jurosAcumulados / totalInvestido) * 100;
        const jurosMensais = jurosAcumulados / tempo;
        
        // Atualizar resultados
        document.getElementById('valor-investido').textContent = formatCurrency(totalInvestido);
        document.getElementById('juros-acumulados').textContent = formatCurrency(jurosAcumulados);
        document.getElementById('valor-final').textContent = formatCurrency(valorFuturo);
        document.getElementById('rentabilidade').textContent = rentabilidade.toFixed(2) + '%';
        document.getElementById('juros-mensais').textContent = formatCurrency(jurosMensais);
        
        // Mostrar resultados
        calculatorResult.style.display = 'block';
    });
    
    btnLimpar.addEventListener('click', function() {
        document.getElementById('valor-inicial').value = '1000';
        document.getElementById('aporte-mensal').value = '100';
        document.getElementById('taxa-juros').value = '0.5';
        document.getElementById('tempo').value = '12';
        document.getElementById('periodicidade-mensal').checked = true;
        
        calculatorResult.style.display = 'none';
    });
    
    // Função para formatar valores em moeda
    function formatCurrency(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    // Simular clique no botão calcular para mostrar resultados iniciais
    btnCalcular.click();
    
    // ===== FORMULÁRIO DE CONTATO =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
});