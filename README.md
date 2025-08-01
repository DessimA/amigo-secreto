# 🧬💥 Amigo Secreto - *Cyberpunk Edition* 💥🧬

> Uma experiência futurista para um clássico jogo de fim de ano.

![Cyberpunk](https://img.shields.io/badge/Estilo-Cyberpunk-%23ff0099) ![Status](https://img.shields.io/badge/Status-Online-darkgreen) ![License](https://img.shields.io/badge/Licença-MIT-yellow)

---

## 🧠 Visão Geral

Esta é uma **aplicação web interativa** para realizar sorteios de *Amigo Secreto* com uma estética **Cyberpunk** vibrante. Com ela, é possível adicionar participantes, realizar sorteios de forma aleatória e acompanhar tudo por meio de uma interface imersiva com **efeitos visuais, responsividade e uma experiência temática completa**.

---

## 🚀 Funcionalidades

### ✅ Adição de Participantes

* Campo intuitivo para digitar nomes
* Validação contra entradas vazias e nomes duplicados
* Bloqueio de novas entradas após o início do sorteio

### 📋 Lista Dinâmica

* Atualização em tempo real
* Nomes sorteados recebem marcação visual (riscado + selo “✓ SORTEADO”)

### 🎲 Sorteio Aleatório

* Requer mínimo de 3 participantes para iniciar
* Escolha aleatória entre os não sorteados
* Nome em destaque no painel com animação cyberpunk
* Sistema de ocultação de resultados
* Sem repetições na mesma rodada

### 🧩 Gerenciamento de Estado

* Mensagens dinâmicas e adaptativas:
  * "Adicione mais amigos para começar!" (menos de 3 participantes)
  * "Clique em Sortear para começar!" (3 ou mais participantes)
  * Contagem regressiva de sorteios restantes
* Botões com estados inteligentes (ativado/desativado conforme contexto)
* Sistema de notificações para feedback

### 🔄 Reinício Seguro

* Modal de confirmação antes do reinício
* Limpeza completa do jogo
* Reset de todos os estados e animações
* Pronto para uma nova rodada futurista

---

## 🛠️ Tecnologias Utilizadas

| Linguagem             | Finalidade                                                 |
| --------------------- | ---------------------------------------------------------- |
| **HTML5**             | Estrutura semântica da aplicação                           |
| **CSS3**              | Visual Cyberpunk com responsividade e animações            |
| **JavaScript (ES6+)** | Lógica do sorteio, manipulação do DOM e controle de estado |

---

## 💡 Como Usar

1. **Clone o repositório**

```bash
git clone https://github.com/DessimA/amigo-secreto.git
cd amigo-secreto
```

2. **Abra no navegador**
   Simplesmente abra o arquivo `index.html`. Nenhuma instalação adicional é necessária.

3. **Adicione nomes**
   Digite o nome → Clique em “Adicionar” ou pressione `Enter`.

4. **Inicie o sorteio**
   Clique em “Sortear Amigo” para revelar o próximo nome.

5. **Reinicie quando desejar**
   Clique em “Reiniciar” para começar tudo de novo com uma nova galera!

---

## 🗂️ Estrutura do Projeto

```
.
├── assets/
│   ├── amigo-secreto.png        # Background temático
│   ├── hide-cyberpunk.gif       # Animação para participantes sorteados
│   ├── play-game.png            # Ícone do botão sortear
│   └── reload-game.png          # Ícone do botão reiniciar
├── app.js                       # Lógica principal (JS)
├── index.html                   # Estrutura da página
├── README.md                    # Este arquivo
└── style.css                    # Estilo cyberpunk visual
```

---

## 🧬 Estética Cyberpunk

### 🎨 Paleta de Cores

* Fundo escuro (preto, cinza grafite)
* Acentos neon: **ciano elétrico**, **magenta vibrante**, **amarelo ácido**

### 🅰️ Tipografia

* **Orbitron** (monospace digital): títulos e botões
* **Rajdhani** (sans-serif): corpo do texto, fluidez e legibilidade

### ✨ Efeitos Visuais

* Gradientes e blur com `backdrop-filter`
* Brilhos neon, sombras dinâmicas
* Ícones estilizados futuristas
* Animações suaves nos botões

### 📱 Responsivo

* Compatível com telas pequenas e grandes
* Interface adaptável para uso em dispositivos móveis

### 🌐 Disponível em:
> Vercel: https://amigo-secreto-phi-cyan.vercel.app/

> Github Pages: https://dessima.github.io/amigo-secreto/
---
## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Sinta-se livre para usar, modificar e compartilhar.

