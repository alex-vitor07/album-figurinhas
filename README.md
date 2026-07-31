# 🎨 Stickers API & Web Application

Aplicação Full-Stack desenvolvida para listagem e exibição de figurinhas de grandes nomes da indústria de jogos.

## 🔗 Links de Produção (Live Demo)

- 🌐 **Aplicação Web (Frontend):** [https://album-figurinhas-psi.vercel.app/]
- ⚡ **API Rest (Backend):** [https://meu-projeto-api-w5z9.onrender.com/figurinhas](https://meu-projeto-api-w5z9.onrender.com/figurinhas)
- 📖 **Documentação Interativa (Swagger):** [https://meu-projeto-api-w5z9.onrender.com/docs](https://meu-projeto-api-w5z9.onrender.com/docs)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.10+**
- **FastAPI** (Framework web assíncrono de alta performance)
- **Uvicorn** (Servidor ASGI)
- **Pathlib / Glob** (Manipulação eficiente de arquivos no sistema)

### Frontend
- **HTML5 & CSS3**
- **JavaScript (ES6+)** via Native Fetch API

### Infraestrutura & DevOps
- **Render** (Hospedagem do Web Service da API)
- **Vercel** (Hospedagem do Frontend Estático)
- **Git & GitHub** (Versionamento e CI/CD automatizado)

---

## 📐 Estrutura do Monorepo

```text
meu-projeto/
├── .gitignore
├── README.md
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── figurinhas/
└── frontend/
    ├── index.html
    ├── style.css
    └── app.js