# Dev Container + Claude Code — Example

An example project showing how to set up a VS Code Dev Container with [Claude Code](https://github.com/anthropics/claude-code) pre-installed and configured.

The app itself is a minimal Express.js server used purely as a working example to run inside the container.

## How it works

```
 HOST MACHINE
 ┌──────────────────────────────────────────────────────┐
 │                                                      │
 │  ~/Project/devcontainter/                            │
 │  ├── src/                                            │
 │  ├── .devcontainer/                                  │
 │  ├── node_modules/        ← NOT synced (gitignored)  │
 │  └── package.json                                    │
 │                                                      │
 │  ~/.claude/                                          │
 │  ├── settings.json                                   │
 │  └── ...                                             │
 │                                                      │
 └──────┬────────────────────────┬────────────────────--┘
        │                        │
        │ bind mount             │ bind mount
        │ (two-way sync)         │ (two-way sync)
        ▼                        ▼
 ┌──────────────────────────────────────────────────────┐
 │  CONTAINER  (Node.js 22 / Debian Bookworm)           │
 │                                                      │
 │  containerUser: node  ← all processes run as "node"  │
 │  remoteUser: node     ← VS Code Server runs as "node"│
 │                                                      │
 │  /workspaces/devcontainter/   ← project files        │
 │  └── node_modules/            ← Docker volume *      │
 │                                                      │
 │  /home/node/.claude/          ← Claude config        │
 │                                                      │
 │  localhost:3000 ─────────────────────────────────►  :3000 (forwarded to host)
 └──────────────────────────────────────────────────────┘
