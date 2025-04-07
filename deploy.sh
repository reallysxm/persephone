#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Set the remote repository URL and target branch
REPO_URL="https://github.com/reallysxm/persephone.git"
BRANCH="dist"

echo "< / > | Starting installation..."

# Check if this directory is already a git repo
if [ ! -d ".git" ]; then 
    echo "< / > | No git repo found. Setting it up..."

    # Initialize an empty git repo
    git init

    # Add the remote origin URL
    git remote add origin "$REPO_URL"

    # Fetch the target branch from the remote repository
    git fetch origin "$BRANCH"

    # Create a new local branch from the fetched remote branch
    git checkout -b "$BRANCH" origin/"$BRANCH"
else
    echo "< / > | Git repo found. Syncing with remote..."

    # Update remote URL to ensure it matches the desired repository
    git remote set-url origin "$REPO_URL"

    # Fetch latest updates from the specified branch
    git fetch origin "$BRANCH"

    # Checkout the branch (or create it if it doesn't exist)
    git checkout "$BRANCH" || git checkout -b "$BRANCH" origin/"$BRANCH"
fi

# Forcefully reset the local branch to exactly match the remote branch
echo "< / > | Resetting to remote..."
git reset --hard origin/"$BRANCH"

# Install only production dependencies from package-lock.json
echo "< / > | Installing packages..."
npm ci --omit=dev --no-audit --no-fund

# Start the Node.js application
echo "< / > | Finished, Booting up..."
exec node .