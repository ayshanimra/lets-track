# Let's Track – PR Campaign Tracker

🌐 **Live Demo:** https://lets-track-ten.vercel.app/  
💻 **Source Code:** https://github.com/ayshanimra/lets-track


A full-stack PR campaign management application for managing campaigns, media contacts, and media coverage in one place.

## Features

- Create, update, and delete PR campaigns
- Manage media contacts
- Track media coverage
- Search campaigns, contacts, and coverage
- Track campaign status
- Validate campaign dates and media contact emails
- Dashboard with campaign and media coverage statistics
- Responsive React interface

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Python, FastAPI
- Database: SQLite
- ORM: SQLAlchemy
- API Communication: Axios
- Testing: Pytest
- Development Tools: VS Code, Git

## Project Structure

```text
lets-track/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── test_main.py
│
├── frontend/
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       └── pages/
│           ├── Home.tsx
│           ├── Campaigns.tsx
│           ├── MediaContacts.tsx
│           └── MediaCoverage.tsx
│
└── README.md

## Backend Setup

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload

## Frontend Setup

```bash
cd frontend
npm install
npm run dev

## Testing

Backend tests are written using Pytest.

```bash
cd backend
source venv/bin/activate
pytest

## About

Let's Track was developed as a full-stack portfolio project to demonstrate practical experience with frontend development, backend API development, database management, validation, testing, and responsive UI design.
