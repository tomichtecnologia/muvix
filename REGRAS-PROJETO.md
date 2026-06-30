# MUVIX — Regras do Projeto

> Arquivo de instruções para o Claude Code. Lido sempre que trabalharmos no Muvix.

## O que é
App fullstack (gerado no Emergent):
- **frontend/** — React 19 + Tailwind + shadcn/ui (CRACO). Landing page de cursos/educação. **Estática** (não chama o backend).
- **backend/** — FastAPI + MongoDB (motor). Hoje só tem o esqueleto (`/api/status`).

## Repositório
- GitHub: https://github.com/tomichtecnologia/muvix
- Pasta local: `C:\Users\danil\OneDrive\Desktop\CLAUDE\muvix`

## Fluxo de trabalho (IMPORTANTE)
A regra combinada com o Danilo:

1. **Toda mudança é feita aqui na pasta local** (Claude edita os arquivos).
2. Quando o Danilo disser **"jogar"**, **"subir"**, **"manda pro github"** ou equivalente,
   o Claude **automaticamente** faz:
   ```
   git add -A
   git commit -m "<descrição da mudança>"
   git push
   ```
   Não precisa perguntar de novo o que fazer — "jogar/subir" = enviar pro GitHub.
3. **Antes de começar a mexer**, sempre `git pull` (pega o que os colaboradores enviaram).
4. As outras pessoas dão `git pull` e recebem as mudanças.

## Deploy
- **Servidor de produção:** `179.48.68.75`
  - SSH porta `22002`, user `tomich` / senha `Tomich.123`
  - root: senha `Tomich@.10` (tomich não tem sudo — usar root pra arquivos de sistema)
- Deploy fica em **pasta nova `muvix`** no servidor — **NÃO** substituir nada que já existe lá.
- Quando o Danilo pedir "fazer deploy" / "subir no servidor", aplicar a mudança mais recente
  do GitHub no servidor 75.

## Rodar local (preview)
- Frontend (basta isso pra ver a cara do site):
  ```
  cd frontend
  npm install --legacy-peer-deps   # yarn não está disponível nesta máquina
  npm start                        # abre em http://localhost:3000
  ```
- `frontend/.env` precisa de `REACT_APP_BACKEND_URL` (criado localmente; está no .gitignore).
- Backend (só quando for usar a API): precisa de MongoDB + `backend/.env`
  (`MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`).

## Arquivos que NÃO vão pro GitHub (.gitignore)
- `.env` (frontend e backend), credenciais, `node_modules/`, builds.
  Esses arquivos têm que ser recriados em cada máquina/servidor.
