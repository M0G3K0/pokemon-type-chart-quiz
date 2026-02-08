#!/bin/bash
# NERV Multi-Agent System - Setup Script
# Level 3: WSL2 + tmux + Gemini CLI
#
# Architecture:
#   碇ゲンドウ (Commander) → YAML → 冬月 (Sub-Commander / 家老)
#   冬月 → タスク分解 → リツコ / ミサト / アスカ (足軽)
#   全エージェント = Gemini CLI インスタンス
#
# Usage: ./nerv-setup.sh [project-path]

set -euo pipefail

# Configuration
SESSION_NAME="nerv"
PROJECT_PATH="${1:-/mnt/c/Users/hikari/Documents/project_MGK/pokemon-type-chart-quiz}"
QUEUE_DIR="${PROJECT_PATH}/tmp/nerv-queue"

echo "🔺 NERV System Boot Sequence..."
echo "   Project: ${PROJECT_PATH}"
echo ""

# Create queue directories
mkdir -p "${QUEUE_DIR}/tasks"
mkdir -p "${QUEUE_DIR}/reports"

# Kill existing session if present
tmux kill-session -t "${SESSION_NAME}" 2>/dev/null || true

# Create tmux session with 4 windows
# Window 0: 碇ゲンドウ (Commander / User input)
# Window 1: 冬月 (Sub-Commander / Coordinator)
# Window 2: リツコ (Design Review)
# Window 3: ミサト (Code Quality)
# Window 4: アスカ (Test Execution)

echo "📡 Creating NERV tmux session..."

# Create session with first window (Gendo)
tmux new-session -d -s "${SESSION_NAME}" -n "gendo" -c "${PROJECT_PATH}"

# Create additional windows
tmux new-window -t "${SESSION_NAME}" -n "fuyutsuki" -c "${PROJECT_PATH}"
tmux new-window -t "${SESSION_NAME}" -n "ritsuko" -c "${PROJECT_PATH}"
tmux new-window -t "${SESSION_NAME}" -n "misato" -c "${PROJECT_PATH}"
tmux new-window -t "${SESSION_NAME}" -n "asuka" -c "${PROJECT_PATH}"

# Set status bar with NERV theme
tmux set-option -t "${SESSION_NAME}" status-style "bg=#800020,fg=white"
tmux set-option -t "${SESSION_NAME}" status-left " 🔺 NERV "
tmux set-option -t "${SESSION_NAME}" status-right " %H:%M "

echo "✅ NERV session created with 5 windows"
echo ""
echo "🖥️  Window layout:"
echo "   [0] gendo     - 碇ゲンドウ (Commander)"
echo "   [1] fuyutsuki - 冬月 (Sub-Commander)"
echo "   [2] ritsuko   - リツコ (Design Review)"
echo "   [3] misato    - ミサト (Code Quality)"
echo "   [4] asuka     - アスカ (Test Execution)"
echo ""
echo "📂 Queue directory: ${QUEUE_DIR}"
echo ""
echo "🚀 To start:"
echo "   1. Attach to session:  tmux attach -t nerv"
echo "   2. Switch windows:     Ctrl+B, [0-4]"
echo "   3. Start agents in each window:"
echo "      Window 1-4: gemini"
echo ""
echo "🔺 NERV System Ready."
