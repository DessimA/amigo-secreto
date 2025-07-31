let amigos = [];
let amigosSorteados = [];
let jogoIniciado = false;

// Elementos do DOM
let nomeAmigoInput, btnAdd, btnSortear, btnReiniciar, listaAmigosUl, resultadoDiv, statusJogoDiv, notificacaoDiv, btnOcultarResultado;

function adicionarAmigo() {
    limparNotificacao();
    if (jogoIniciado) {
        exibirNotificacao('Não é possível adicionar amigos após o início do sorteio!');
        return;
    }
    const nome = nomeAmigoInput.value.trim();
    if (nome === '') {
        exibirNotificacao('Por favor, insira um nome válido.');
        nomeAmigoInput.focus();
        return;
    }
    // Verificação robusta com normalização (case-insensitive)
    const nomeNormalizado = nome.toUpperCase();
    if (amigos.some(amigo => amigo.toUpperCase() === nomeNormalizado)) {
        exibirNotificacao('Este nome já foi adicionado!');
        nomeAmigoInput.value = '';
        nomeAmigoInput.focus();
        return;
    }
    amigos.push(nome); // Armazena a versão original
    nomeAmigoInput.value = '';
    atualizarListaAmigos();
    atualizarControles();
    atualizarStatus();
    nomeAmigoInput.focus();
    limparNotificacao();
}
function exibirNotificacao(msg) {
    if (notificacaoDiv) {
        notificacaoDiv.textContent = msg;
        notificacaoDiv.style.display = 'block';
    }
}

function limparNotificacao() {
    if (notificacaoDiv) {
        notificacaoDiv.textContent = '';
        notificacaoDiv.style.display = 'none';
    }
}

function atualizarListaAmigos() {
    listaAmigosUl.innerHTML = '';
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        if (amigosSorteados.includes(amigo)) {
            li.classList.add('sorteado');
        }
        listaAmigosUl.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert('Adicione pelo menos um amigo para sortear.');
        return;
    }
    
    // Marcar que o jogo iniciou no primeiro sorteio
    if (!jogoIniciado) {
        jogoIniciado = true;
    }
    
    const amigosDisponiveis = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    
    if (amigosDisponiveis.length === 0) {
        alert('Todos os amigos já foram sorteados! Reinicie o jogo para jogar novamente.');
        atualizarControles();
        atualizarStatus();
        return;
    }
    
    const indiceSorteado = Math.floor(Math.random() * amigosDisponiveis.length);
    const amigoSorteado = amigosDisponiveis[indiceSorteado];
    amigosSorteados.push(amigoSorteado);
    
    atualizarListaAmigos();
    mostrarResultado(amigoSorteado);
    atualizarControles();
    atualizarStatus();
}

function reiniciarJogo() {
    if (amigos.length > 0 || amigosSorteados.length > 0) {
        const confirmar = confirm('Tem certeza que deseja reiniciar o jogo?');
        if (!confirmar) return;
    }
    
    amigos = [];
    amigosSorteados = [];
    jogoIniciado = false; // Resetar o estado do jogo
    
    atualizarListaAmigos();
    mostrarResultado(null);
    atualizarControles();
    atualizarStatus();
    
    nomeAmigoInput.value = '';
    nomeAmigoInput.focus();
}

function atualizarControles() {
    const amigosDisponiveis = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    const todosForamSorteados = amigos.length > 0 && amigosDisponiveis.length === 0;
    
    // Botão Adicionar: desabilitado se o jogo iniciou
    btnAdd.disabled = jogoIniciado;
    nomeAmigoInput.disabled = jogoIniciado;
    
    // Botão Sortear: desabilitado se não há amigos ou todos já foram sorteados
    btnSortear.disabled = amigos.length === 0 || todosForamSorteados;
    
    // Botão Reiniciar: sempre habilitado se há algum conteúdo
    btnReiniciar.disabled = amigos.length === 0 && amigosSorteados.length === 0;
}

function mostrarResultado(amigo) {
    if (amigo) {
        resultadoDiv.innerHTML = `<p class="result-name">${amigo}</p>`;
        if (btnOcultarResultado) {
            btnOcultarResultado.style.display = 'inline-block';
        }
    } else {
        resultadoDiv.innerHTML = '<p class="waiting-message">Aguardando sorteio...</p>';
        if (btnOcultarResultado) {
            btnOcultarResultado.style.display = 'none';
        }
    }
}

function atualizarStatus() {
    if (amigos.length === 0) {
        statusJogoDiv.innerHTML = '<p class="status-message">Adicione amigos para começar</p>';
    } else if (amigos.length === amigosSorteados.length && amigos.length > 0) {
        statusJogoDiv.innerHTML = '<p class="status-message">Todos os amigos já foram sorteados! Reinicie o jogo para jogar novamente.</p>';
    } else if (!jogoIniciado) {
        statusJogoDiv.innerHTML = `<p class="status-message">${amigos.length} amigo(s) adicionado(s). Clique em "Sortear" para começar!</p>`;
    } else {
        statusJogoDiv.innerHTML = `<p class="status-message">Restam ${amigos.length - amigosSorteados.length} amigo(s) para sortear</p>`;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar elementos do DOM
    nomeAmigoInput = document.getElementById('nomeAmigo');
    btnAdd = document.getElementById('btnAdicionar');
    btnSortear = document.getElementById('btnSortear');
    btnReiniciar = document.getElementById('btnReiniciar');
    listaAmigosUl = document.getElementById('listaAmigos');
    resultadoDiv = document.getElementById('resultado');
    statusJogoDiv = document.getElementById('statusJogo');
    notificacaoDiv = document.getElementById('notificacao');
    btnOcultarResultado = document.getElementById('btnOcultarResultado');

    if (btnOcultarResultado) {
        btnOcultarResultado.addEventListener('click', () => {
            resultadoDiv.innerHTML = '<p class="waiting-message">Aguardando sorteio...</p>';
            btnOcultarResultado.style.display = 'none';
        });
    }

    nomeAmigoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            adicionarAmigo();
        } else {
            limparNotificacao();
        }
    });
    nomeAmigoInput.addEventListener('input', limparNotificacao);

    atualizarListaAmigos();
    mostrarResultado(null);
    atualizarControles();
    atualizarStatus();
    nomeAmigoInput.focus();
});