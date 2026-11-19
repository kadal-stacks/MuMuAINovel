[English](README.md) | [简体中文](README_CN.md) | [繁體中文](README_TW.md) | [日本語](README_JP.md)

<div align="center">

# MuMuAINovel 📚✨

**🚀 AI驱动的小说创作助手 | 自动生成百万字长篇小说**

![Version](https://img.shields.io/badge/version-1.10.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue.svg)
![License](https://img.shields.io/badge/license-GPL%20v3-blue.svg)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)
![API](https://img.shields.io/badge/API%20Endpoints-200+-orange.svg)

**⭐ 如果这个项目对你有帮助，请给一个 Star！**

</div>

---

## 🎯 核心亮点

| 功能 | 说明 |
|------|------|
| 🤖 **多AI支持** | OpenAI / Gemini / Claude 无缝切换 |
| 📖 **智能章节生成** | RTCO框架动态上下文，自动情节延续 |
| 🎭 **角色管理** | 关系图谱、组织架构、成长追踪 |
| 🔮 **伏笔系统** | 智能追踪，生成时自动注入 |
| 📊 **质量评分** | 基础指标 + AI评估，S/A/B/C/D分级 |
| 🔍 **一致性检测** | AI分析角色行为和情节连贯性 |
| ⏱️ **时间线管理** | 故事事件时间线追踪和可视化 |
| 🎨 **风格分析** | 学习写作风格，生成风格指南 |
| 🔄 **重复检测** | 检测章节内和跨章节的重复内容 |
| 💾 **PostgreSQL** | 生产级数据库，支持200+并发用户 |
| 🌐 **界面多语言** | 按用户账户保存界面语言偏好，支持简体中文、English 和 Bahasa Indonesia |
| 🚀 **批量生成** | 自动生成100章×10000字 |

---

## ✨ 功能特性

### 核心功能

- 🤖 **多AI模型** - 支持 OpenAI、Gemini、Claude 及自定义API端点
- 📝 **智能向导** - AI自动生成大纲、角色、世界观
- 👥 **角色管理** - 可视化关系图和组织架构管理
- 📖 **章节编辑器** - 创建、编辑、重新生成、润色章节
- 🌐 **世界构建** - 完整的故事背景构建
- 💡 **灵感模式** - AI驱动的创意生成
- ✍️ **自定义风格** - 支持自定义AI写作风格
- 📊 **思维导图** - 可视化章节逻辑关系

### 高级功能 (v1.3.0+)

- 🔮 **伏笔管理** - 追踪情节伏笔，提醒未解决的线索
- 🔍 **一致性检测** - AI分析角色行为和情节连贯性
- ⏱️ **时间线管理** - 故事事件时间线追踪
- 🎨 **风格分析** - 学习项目写作风格，生成风格指南
- 📊 **章节质量评分** - 基础指标 + AI综合评估
- 🔄 **重复检测** - 检测重复/相似内容
- 📈 **角色成长** - 追踪角色能力、关系、心理变化

### 🌐 界面语言

- 可在账户菜单中选择 **Bahasa Indonesia**、**English** 或 **简体中文**。
- 界面语言偏好按用户账户保存，刷新页面或重新登录后会自动恢复。
- 界面语言与小说正文内容、AI生成提示词相互独立。
- 多语言翻译按模块逐步推进，尚未完成本地化的页面仍可能显示中文。

---

## 🚀 快速开始

### 前置条件

- Docker 和 Docker Compose
- 至少一个AI服务API Key（OpenAI/Gemini/Claude）

### Docker Compose 部署（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/neosun100/MuMuAINovel.git
cd MuMuAINovel

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 API Key 和数据库密码

# 3. 启动服务
docker-compose up -d

# 4. 访问应用
# 打开浏览器访问 http://localhost:8000
```

### 使用 Docker Hub 镜像

```bash
# 拉取最新镜像（包含模型文件）
docker pull mumujie/mumuainovel:latest

# 配置并启动
cp .env.example .env
docker-compose up -d
```

---

## ⚙️ 配置说明

### 必需配置 (.env)

```bash
# PostgreSQL 数据库
DATABASE_URL=postgresql+asyncpg://mumuai:your_password@postgres:5432/mumuai_novel
POSTGRES_PASSWORD=your_secure_password

# AI 服务（至少配置一个）
OPENAI_API_KEY=your_openai_key
OPENAI_BASE_URL=https://api.openai.com/v1
DEFAULT_AI_PROVIDER=openai
DEFAULT_MODEL=gpt-4o-mini

# 本地账户登录
LOCAL_AUTH_ENABLED=true
LOCAL_AUTH_USERNAME=admin
LOCAL_AUTH_PASSWORD=your_password
```

### 可选配置

```bash
# LinuxDO OAuth
LINUXDO_CLIENT_ID=your_client_id
LINUXDO_CLIENT_SECRET=your_client_secret

# Gemini
GEMINI_API_KEY=your_gemini_key

# Claude
ANTHROPIC_API_KEY=your_anthropic_key

# 连接池（高并发）
DATABASE_POOL_SIZE=50
DATABASE_MAX_OVERFLOW=30
```

---

## 📚 API 文档

### API 概览

本项目提供 **200+ RESTful API 端点**，覆盖完整的小说创作流程。

| 模块 | 端点数 | 说明 |
|------|--------|------|
| Auth | 8 | 登录、OAuth、会话管理 |
| Projects | 12 | 项目CRUD、导入导出 |
| Outlines | 15 | 大纲生成、编辑、AI续写 |
| Characters | 18 | 角色管理、关系图谱 |
| Chapters | 25 | 章节生成、编辑、批量操作 |
| Foreshadows | 10 | 伏笔追踪、解决提醒 |
| Consistency | 4 | 角色/情节一致性检测 |
| Timeline | 6 | 事件时间线管理 |
| Style | 3 | 写作风格学习和分析 |
| Quality | 2 | 章节质量评估 |
| Duplicate | 2 | 重复内容检测 |
| Growth | 6 | 角色成长追踪 |

### 在线文档

启动服务后访问：
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 🔧 小说创作流水线

### 自动化工作流

MuMuAINovel 支持通过API实现全自动小说创作：

```
1. POST /api/auth/local/login           # 登录
2. POST /api/projects                    # 创建项目
3. PUT  /api/projects/{id}               # 设置世界观
4. POST /api/characters (循环)           # 创建角色 (80-150个)
5. POST /api/outlines (循环)             # 创建大纲 (100章)
6. POST /api/chapters (循环)             # 创建章节 (100个)
7. POST /api/chapters/project/{id}/batch-generate  # 提交批量生成
8. GET  /api/chapters/project/{id}       # 监控进度
```

### 关键参数

| 参数 | 默认值 | 范围 | 说明 |
|------|--------|------|------|
| count | 10 | 1-100 | 生成章节数 |
| target_word_count | 10000 | 1000-20000 | 每章字数 |
| max_retries | 10 | 0-20 | 最大重试次数 |

### RTCO 上下文框架

```
章节序号    上下文策略
─────────────────────────────────
第 1 章     仅大纲 + 角色
第 2-10 章  上章结尾 300 字 + 涉及角色
第 11-50 章 上章结尾 500 字 + 相关记忆 3 条
第 51+ 章   上章结尾 500 字 + 故事骨架 + 智能记忆 5 条
```

### 重试策略（分阶段退避）

| 重试次数 | 等待时间 | 说明 |
|----------|----------|------|
| 1-3 | 2, 4, 8 秒 | 快速重试 |
| 4-6 | 30 秒 | 中等等待 |
| 7-10 | 60 秒 | 长等待 |

---

## 🔄 任务恢复

### 自动恢复脚本

```bash
# 一次性恢复
python auto_resume.py

# 守护进程模式（直到全部完成）
python auto_resume.py --daemon

# 后台运行并记录日志
nohup python auto_resume.py --daemon > resume.log 2>&1 &
```

### 环境变量

```bash
export MUMUAI_BASE_URL=http://localhost:8000
export MUMUAI_USERNAME=admin
export MUMUAI_PASSWORD=your_password
```

---

## 🔌 MCP Server（AI助手集成）

MuMuAINovel 提供 MCP (Model Context Protocol) 服务器，让 Claude、Kiro 等AI助手可以直接创作小说。

### 安装

```bash
pip install mcp httpx
```

### 配置（Claude Desktop）

编辑 `~/.config/claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mumuai-novel": {
      "command": "python",
      "args": ["/path/to/MuMuAINovel/mcp_novel_server.py"],
      "env": {
        "MUMUAI_BASE_URL": "http://localhost:8000",
        "MUMUAI_USERNAME": "admin",
        "MUMUAI_PASSWORD": "your_password"
      }
    }
  }
}
```

### 可用MCP工具

| 工具 | 说明 |
|------|------|
| `novel_list_projects` | 列出所有小说项目 |
| `novel_create_project` | 创建新项目 |
| `novel_create_characters_batch` | 批量创建角色 |
| `novel_create_outlines_batch` | 批量创建大纲 |
| `novel_batch_generate` | 提交批量生成 |
| `novel_check_progress` | 检查生成进度 |
| `novel_resume_all` | 恢复所有中断任务 |
| `novel_full_pipeline` | 一键创建完整小说 |

### 使用示例

```
用户: 帮我创建一部科幻小说《星际征服者》，主角Jack Chen...

AI: [调用 novel_full_pipeline]
    ✅ 项目创建成功
    ✅ 100个角色创建完成
    ✅ 100章大纲创建完成
    ✅ 批量生成已提交
    
    您的小说正在后台生成中！
```

详细文档请参阅 [docs/MCP_USAGE_GUIDE.md](docs/MCP_USAGE_GUIDE.md)。

---

## 🏗️ 技术栈

| 层级 | 技术 |
|------|------|
| **后端** | FastAPI • SQLAlchemy • Pydantic • Alembic |
| **数据库** | PostgreSQL 18 • 连接池优化 |
| **前端** | React 18 • TypeScript • Ant Design • Zustand |
| **AI** | OpenAI SDK • Gemini SDK • Anthropic SDK |
| **部署** | Docker • Docker Compose |

### 项目结构

```
MuMuAINovel/
├── backend/
│   ├── app/
│   │   ├── api/              # 26个API模块
│   │   ├── models/           # 21个数据模型
│   │   ├── services/         # 31个业务服务
│   │   └── main.py           # 应用入口
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/            # 25个页面组件
│   │   └── services/         # API服务
│   └── package.json
├── docs/                     # 文档
│   ├── QUICKSTART.md         # 快速启动指南
│   ├── KIRO_INTERACTION_GUIDE.md  # 完整API指南
│   └── NOVEL_CREATION_PIPELINE.md # 流水线文档
├── auto_resume.py            # 自动恢复脚本
├── novel_pipeline.py         # Python自动化脚本
├── docker-compose.yml
└── Dockerfile
```

---

## 📋 版本历史

### v1.10.0 (2026-01-05) - 当前版本

**第三阶段完成 - 高级写作辅助**

| 版本 | 功能 | 说明 |
|------|------|------|
| v1.10.0 | 风格指南集成 | AI生成时自动注入学习的写作风格 |
| v1.9.0 | 角色成长 | 追踪角色能力、关系、心理变化 |
| v1.8.0 | 重复检测 | 检测章节内和跨章节的重复内容 |
| v1.7.0 | 质量评分 | 基础指标 + AI评估，S/A/B/C/D分级 |
| v1.6.0 | 风格分析 | 学习项目写作风格，生成风格指南 |
| v1.5.0 | 时间线管理 | 故事事件时间线追踪 |
| v1.4.0 | 一致性检测 | AI分析角色行为和情节连贯性 |
| v1.3.x | 伏笔系统 | 智能追踪，生成时自动注入 |

### Fork 开发记录

- 增加 i18n 多语言基础架构，并支持按用户账户保存界面语言偏好。
- 当前翻译覆盖创作工作台首页和全局页脚，其余功能模块将逐步完成本地化。

---

## 🤝 贡献指南

欢迎贡献！请提交 Issues 和 Pull Requests。

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📝 许可证

本项目采用 [GNU General Public License v3.0](LICENSE) 许可证

- ✅ 可自由使用、修改和分发
- ✅ 可用于商业用途
- 📝 修改版本必须开源
- 📝 必须保留原作者版权

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=neosun100/MuMuAINovel&type=Date)](https://star-history.com/#neosun100/MuMuAINovel)

## 📱 关注公众号

![公众号](https://img.aws.xin/uPic/扫码_搜索联合传播样式-标准色版.png)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个 Star！**

Made with ❤️ by Neo

</div>
