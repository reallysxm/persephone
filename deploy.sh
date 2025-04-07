#!/bin/bash

REPO_URL="https://github.com/reallysxm/persephone.git"
BRANCH="dist"

echo "< / > | Starting installation..."

# ✅ Fix: space before the closing ]
if [ ! -d ".git" ]; then 
    echo "< / > | No git repo found. Setting it up..."
    git init
    git remote add origin "$REPO_URL"
    git fetch origin "$BRANCH"
    git checkout -b "$BRANCH" origin/"$BRANCH"
else
    echo "< / > | Git repo found. Syncing with remote..."
    git remote set-url origin "$REPO_URL"
    git fetch origin "$BRANCH"
    git checkout "$BRANCH" || git checkout -b "$BRANCH" origin/"$BRANCH"
fi

echo "< / > | Resetting to remote..."
git reset --hard origin/"$BRANCH"

echo "< / > | Installing packages..."
npm ci --omit=dev --no-audit --no-fund

echo "< / > | Finished, Booting up..."
exec node .
