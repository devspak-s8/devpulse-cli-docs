# DevPulse Documentation

## Overview

DevPulse is a developer-first productivity and analytics CLI designed to help engineers track work, analyze GitHub activity, monitor system health, and stay focused — all from the terminal.

The project is CLI-first, with optional API and dashboard support planned. DevPulse prioritizes:

- Speed
- Reliability
- Offline resilience
- Clean, scriptable output

This documentation explains how to install, use, and extend DevPulse across different workflows and programming environments.

## What Is DevPulse?

DevPulse is a modular command-line tool that combines:

- GitHub repository & activity analytics
- Developer productivity tracking
- System and project health insights
- Structured JSON output for automation
- Optional API usage for integration into apps and dashboards

It is built for:

- Developers
- Teams
- Recruiters
- Tool builders
- Automation & CI workflows

## Core Design Principles

- **CLI-first** – everything works from the terminal
- **Graceful degradation** – cached data when APIs fail
- **No forced authentication** – works unauthenticated, better with tokens
- **Fast by default** – aggressive caching + timeouts
- **Extensible architecture** – easy to add commands and backends

## Features

### GitHub Analytics

- Repository statistics
- Language usage breakdown
- Contributor insights
- Issue & pull request metrics
- Activity tracking (events, commits, stars, PRs)
- Built-in rate-limit handling with cache fallback

### Productivity Tools

- Task & time tracking
- Projects and notes
- Habits and focus sessions
- Reports and exports (CLI & JSON)

### System & Dev Utilities

- System health checks
- Log analysis (planned)
- Secret scanning (planned)
- AI-assisted insights (planned)

## Installation

```bash
pip install devpulse
```

Or from source:

```bash
git clone https://github.com/your-org/devpulse
cd devpulse
pip install -e .
```

## Quick Start

```bash
devpulse --help
```

Check GitHub stats:

```bash
devpulse github stats --username torvalds
```

Track GitHub activity:

```bash
devpulse github activity torvalds
```

Get JSON output for automation:

```bash
devpulse github stats --repo microsoft/vscode --json
```

## Authentication (Optional)

To increase GitHub API limits:

```bash
export GITHUB_TOKEN=your_token_here
```

This raises limits from 60 → 5000 requests/hour.

## Output Formats

DevPulse supports:

- Rich terminal tables (default)
- Machine-readable JSON (`--json` flag)

This makes it easy to:

- Pipe into scripts
- Use in CI/CD
- Integrate into dashboards
- Build APIs on top

## Architecture Overview

- **CLI Framework**: Typer
- **Output**: Rich
- **HTTP Client**: Requests
- **Caching**: File-based cache with stale fallback
- **Error Handling**: User-friendly, rate-limit aware
- **Testing**: 200+ tests, full backward compatibility

## API & Integrations

DevPulse can be used:

- Directly via CLI
- As a backend for dashboards
- Embedded in automation scripts
- As a REST API service (optional FastAPI layer)

Example API usage:

```
GET /github-stats?username=torvalds
```

## Who Is This For?

- Developers who live in the terminal
- Teams needing lightweight analytics
- Builders creating dev dashboards
- Recruiters evaluating GitHub activity
- Anyone who prefers tools that don't break when APIs fail

## Roadmap

- Persistent local storage
- Full REST API
- Web dashboard
- AI-powered insights
- Plugin system

## License

MIT License
