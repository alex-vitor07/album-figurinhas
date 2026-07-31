from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import glob

app = FastAPI()

PASTA_BASE = os.path.dirname(os.path.abspath(__file__))
PASTA_IMAGENS = os.path.join(PASTA_BASE, "figurinhas")

origins = [
    "http://localhost:5500",        # Live Server do VS Code
    "http://127.0.0.1:5500",      # Live Server (IP)
    "http://localhost:3000",        # Servidores de dev (React/Vite, etc)
    "https://album-figurinhas-psi.vercel.app/"  # URL do seu frontend em produção na Vercel
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # Quem pode acessar
    allow_credentials=True,
    allow_methods=["*"],           # Libera GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],           # Libera envio de cabeçalhos customizados
)

figurinhas = [
    {
        "id": 1,
        "nome": "Shigeru Miyamoto",
        "categoria": "Games",
        "imagem_url": "/figurinhas/1/imagem",
    },
    {
        "id": 2,
        "nome": "Hideo Kojima",
        "categoria": "Games",
        "imagem_url": "/figurinhas/2/imagem",
    },
    {
        "id": 3,
        "nome": "John Carmack",
        "categoria": "Games",
        "imagem_url": "/figurinhas/3/imagem",
    },
    {
        "id": 4,
        "nome": "Gabe Newell",
        "categoria": "Games",
        "imagem_url": "/figurinhas/4/imagem",
    },
    {
        "id": 5,
        "nome": "Sid Meier",
        "categoria": "Games",
        "imagem_url": "/figurinhas/5/imagem",
    },
    {
        "id": 6,
        "nome": "Will Wright",
        "categoria": "Games",
        "imagem_url": "/figurinhas/6/imagem",
    },
    {
        "id": 7,
        "nome": "Yu Suzuki",
        "categoria": "Games",
        "imagem_url": "/figurinhas/7/imagem",
    },
    {
        "id": 8,
        "nome": "Alexey",
        "categoria": "Games",
        "imagem_url": "/figurinhas/8/imagem",
    },
    {
        "id": 9,
        "nome": "Roberta Williams",
        "categoria": "Games",
        "imagem_url": "/figurinhas/9/imagem",
    },
    {
        "id": 10,
        "nome": "Hironobu Sakaguchi",
        "categoria": "Games",
        "imagem_url": "/figurinhas/10/imagem",
    },
    {
        "id": 11,
        "nome": "Todd Howard",
        "categoria": "Games",
        "imagem_url": "/figurinhas/11/imagem",
    },
    {
        "id": 12,
        "nome": "Hidetaka Miyazaki",
        "categoria": "Games",
        "imagem_url": "/figurinhas/12/imagem",
    },
    {
        "id": 13,
        "nome": "Yuji Horii",
        "categoria": "Games",
        "imagem_url": "/figurinhas/13/imagem",
    },
    {
        "id": 14,
        "nome": "Yasumi Matsuno",
        "categoria": "Games",
        "imagem_url": "/figurinhas/14/imagem",
    },
    {
        "id": 15,
        "nome": "David Braben",
        "categoria": "Games",
        "imagem_url": "/figurinhas/15/imagem",
    },
    {
        "id": 16,
        "nome": "Neil Druckmann",
        "categoria": "Games",
        "imagem_url": "/figurinhas/16/imagem",
    },
    {
        "id": 17,
        "nome": "Cory Barlog",
        "categoria": "Games",
        "imagem_url": "/figurinhas/17/imagem",
    },
    {
        "id": 18,
        "nome": "Sam Houser",
        "categoria": "Games",
        "imagem_url": "/figurinhas/18/imagem",
    },
    {
        "id": 19,
        "nome": "Ken Levine",
        "categoria": "Games",
        "imagem_url": "/figurinhas/19/imagem",
    },
    {
        "id": 20,
        "nome": "Tetsuya Nomura",
        "categoria": "Games",
        "imagem_url": "/figurinhas/20/imagem",
    },
    {
        "id": 21,
        "nome": "Eiji Aonuma",
        "categoria": "Games",
        "imagem_url": "/figurinhas/21/imagem",
    },
    {
        "id": 22,
        "nome": "Masahiro Sakurai",
        "categoria": "Games",
        "imagem_url": "/figurinhas/22/imagem",
    },
    {
        "id": 23,
        "nome": "Toru Iwatani",
        "categoria": "Games",
        "imagem_url": "/figurinhas/23/imagem",
    },
    {
        "id": 24,
        "nome": "Ed Boon",
        "categoria": "Games",
        "imagem_url": "/figurinhas/24/imagem",
    },
    {
        "id": 25,
        "nome": "Katsuhiro Harada",
        "categoria": "Games",
        "imagem_url": "/figurinhas/25/imagem",
    },
    {
        "id": 26,
        "nome": "Toby Fox",
        "categoria": "Games",
        "imagem_url": "/figurinhas/26/imagem",
    },
    {
        "id": 27,
        "nome": "Markus Persson",
        "categoria": "Games",
        "imagem_url": "/figurinhas/27/imagem",
    },
    {
        "id": 28,
        "nome": "Eric Barone",
        "categoria": "Games",
        "imagem_url": "/figurinhas/28/imagem",
    },
]


@app.get("/figurinhas")
def get_figurinhas():
    return figurinhas


@app.get("/figurinhas/{id}/imagem")
def get_figurinha_imagem(id: int):
    padrao = os.path.join(PASTA_IMAGENS, f"{id:02d}[!0-9]*")
    arquivos = sorted(glob.glob(padrao))

    if not arquivos:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")

    return FileResponse(arquivos[0])
