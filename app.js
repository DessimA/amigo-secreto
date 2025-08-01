let amigos = [];
let amigosSorteados = [];
let jogoIniciado = false;

// Elementos do DOM

let nomeAmigoInput, btnAdd, btnSortear, btnReiniciar, listaAmigosUl, resultadoDiv, statusJogoDiv, notificacaoDiv, btnOcultarResultado;

// Mensagens centralizadas
const MSG = {
    erroNomeVazio: 'Por favor, insira um nome.',
    erroNomeDuplicado: 'Este nome já foi adicionado!',
    erroAddAposSorteio: 'Não é possível adicionar amigos após o início do sorteio!',
    statusInicial: 'Adicione amigos para começar',
    statusTodosSorteados: 'Todos os amigos já foram sorteados! Reinicie o jogo para jogar novamente.',
    statusPronto: n => `${n} amigo(s) adicionado(s). Clique em "Sortear" para começar!`,
    statusRestam: n => `Restam ${n} amigo(s) para sortear`,
    alertaSortear: 'Adicione pelo menos um amigo para sortear.',
    alertaTodosSorteados: 'Todos os amigos já foram sorteados! Reinicie o jogo para jogar novamente.'
};

// Utilitário para atualizar innerHTML
function setHTML(el, html) {
    if (el) el.innerHTML = html;
}

function adicionarAmigo() {
    limparNotificacao();
    if (jogoIniciado) {
        exibirNotificacao(MSG.erroAddAposSorteio);
        return;
    }
    const nome = nomeAmigoInput.value.trim();
    if (nome === '') {
        exibirNotificacao(MSG.erroNomeVazio);
        nomeAmigoInput.focus();
        return;
    }
    const nomeNormalizado = nome.toUpperCase();
    if (amigos.some(amigo => amigo.toUpperCase() === nomeNormalizado)) {
        exibirNotificacao(MSG.erroNomeDuplicado);
        nomeAmigoInput.value = '';
        nomeAmigoInput.focus();
        return;
    }
    amigos.push(nome);
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
    setHTML(listaAmigosUl, '');
    for (let i = 0; i < amigos.length; i++) {
        const amigo = amigos[i];
        const li = document.createElement('li');
        li.className = 'amigo-item';
        const nomeSpan = document.createElement('span');
        nomeSpan.textContent = amigo;
        nomeSpan.className = 'amigo-nome';
        li.appendChild(nomeSpan);
        if (amigosSorteados.includes(amigo)) {
            li.classList.add('sorteado');
            nomeSpan.classList.add('oculto');
            const gif = document.createElement('img');
            gif.src = 'assets/hide-cyberpunk.gif';
            gif.alt = 'Participante sorteado';
            gif.className = 'hide-cyberpunkgif';
            li.appendChild(gif);
        }
        listaAmigosUl.appendChild(li);
    }
}

function sortearAmigo() {
    if (amigos.length < 3) {
        alert('Cadastre pelo menos 3 pessoas para iniciar o sorteio.');
        return;
    }
    if (!jogoIniciado) jogoIniciado = true;
    const amigosDisponiveis = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    if (amigosDisponiveis.length === 0) {
        alert(MSG.alertaTodosSorteados);
        atualizarControles();
        atualizarStatus();
        return;
    }
    // Sorteia apenas um nome por clique
    if (amigosDisponiveis.length > 0) {
        const indiceSorteado = Math.floor(Math.random() * amigosDisponiveis.length);
        const amigoSorteado = amigosDisponiveis[indiceSorteado];
        amigosSorteados.push(amigoSorteado);
        atualizarListaAmigos();
        mostrarResultado(amigoSorteado);
        atualizarControles();
        atualizarStatus();
    }
}

function abrirModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) modal.style.display = 'block';
}

function fecharModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) modal.style.display = 'none';
}

function executarReinicio() {
    amigos = [];
    amigosSorteados = [];
    jogoIniciado = false;
    atualizarListaAmigos();
    mostrarResultado(null);
    atualizarControles();
    atualizarStatus();
    nomeAmigoInput.value = '';
    nomeAmigoInput.focus();
    fecharModal();
}

function reiniciarJogo() {
    if (amigos.length > 0 || amigosSorteados.length > 0) {
        abrirModal();
    } else {
        executarReinicio();
    }
}

function atualizarControles() {
    const amigosDisponiveis = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    const todosForamSorteados = amigos.length > 0 && amigosDisponiveis.length === 0;
    // Utilitário para setar estado de botões
    function setDisabled(btn, cond) {
        if (btn) btn.disabled = !!cond;
    }
    setDisabled(btnAdd, jogoIniciado);
    setDisabled(nomeAmigoInput, jogoIniciado);
    setDisabled(btnSortear, amigos.length < 3 || todosForamSorteados);
    setDisabled(btnReiniciar, amigos.length === 0 && amigosSorteados.length === 0);

    // Aviso mínimo de pessoas
    const avisoMinimo = document.getElementById('avisoMinimo');
    if (avisoMinimo) {
        if (amigos.length < 3) {
            avisoMinimo.textContent = 'Cadastre pelo menos 3 pessoas para iniciar o sorteio.';
            avisoMinimo.style.display = 'block';
        } else {
            avisoMinimo.textContent = '';
            avisoMinimo.style.display = 'none';
        }
    }
}

function mostrarResultado(amigo) {
    if (amigo) {
        setHTML(resultadoDiv, `<p class="result-name">${amigo}</p>`);
        if (btnOcultarResultado) btnOcultarResultado.style.display = 'inline-block';
    } else {
        setHTML(resultadoDiv, '<p class="waiting-message">Aguardando sorteio...</p>');
        if (btnOcultarResultado) btnOcultarResultado.style.display = 'none';
    }
}

function atualizarStatus() {
    if (amigos.length === 0) {
        setHTML(statusJogoDiv, `<p class="status-message">${MSG.statusInicial}</p>`);
    } else if (amigos.length === amigosSorteados.length && amigos.length > 0) {
        setHTML(statusJogoDiv, `<p class="status-message">${MSG.statusTodosSorteados}</p>`);
    } else if (!jogoIniciado) {
        setHTML(statusJogoDiv, `<p class="status-message">${MSG.statusPronto(amigos.length)}</p>`);
    } else {
        setHTML(statusJogoDiv, `<p class="status-message">${MSG.statusRestam(amigos.length - amigosSorteados.length)}</p>`);
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

    // Configurar eventos do modal
    const modal = document.getElementById('confirmModal');
    const btnConfirm = document.getElementById('confirmReiniciar');
    const btnCancel = document.getElementById('cancelReiniciar');

    if (btnConfirm) {
        btnConfirm.addEventListener('click', executarReinicio);
    }
    
    if (btnCancel) {
        btnCancel.addEventListener('click', fecharModal);
    }

    // Fechar modal ao clicar fora dele
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }

    if (btnOcultarResultado) {
        btnOcultarResultado.addEventListener('click', () => {
            resultadoDiv.innerHTML = '<p class="waiting-message">Aguardando sorteio...</p>';
            btnOcultarResultado.style.display = 'none';
        });
    }

    // Notifica se tentar clicar no botão sortear desabilitado
    btnSortear.addEventListener('click', (e) => {
        if (btnSortear.disabled) {
            e.preventDefault();
            return;
        }
        // Garante que apenas um sorteio ocorre por clique
        sortearAmigo();
    });

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