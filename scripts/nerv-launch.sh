#!/bin/bash
# NERV Agent Launcher
# Launches Gemini CLI in a specific NERV tmux window
#
# Usage: ./nerv-launch.sh <agent-name>
# Example: ./nerv-launch.sh ritsuko

set -euo pipefail

SESSION_NAME="nerv"
AGENT_NAME="${1:?Usage: nerv-launch.sh <agent-name>}"
PROJECT_PATH="/mnt/c/Users/hikari/Documents/project_MGK/pokemon-type-chart-quiz"

# Map agent names to window indices
case "${AGENT_NAME}" in
  gendo)     WINDOW=0 ;;
  fuyutsuki) WINDOW=1 ;;
  ritsuko)   WINDOW=2 ;;
  shinji)    WINDOW=3 ;;
  misato)    WINDOW=4 ;;
  asuka)     WINDOW=5 ;;
  rei)       WINDOW=6 ;;
  *)
    echo "❌ Unknown agent: ${AGENT_NAME}"
    echo "   Available: gendo, fuyutsuki, ritsuko, shinji, misato, asuka, rei"
    exit 1
    ;;
esac

echo "🔺 Launching ${AGENT_NAME} in window ${WINDOW}..."

# Send Gemini CLI startup command to the window
tmux send-keys -t "${SESSION_NAME}:${WINDOW}" "cd ${PROJECT_PATH} && gemini" Enter

echo "✅ ${AGENT_NAME} launched"
