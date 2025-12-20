#!/bin/bash

# Quick Start Script for Offline AI Copilot
# This script sets up and runs the application

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        🤖 Offline AI Copilot - Quick Start                ║"
echo "║        GitHub Copilot Inspired - Offline Mode             ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

echo "✓ Node.js detected: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm detected: $(npm --version)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Build if dist doesn't exist
if [ ! -d "dist" ]; then
    echo "🔨 Building project..."
    npm run build
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "Choose what to run:"
echo "  1) CLI Interactive Mode"
echo "  2) Web API Server"
echo "  3) Show Info"
echo "  4) Run Tests"
echo ""

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "Starting CLI Interactive Mode..."
        node dist/cli.js interactive
        ;;
    2)
        echo ""
        echo "Starting Web API Server..."
        echo "Access the web interface at: http://localhost:3000"
        npm run server
        ;;
    3)
        echo ""
        node dist/cli.js info
        ;;
    4)
        echo ""
        npm test
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
