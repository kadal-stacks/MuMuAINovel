# MuMuAINovel 📚✨

<div align="center">

![Version](https://img.shields.io/badge/version-1.10.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue.svg)
![License](https://img.shields.io/badge/license-GPL%20v3-blue.svg)
![API](https://img.shields.io/badge/API%20Endpoints-200+-orange.svg)

**🚀 AI-Powered Intelligent Novel Writing Assistant**

[English](#-features) • [简体中文](README.md) • [Demo](#-screenshots) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation)

---

**⭐ If this project helps you, please give it a Star!**

</div>

---

## 🎯 Highlights

| Feature | Description |
|---------|-------------|
| 🤖 **Multi-AI Support** | Seamless switching between OpenAI / Gemini / Claude |
| 📖 **Smart Chapter Generation** | RTCO framework with dynamic context, automatic plot continuation |
| 🎭 **Character Management** | Relationship graphs, organization charts, growth tracking |
| 🔮 **Foreshadowing System** | Smart tracking of plot foreshadows, auto-injection during AI generation |
| 📊 **Quality Scoring** | Basic metrics + AI evaluation, S/A/B/C/D grading |
| 🔍 **Consistency Detection** | AI analysis of character behavior and plot coherence |
| ⏱️ **Timeline Management** | Story event timeline tracking with visualization |
| 🎨 **Style Analysis** | Learn writing style, generate style guides for AI reference |
| 🔄 **Duplicate Detection** | Detect repetitive content within and across chapters |
| 💾 **PostgreSQL** | Production-grade database, supports 200+ concurrent users |
| 🌐 **Interface Localization** | Account-level UI language preference with Indonesian, English, and Simplified Chinese support |

---

## ✨ Features

### Core Features

- 🤖 **Multi-AI Models** - Support for OpenAI, Gemini, Claude, and proxy APIs
- 📝 **Smart Wizard** - AI auto-generates outlines, characters, and worldbuilding
- 👥 **Character Management** - Visual management of relationships and organizations
- 📖 **Chapter Editing** - Create, edit, regenerate, and polish chapters
- 🌐 **World Settings** - Build complete story backgrounds
- 💡 **Inspiration Mode** - AI-driven creative inspiration and idea generation
- ✍️ **Custom Styles** - Customizable AI writing styles
- 📊 **Mind Map** - Visualize chapter logic relationships

### Advanced Features (v1.3.0+)

- 🔮 **Foreshadowing** - Smart tracking, unresolved reminders, auto-injection into AI context
- 🔍 **Consistency Check** - AI analysis of character behavior and plot coherence
- ⏱️ **Timeline** - Story event tracking, filter by chapter and type
- 🎨 **Style Analysis** - Learn project writing style, generate style guides
- 📊 **Quality Scoring** - Basic metrics + AI evaluation with improvement suggestions
- 🔄 **Duplicate Detection** - Detect repetitive/similar content
- 📈 **Character Growth** - Track ability, relationship, psychology, status changes

### System Features

- 🔐 **Multiple Login** - LinuxDO OAuth or local account login
- 💾 **PostgreSQL** - Production database with multi-user data isolation
- 🐳 **Docker Deploy** - One-click startup, ready to use
- 📤 **Import/Export** - Project data and character card import/export
- 🎯 **Career System** - Custom career and level systems

### 🌐 Interface Languages

- Choose **Bahasa Indonesia**, **English**, or **简体中文** from the account menu.
- Your interface-language preference is saved per user account and restored after refresh or login.
- Interface language is separate from novel content and AI generation prompts.
- Translation coverage is being expanded module by module; pages not yet localized may still contain Chinese text.

---

## 📸 Screenshots

<details>
<summary>📷 Click to expand</summary>

<div align="center">

### Login Page
![Login](images/1.png)

### Main Interface
![Main](images/2.png)

### Project Management
![Projects](images/3.png)

</div>

</details>

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- At least one AI service API Key (OpenAI/Gemini/Claude)

### Docker Compose Deployment (Recommended)

```bash
# 1. Clone the project
git clone https://github.com/neosun100/MuMuAINovel.git
cd MuMuAINovel

# 2. Configure environment variables
cp backend/.env.example .env
# Edit .env file, fill in API Key and database password

# 3. Start services
docker-compose up -d

# 4. Access the application
# Open browser and visit http://localhost:8000
```

### Using Docker Hub Image

```bash
# Pull latest image (includes model files)
docker pull mumujie/mumuainovel:latest

# Configure and start
cp backend/.env.example .env
docker-compose up -d
```

---

## ⚙️ Configuration

### Required Configuration (.env)

```bash
# PostgreSQL Database
DATABASE_URL=postgresql+asyncpg://mumuai:your_password@postgres:5432/mumuai_novel
POSTGRES_PASSWORD=your_secure_password

# AI Service (configure at least one)
OPENAI_API_KEY=your_openai_key
OPENAI_BASE_URL=https://api.openai.com/v1
DEFAULT_AI_PROVIDER=openai
DEFAULT_MODEL=gpt-4o-mini

# Local Account Login
LOCAL_AUTH_ENABLED=true
LOCAL_AUTH_USERNAME=admin
LOCAL_AUTH_PASSWORD=your_password
```

### Optional Configuration

```bash
# LinuxDO OAuth
LINUXDO_CLIENT_ID=your_client_id
LINUXDO_CLIENT_SECRET=your_client_secret

# Gemini
GEMINI_API_KEY=your_gemini_key

# Claude
ANTHROPIC_API_KEY=your_anthropic_key

# Connection Pool (High Concurrency)
DATABASE_POOL_SIZE=50
DATABASE_MAX_OVERFLOW=30
```

---

## 📚 API Documentation

### API Overview

This project provides **200+ RESTful API endpoints** covering the entire novel creation workflow.

| Module | Endpoints | Description |
|--------|-----------|-------------|
| Auth | 8 | Login, OAuth, session management |
| Projects | 12 | Project CRUD, import/export |
| Outlines | 15 | Outline generation, editing, AI continuation |
| Characters | 18 | Character management, relationship graphs |
| Chapters | 25 | Chapter generation, editing, batch operations |
| Foreshadows | 10 | Foreshadow tracking, resolution reminders |
| Consistency | 4 | Character/plot consistency detection |
| Timeline | 6 | Event timeline management |
| Style Analysis | 3 | Writing style learning and analysis |
| Quality | 2 | Chapter quality assessment |
| Duplicate | 2 | Duplicate content detection |
| Character Growth | 6 | Character growth tracking |
| Others | 89+ | Organizations, careers, memories, settings, etc. |

### Online Documentation

After starting the service, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Core API Examples

<details>
<summary>🔮 Foreshadowing API</summary>

```bash
# Create foreshadow
POST /api/foreshadows
{
  "project_id": "uuid",
  "title": "Mysterious Letter",
  "description": "Protagonist receives a letter from the future",
  "foreshadow_type": "plot",
  "planted_chapter": 3
}

# Get pending foreshadow reminders
GET /api/foreshadows/reminders?project_id={id}&current_chapter=10

# Resolve foreshadow
POST /api/foreshadows/{id}/resolve
{
  "resolved_chapter": 15,
  "resolution_description": "The truth of the letter is revealed"
}
```

</details>

<details>
<summary>🔍 Consistency Check API</summary>

```bash
# Check chapter consistency
POST /api/consistency/chapter/{chapter_id}/check

# Response example
{
  "overall_score": 85,
  "character_consistency": {
    "score": 90,
    "issues": []
  },
  "plot_consistency": {
    "score": 80,
    "issues": ["Minor timeline contradiction"]
  },
  "suggestions": ["Check time description in chapter 5"]
}
```

</details>

<details>
<summary>⏱️ Timeline API</summary>

```bash
# Create timeline event
POST /api/timeline
{
  "project_id": "uuid",
  "title": "Protagonist Awakening",
  "event_type": "major_plot",
  "story_day": 1,
  "chapter_number": 5,
  "related_characters": ["Character A", "Character B"]
}

# Get timeline
GET /api/timeline?project_id={id}&event_type=major_plot
```

</details>

<details>
<summary>🎨 Style Analysis API</summary>

```bash
# Analyze project writing style
POST /api/style-analysis/project/{project_id}/analyze

# Response example
{
  "narrative_style": "Enthusiastic",
  "description_style": "Delicate and vivid",
  "pacing": "Well-balanced",
  "language_style": "Modern vernacular",
  "emotional_tone": "Positive",
  "style_summary": "The work has a bright style..."
}
```

</details>

<details>
<summary>📊 Quality Scoring API</summary>

```bash
# Get basic quality metrics
GET /api/quality/chapter/{chapter_id}/basic

# AI comprehensive evaluation
POST /api/quality/chapter/{chapter_id}/evaluate

# Response example
{
  "basic_total": 75,
  "ai_evaluation": {
    "writing_quality": 80,
    "pacing": 70,
    "plot_development": 75,
    "dialogue": 80
  },
  "grade": "B",
  "suggestions": ["Add more environmental descriptions"]
}
```

</details>

<details>
<summary>🔄 Duplicate Detection API</summary>

```bash
# Check chapter internal duplicates
GET /api/duplicate/chapter/{chapter_id}/check?threshold=0.7

# Check project-level duplicates
GET /api/duplicate/project/{project_id}/check?threshold=0.7&max_chapters=20
```

</details>

<details>
<summary>📈 Character Growth API</summary>

```bash
# Create growth record
POST /api/character-growth
{
  "project_id": "uuid",
  "character_id": "uuid",
  "growth_type": "ability",
  "chapter_number": 10,
  "before_state": "Ordinary person",
  "after_state": "Awakened",
  "description": "Protagonist awakens hidden abilities in crisis"
}

# Get character growth timeline
GET /api/character-growth/character/{character_id}?growth_type=ability
```

</details>

---

## 🏗️ Architecture

### RTCO Context Framework

Chapter generation uses the **RTCO (Real-Time Context Optimization)** framework, dynamically adjusting context complexity:

```
Chapter #    Context Strategy
─────────────────────────────────
Chapter 1    Outline + Characters only
Ch 2-10      Previous chapter ending 300 chars + involved characters
Ch 11-50     Previous chapter ending 500 chars + 3 relevant memories
Ch 51+       Previous chapter ending 500 chars + story skeleton + 5 smart memories
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | FastAPI • SQLAlchemy • Pydantic • Alembic |
| **Database** | PostgreSQL 18 • Connection pool optimization |
| **Frontend** | React 18 • TypeScript • Ant Design • Zustand |
| **AI** | OpenAI SDK • Gemini SDK • Anthropic SDK |
| **Deployment** | Docker • Docker Compose |

### Project Structure

```
MuMuAINovel/
├── backend/
│   ├── app/
│   │   ├── api/              # 26 API modules
│   │   │   ├── auth.py           # Authentication
│   │   │   ├── projects.py       # Project management
│   │   │   ├── chapters.py       # Chapter management
│   │   │   ├── characters.py     # Character management
│   │   │   ├── foreshadows.py    # Foreshadowing
│   │   │   ├── consistency.py    # Consistency detection
│   │   │   ├── timeline.py       # Timeline management
│   │   │   ├── style_analysis.py # Style analysis
│   │   │   ├── quality.py        # Quality scoring
│   │   │   ├── duplicate.py      # Duplicate detection
│   │   │   ├── character_growth.py # Character growth
│   │   │   └── ...
│   │   ├── models/           # 21 data models
│   │   ├── services/         # 31 business services
│   │   ├── schemas/          # Pydantic schemas
│   │   └── main.py           # Application entry
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/            # 25 page components
│   │   ├── components/       # Common components
│   │   └── services/         # API services
│   └── package.json
├── docker-compose.yml
└── Dockerfile
```

---

## 📋 Version History

### v1.10.0 (2026-01-04) - Current

**Phase 3 Complete - Advanced Writing Assistance**

| Version | Feature | Description |
|---------|---------|-------------|
| v1.10.0 | Style Guide Integration | Auto-inject learned writing style during AI generation |
| v1.9.0 | Character Growth | Track ability, relationship, psychology, status changes |
| v1.8.0 | Duplicate Detection | Detect repetitive content within and across chapters |
| v1.7.0 | Quality Scoring | Basic metrics + AI evaluation, S/A/B/C/D grading |
| v1.6.0 | Style Analysis | Learn project writing style, generate style guides |
| v1.5.0 | Timeline Management | Story event timeline tracking |
| v1.4.0 | Consistency Detection | AI analysis of character behavior and plot coherence |
| v1.3.x | Foreshadowing | Smart tracking, auto-injection during AI generation |

### Fork Development Notes

- Added an i18n foundation with per-user interface-language preferences for Bahasa Indonesia, English, and Simplified Chinese.
- The project workspace dashboard, project-list interactions, relative dates, and global footer are localized in all three supported interface languages.
- The workspace header and account profile card preserve readable name and role labels when longer translations are active.
- Interface language remains independent from novel content and AI generation prompts.
- Translation is still in progress: the login page, welcome announcement, and other modules may still contain Chinese text. See [Interface Localization Progress](docs/I18N_PROGRESS.md) for current coverage and validation notes.

### v1.2.x - Foundation Enhancement

- Career and level system
- Character/organization card import/export
- Chapter reader
- Context building system refactor (RTCO)

### v1.1.x - UX Optimization

- Chinese-style theme UI
- AI streaming optimization
- Inspiration mode enhancement
- Gemini adapter

### v1.0.x - Initial Release

- Core novel creation features
- Multi-AI model support
- PostgreSQL database
- Docker deployment

---

## 🐳 Docker Deployment Details

### Service Architecture

```yaml
services:
  postgres:      # PostgreSQL 18 Database
    - Port: 5432
    - Optimized: 200 concurrent connections
    - Persistence: postgres_data volume

  mumuainovel:   # Main Application
    - Port: 8000
    - Health check: Every 30 seconds
    - Auto-wait for database ready
```

### Common Commands

```bash
# Start
docker-compose up -d

# View logs
docker-compose logs -f mumuainovel

# Restart
docker-compose restart

# Stop
docker-compose down

# Update
docker-compose pull && docker-compose up -d
```

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Submit Pull Request

---

## 📝 License

This project is licensed under [GNU General Public License v3.0](LICENSE)

- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- 📝 Must open source modified versions
- 📝 Must retain original copyright

---

## 📧 Contact

- Submit [Issue](https://github.com/neosun100/MuMuAINovel/issues)
- Linux DO [Discussion](https://linux.do/t/topic/1106333)

---

<div align="center">

**⭐ If this project helps you, please give it a Star!**

Made with ❤️ by Neo

</div>
