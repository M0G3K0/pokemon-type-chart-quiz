#!/bin/bash
# NERV Send Command
# Sends a message to a specific agent via tmux send-keys
# Follows the 2-step send-keys rule (text first, then Enter)
#
# Usage: ./nerv-send.sh <agent-name> <message>
# Example: ./nerv-send.sh ritsuko "src/app/ui/pt-text/pt-text.scss のデザイントークン遵守を検証して"

set -euo pipefail

SESSION_NAME="nerv"
AGENT_NAME="${1:?Usage: nerv-send.sh <agent-name> <message>}"
MESSAGE="${2:?Usage: nerv-send.sh <agent-name> <message>}"

# Map agent names to window indices
case "${AGENT_NAME}" in
  gendo)     WINDOW=0 ;;
  fuyutsuki) WINDOW=1 ;;
  ritsuko)   WINDOW=2 ;;
  shinji)    WINDOW=3 ;;
  misato)    WINDOW=4 ;;
  kaworu)    WINDOW=5 ;;
  asuka)     WINDOW=6 ;;
  kaji)      WINDOW=7 ;;
  rei)       WINDOW=8 ;;
  *)
    echo "❌ Unknown agent: ${AGENT_NAME}"
    exit 1
    ;;
esac

# IMPORTANT: send-keys must be split into 2 calls
# Text first, then Enter separately
tmux send-keys -t "${SESSION_NAME}:${WINDOW}" "${MESSAGE}"
sleep 0.5
tmux send-keys -t "${SESSION_NAME}:${WINDOW}" Enter

echo "📨 Sent to ${AGENT_NAME}: ${MESSAGE}"
