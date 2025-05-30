
# 📦 CIS_RAM - Deploy na VPS

## ⚙️ Requisitos

- Docker e docker-compose instalados na VPS
- Acesso SSH com chave privada
- Variáveis de ambiente:

`.env.local`
```
NHOST_SUBDOMAIN=dvxhqwpyyovppqgosulv
NHOST_REGION=eu-central-1
```

## 🚀 Deploy manual

```bash
docker-compose down
docker-compose up -d --build
```

## 🚀 Deploy automático via GitHub Actions

Adicione os segredos no repositório GitHub:

- `SSH_PRIVATE_KEY`
- `VPS_USER` (ex: cybersecsvc)
- `VPS_HOST` (ex: srv834126.hstgr.cloud)
```
