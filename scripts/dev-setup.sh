#!/bin/bash

# dev-setup.sh - Development environment setup for Nitrokit Next.js

# Get the parent directory (nitrokit root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔄 Setting up Nitrokit Next.js development environment..."
echo "📁 Project root: $PROJECT_ROOT"

# Change to project root directory
cd "$PROJECT_ROOT"

# 🧹 Clean up build artifacts and cache files before setup
echo "🧹 Cleaning up previous build artifacts..."

# Remove directories
for dir in ".next" "coverage" "dist" "build" "node_modules" "src/generated"; do
    if [ -d "$PROJECT_ROOT/$dir" ]; then
        echo "🗑️  Removing $dir..."
        rm -rf "$PROJECT_ROOT/$dir"
    else
        echo "✅ $dir already clean"
    fi
done

# Remove files
for file in "tsconfig.tsbuildinfo" "test-report.junit.xml"; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        echo "🗑️  Removing $file..."
        rm -f "$PROJECT_ROOT/$file"
    else
        echo "✅ $file already clean"
    fi
done

# Clean pnpm cache directories if they exist
if [ -d "$PROJECT_ROOT/.pnpm" ]; then
    echo "🗑️  Cleaning pnpm cache..."
    rm -rf "$PROJECT_ROOT/.pnpm"
fi

# Clean Prisma generated files
if [ -d "$PROJECT_ROOT/prisma/generated" ]; then
    echo "🗑️  Cleaning Prisma generated files..."
    rm -rf "$PROJECT_ROOT/prisma/generated"
fi

# Clean Vitest cache
if [ -d "$PROJECT_ROOT/.vitest" ]; then
    echo "🗑️  Cleaning Vitest cache..."
    rm -rf "$PROJECT_ROOT/.vitest"
fi

echo "✅ Cleanup completed!"
echo ""

# Install dependencies with pnpm (preferred package manager)
echo "📥 Installing dependencies with pnpm..."
if command -v pnpm &> /dev/null; then
    pnpm install --no-frozen-lockfile
elif command -v npm &> /dev/null; then
    npm install
else
    echo "❌ No package manager found. Please install pnpm or npm first."
    exit 1
fi

# Check for Prisma models directory and handle database setup
if [ -d "$PROJECT_ROOT/prisma/models" ] && [ -f "$PROJECT_ROOT/prisma/schema.prisma" ]; then
    echo "🗃️ Setting up Prisma database with multi-schema setup..."
    
    # Import schemas from models directory
    echo "📦 Importing Prisma schemas..."
    pnpm prisma:import || echo "⚠️  Failed to import Prisma schemas"
    
    # Check if database exists and run migrations first
    echo "🔄 Running database migrations..."
    pnpm prisma migrate dev --name init 2>/dev/null || echo "✅ Database up to date"
    
    # Then generate Prisma client
    echo "📦 Generating Prisma client..."
    pnpm prisma:generate
    
    echo "✅ Prisma setup completed"
elif [ -f "$PROJECT_ROOT/prisma/schema.prisma" ]; then
    echo "🗃️ Setting up Prisma database..."
    echo "📍 Found Prisma schema at: $PROJECT_ROOT/prisma/schema.prisma"
    
    # Run migrations and generate client
    echo "🔄 Running database migrations..."
    pnpm prisma migrate dev --name init 2>/dev/null || echo "✅ Database up to date"
    
    echo "📦 Generating Prisma client..."
    pnpm prisma:generate
    
    echo "✅ Prisma setup completed"
else
    echo "⚠️  Prisma schema not found. Skipping database setup."
fi

# Check for environment file
if [ ! -f "$PROJECT_ROOT/.env" ] && [ -f "$PROJECT_ROOT/.env.example" ]; then
    echo "🔧 Creating .env file from .env.example..."
    cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
    echo "⚠️  Please update .env file with your configuration"
elif [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo "⚠️  No .env file found. Consider creating one for local development"
fi

# Check Next.js configuration
if [ -f "$PROJECT_ROOT/next.config.ts" ] || [ -f "$PROJECT_ROOT/next.config.js" ]; then
    echo "✅ Next.js configuration found"
else
    echo "⚠️  Next.js configuration not found"
fi

# Check internationalization messages
if [ -d "$PROJECT_ROOT/messages" ]; then
    echo "✅ i18n messages directory found"
else
    echo "⚠️  i18n messages directory not found"
fi

# Set up Husky hooks if available
if [ -f "$PROJECT_ROOT/package.json" ] && grep -q "husky" "$PROJECT_ROOT/package.json"; then
    echo "🪝 Setting up Husky git hooks..."
    pnpm husky install || echo "⚠️  Failed to install Husky hooks"
fi

# Show available scripts
echo ""
echo "🎯 Available development commands:"
echo "  pnpm dev              - Start development server"
echo "  pnpm build            - Build for production"
echo "  pnpm test             - Run tests with Vitest"
echo "  pnpm test:coverage    - Run tests with coverage report"
echo "  pnpm test:ui          - Run tests with Vitest UI"
echo "  pnpm playwright       - Run Playwright e2e tests"
echo "  pnpm prisma:studio    - Open Prisma Studio"
echo "  pnpm prisma:push      - Push schema changes to database"
echo "  pnpm prisma:migrate   - Run database migrations"
echo "  pnpm prisma:generate  - Generate Prisma client"
echo "  pnpm prisma:import    - Import schemas from models directory"
echo "  pnpm lint             - Run ESLint"
echo "  pnpm lint:fix         - Fix ESLint issues"
echo "  pnpm format           - Format code with Prettier"
echo "  pnpm type-check       - Run TypeScript type checking"
echo "  pnpm env:sanitize     - Create sanitized .env.example"

echo ""
echo "✅ Nitrokit Next.js development environment ready!"
echo "🚀 Run 'pnpm dev' to start development server"
echo "🌐 Application will be available at http://localhost:3000"

# Return to original directory
cd - > /dev/null