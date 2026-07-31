# Alura Album - Copa do Mundo Tech 🚀

Um álbum interativo que celebra os gigantes da tecnologia, apresentando um design imersivo com simulação de flip book (livro de páginas que viram).

## Objetivo

Criar uma experiência visual envolvente que homenageia pioneiros e inovadores da tecnologia através de um álbum digital interativo com páginas que viram, similar a um álbum físico de figurinhas da Copa do Mundo.

## Estrutura do Projeto

### 📄 `index.html`
**Funcionalidades principais:**
- Define a estrutura base do álbum interativo
- Contém a página de capa com título "ALURA ALBUM"
- Implementa slots para figurinhas (stickers) das figuras tecnológicas
- Define botões de navegação (setas anterior/próxima)
- Botão de controle de som (ativar/desativar)
- Páginas temáticas sobre diferentes áreas da tecnologia:
  - IA (Inteligência Artificial)
  - E outras categorias tech
- Utiliza FontAwesome/SVG para ícones
- Linguagem: Português (pt-BR)

### 🎨 `style.css`
**Funcionalidades principais:**
- Define o design visual com tema futurista e minimalista
- **Paleta de cores:**
  - Azuis degradados (Blue Universe, Deep Blue, Tech Blue, Dev Blue)
  - Preto e branco para contraste
- **Componentes estilizados:**
  - Botão de som com efeito hover
  - Botões de navegação lateral com animações
  - Layout responsivo do álbum (min/max widths)
  - Efeitos de sombra e animações suaves
- **Responsividade:**
  - Adaptação para diferentes tamanhos de tela
  - Mobile scroll support
- **Animações:**
  - Transições suaves com cubic-bezier
  - Efeito de escala (scale) no hover
  - Glitch effect no título

### ⚙️ `app.js`
**Funcionalidades principais:**
- **Inicialização do PageFlip:**
  - Configura a biblioteca St.PageFlip para simular viração de páginas
  - Define dimensões base (550x800px) com responsividade
  - Tempo de transição: 800ms para fluidez
  
- **Controle de Navegação:**
  - Botão anterior (btn-prev) e próximo (btn-next)
  - Gerencia viração de páginas do livro
  
- **Controle de Som:**
  - Toggle (ativar/desativar som)
  - Alterna ícones visuais (alto/mudo)
  
- **Integração com API:**
  - Função `preencherFigurinhas()` que busca dados da API (http://localhost:8000/figurinhas)
  - Carrega imagens das figurinhas dinamicamente
  - Trata erros de conexão com mensagens úteis
  - Suporta lookup rápido de figurinhas por ID
  
- **Funcionalidades de Arrastar:**
  - Gerencia eventos de mouse para interatividade
  - Controla estado de arraste de páginas

## Como Funciona

1. **Carregamento:** O HTML define a estrutura, o CSS estiliza e o JavaScript adiciona interatividade
2. **Visualização:** O usuário acessa uma experiência tipo flip book para navegação
3. **Interatividade:** 
   - Clica nas setas para virar páginas
   - Controla áudio com o botão de som
   - Visualiza figurinhas das personalidades tech
4. **Backend Integration:** Conecta-se a uma API para carregar dados das figurinhas

## Requisitos

- Navegador moderno com suporte a:
  - ES6 JavaScript
  - CSS Grid/Flexbox
  - SVG
  - Fetch API
- Servidor Backend FastAPI (opcional, para funcionalidade completa)

## Como Usar

1. Abra `index.html` em um navegador
2. Use os botões de navegação para virar páginas
3. Controle o som com o botão no canto superior direito
4. (Opcional) Inicie o servidor backend para carregar as figurinhas da API

---

**Desenvolvido com ❤️ para a Imersão Alura - Julho 2026**
