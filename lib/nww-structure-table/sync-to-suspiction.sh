#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="/home/sporieg/dev/nww-structure-table/lib/nww-structure-table"
SCRIPTS_DIR="${PROJECT_DIR}/scripts"
REMOTE_TARGET="sporieg@suspicious.zip:/var/lib/foundryvtt/Data/modules/nww-lancer-alt-structure/scripts"

cleanup() {
  echo "Stopping watchers..."
  kill 0
}
trap cleanup INT TERM EXIT

watch_build() {
  cd "${PROJECT_DIR}"
  echo "Starting build watch..."
  npm run watch
}

watch_sync() {
  echo "Watching ${SCRIPTS_DIR} for changes..."
  while inotifywait -r -e modify,create,delete,move "${SCRIPTS_DIR}"; do
    echo "Change detected in scripts, syncing..."
    rsync -rltzvPO -e ssh "${SCRIPTS_DIR}/" "${REMOTE_TARGET}"
    echo "Sync complete."
  done
}

watch_build &
watch_sync &
wait
