#!/bin/bash
# NERV Commander Order
# Gendo gives an abstract order, Fuyutsuki executes it
#
# Usage: ./nerv-order.sh "pt-chip を production-ready にしろ"
# This creates a YAML order file and wakes up Fuyutsuki

set -euo pipefail

SESSION_NAME="nerv"
PROJECT_PATH="/mnt/c/Users/hikari/Documents/project_MGK/pokemon-type-chart-quiz"
QUEUE_DIR="${PROJECT_PATH}/tmp/nerv-queue"
ORDER_FILE="${QUEUE_DIR}/gendo_order.yaml"
REPORTS_DIR="${QUEUE_DIR}/reports"

ORDER="${1:?Usage: nerv-order.sh '<abstract order>'}"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "🔺 碇ゲンドウ: 命令を発令..."
echo ""

# Clean previous reports
rm -f "${REPORTS_DIR}"/*.md 2>/dev/null || true
mkdir -p "${REPORTS_DIR}"

# Write the order YAML
cat > "${ORDER_FILE}" << EOF
# NERV Commander Order
commander: gendo
timestamp: "${TIMESTAMP}"
order: "${ORDER}"
status: pending
agents:
  - ritsuko
  - misato
  - asuka
EOF

echo "📄 Order file: ${ORDER_FILE}"
echo "   Content: ${ORDER}"
echo ""

# Wake up Fuyutsuki
FUYUTSUKI_MSG="碇から新しい命令がある。tmp/nerv-queue/gendo_order.yaml を読んで、タスク分解して各エージェントに分配してくれ。結果は tmp/nerv-queue/reports/ に集約して報告してくれ。"

tmux send-keys -t "${SESSION_NAME}:1" "${FUYUTSUKI_MSG}"
sleep 0.5
tmux send-keys -t "${SESSION_NAME}:1" Enter

echo "📨 冬月を起こした"
echo ""
echo "💡 進捗確認:"
echo "   tmux attach -t nerv     # 全体を見る"
echo "   Ctrl+B, 1               # 冬月の画面"
echo "   Ctrl+B, 2-4             # 各エージェントの画面"
echo ""
echo "🔺 ゲンドウ: 「すべては計画通りだ」"
