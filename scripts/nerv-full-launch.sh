#!/bin/bash
# NERV Full Launch
# Sets up tmux session and launches all agents
#
# Usage: ./nerv-full-launch.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🔺 NERV System - Full Launch Sequence"
echo ""

# Step 1: Setup tmux session
bash "${SCRIPT_DIR}/nerv-setup.sh"

# Step 2: Wait for tmux to be ready
sleep 1

# Step 3: Launch agents (skip gendo - that's the user)
echo ""
echo "🚀 Launching agents..."
for agent in fuyutsuki ritsuko misato asuka; do
  bash "${SCRIPT_DIR}/nerv-launch.sh" "${agent}"
  sleep 2  # Give each agent time to initialize
done

echo ""
echo "🔺 All agents deployed!"
echo ""
echo "💡 Quick commands:"
echo "   tmux attach -t nerv           # Attach to NERV"
echo "   Ctrl+B, 0                     # Switch to Gendo (Commander)"
echo "   Ctrl+B, 1                     # Switch to Fuyutsuki"
echo "   Ctrl+B, 2                     # Switch to Ritsuko"
echo "   Ctrl+B, 3                     # Switch to Misato"
echo "   Ctrl+B, 4                     # Switch to Asuka"
echo ""
echo "📨 Send task example:"
echo '   ./scripts/nerv-send.sh ritsuko "src/app/ui/pt-text/ の設計レビューを実施して"'
echo ""
echo "🔺 NERV - All Systems Operational"
