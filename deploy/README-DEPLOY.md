# Deploy do Muvix — servidor 75 (Tomicloud / Traefik)

O servidor `179.48.68.75` é um mini-PaaS com **Traefik** como reverse proxy.
O Muvix entra como mais um container (igual devaspect/tomicharte): `nginx:alpine`
servindo o build estático, com labels do Traefik. **SSL (Let's Encrypt) é emitido e
renovado automaticamente pelo Traefik** (certresolver `myresolver`, HTTP-challenge).

## Pré-requisito: DNS
O certificado só é emitido depois que o domínio aponta pro servidor. No Registro.br,
criar registros **A**:

| Tipo | Nome | Valor |
|------|------|-------|
| A | `academiamuvix.com.br` (ou `@`) | `179.48.68.75` |
| A | `www` | `179.48.68.75` |

## Estrutura no servidor
Pasta NOVA (não sobrescreve nada): `~/muvix/` contendo:
- `build/`            → saída do `npm run build` do frontend
- `docker-compose.yml`
- `nginx.conf`

## Subir / atualizar
```bash
cd ~/muvix
docker compose up -d        # sobe o container e registra no Traefik
docker compose logs -f      # acompanhar
```
Traefik detecta as labels e emite o certificado sozinho (1-2 min após o DNS resolver).

## Atualizar o site depois de mudanças
1. Local: `cd frontend && npm run build`
2. Enviar a nova `build/` pro servidor (`~/muvix/build`)
3. No servidor: `cd ~/muvix && docker compose restart muvix-frontend`

> ⚠️ NÃO faça `rm -rf build` e recrie a pasta: isso quebra o bind-mount do Docker
> (o container fica preso ao inode antigo e dá 403). Substitua o CONTEÚDO da pasta
> `build` (extrair por cima) e depois `docker compose restart muvix-frontend` pra
> remontar. Se trocar a pasta inteira, o restart é obrigatório.

## Importante
- NÃO mexer em `/opt/docker/traefik` nem nos outros projetos (~/mercadointimo, ~/otymafarma, etc.).
- A rede `traefik_default` é externa e já existe — não recriar.
- certresolver = `myresolver` | rede = `traefik_default` | porta interna = `80`.
