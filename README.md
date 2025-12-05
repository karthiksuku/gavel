# Gavel - Australian Legal Intelligence Platform

AI-powered legal research across Australian legislation and caselaw.

## Features

- **Semantic Search** - Search 147K+ legal documents with AI-powered relevance
- **AI Legal Assistant** - Ask questions about Australian law in plain English
- **Jurisdiction Comparison** - Compare laws across Commonwealth and States
- **Document Analysis** - Upload documents for compliance and risk review
- **Compliance Checklists** - Generate industry-specific requirements
- **Plain Language Explainer** - Convert legalese to simple English
- **Legislative Timeline** - View law evolution over time
- **Research Workspaces** - Save and organize research collections
- **Smart Alerts** - Monitor legislation changes

## Coverage

- Commonwealth (Federal)
- New South Wales
- Queensland
- South Australia
- Western Australia
- Tasmania

## Tech Stack

- **Backend**: FastAPI + Python
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Database**: Oracle Autonomous Database
- **AI**: Grok-4 via OCI GenAI Proxy
- **Search**: Vector search + Full-text search

## URLs

- Frontend: https://oci.ai-anz.com/mvp/GAVEL/
- API: https://oci.ai-anz.com/mvp/GAVEL/api/
- Swagger: https://oci.ai-anz.com/mvp/GAVEL/api/docs

## Development

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8200 --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment

```bash
# Backend
PORT=8200 pm2 start "uvicorn app.main:app --host 0.0.0.0 --port 8200" --name gavel-api

# Frontend (build for production)
cd frontend && npm run build
```

## License

MIT License
