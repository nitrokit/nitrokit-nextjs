#!/bin/bash

# generate-release-notes.sh - Automatically generate release notes from git history

TAG="$1"
PREV_TAG=""

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Get project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}🚀 Generating release notes for Nitrokit Next.js${NC}"
echo -e "${YELLOW}📁 Project root: $PROJECT_ROOT${NC}"

# Validate tag parameter
if [[ -z "$TAG" ]]; then
    echo -e "${RED}❌ Error: Please provide a tag name${NC}"
    echo -e "${YELLOW}Usage: $0 <tag-name>${NC}"
    echo -e "${YELLOW}Example: $0 v1.2.0${NC}"
    exit 1
fi

# Check if tag exists
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
    echo -e "${RED}❌ Error: Tag '$TAG' does not exist${NC}"
    exit 1
fi

# Find previous tag
PREV_TAG=$(git describe --tags --abbrev=0 "$TAG^" 2>/dev/null)

if [[ -z "$PREV_TAG" ]]; then
    PREV_TAG=$(git rev-list --max-parents=0 HEAD)
    COMPARISON_RANGE="$PREV_TAG..$TAG"
    COMPARISON_TEXT="Initial release"
else
    COMPARISON_RANGE="$PREV_TAG..$TAG"
    COMPARISON_TEXT="Changes since $PREV_TAG"
fi

echo "# 🚀 Nitrokit Next.js $TAG"
echo ""

# Get release date
RELEASE_DATE=$(git log -1 --format=%ai "$TAG" | cut -d' ' -f1)
echo "**Release Date:** $RELEASE_DATE"
echo "**$COMPARISON_TEXT**"
echo ""

# Check if this is a pre-release
if [[ "$TAG" =~ -[a-zA-Z] ]]; then
    echo "🚨 **This is a pre-release version** - Use with caution in production environments."
    echo ""
fi

# Generate commit categorization with better filtering
FEATURES=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="feat" --grep="feature" --grep="add" --grep="new" -i | grep -v -E "(fix|bug|improve|refactor|doc|deps|bump|upgrade)" -i)
FIXES=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="fix" --grep="bug" --grep="hotfix" --grep="resolve" -i)
IMPROVEMENTS=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="improve" --grep="enhance" --grep="update" --grep="refactor" --grep="optimize" --grep="performance" -i)
DOCS=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="doc" --grep="readme" --grep="comment" --grep="guide" -i)
DEPS=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="dep" --grep="bump" --grep="upgrade" --grep="pnpm" --grep="npm" --grep="yarn" -i)
TRANSLATIONS=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="translation" --grep="i18n" --grep="locale" --grep="lang" -i)
COMPONENTS=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="component" --grep="ui" --grep="design" --grep="theme" -i)
TESTS=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="test" --grep="spec" --grep="coverage" --grep="vitest" --grep="playwright" -i)

# Components & UI
if [[ -n "$COMPONENTS" ]]; then
    echo "## 🎨 Components & UI"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$COMPONENTS"
    echo ""
fi

# Features
if [[ -n "$FEATURES" ]]; then
    echo "## ✨ New Features"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$FEATURES"
    echo ""
fi

# Bug Fixes
if [[ -n "$FIXES" ]]; then
    echo "## 🐛 Bug Fixes"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$FIXES"
    echo ""
fi

# Improvements
if [[ -n "$IMPROVEMENTS" ]]; then
    echo "## 🔧 Improvements"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$IMPROVEMENTS"
    echo ""
fi

# Tests
if [[ -n "$TESTS" ]]; then
    echo "## 🧪 Testing"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$TESTS"
    echo ""
fi

# Translation Updates
if [[ -n "$TRANSLATIONS" ]]; then
    echo "## 🌍 Internationalization"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$TRANSLATIONS"
    echo ""
fi

# Documentation
if [[ -n "$DOCS" ]]; then
    echo "## 📚 Documentation"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$DOCS"
    echo ""
fi

# Dependencies
if [[ -n "$DEPS" ]]; then
    echo "## 📦 Dependencies"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$DEPS"
    echo ""
fi

# Contributors with GitHub usernames
echo "## 👥 Contributors"
echo ""
echo "Thanks to all the contributors who made this release possible:"
echo ""

# Get unique contributor emails and process them
git log "$COMPARISON_RANGE" --pretty=format:"%an|%ae" | sort | uniq | while IFS='|' read -r name email; do
    if [[ -n "$name" && -n "$email" ]]; then
        case "$email" in
            *@users.noreply.github.com)
                # GitHub no-reply email format
                github_user=$(echo "$email" | sed 's/@users.noreply.github.com$//' | sed 's/^[0-9]*+//')
                echo "- [@$github_user](https://github.com/$github_user)"
                ;;
            mustafagenc@*)
                echo "- [@mustafagenc](https://github.com/mustafagenc) ($name)"
                ;;
            *)
                # Try to get GitHub username from git config
                github_user=$(git config --get user.githubusername 2>/dev/null || echo "")
                if [[ -n "$github_user" ]]; then
                    echo "- [@$github_user](https://github.com/$github_user) ($name)"
                else
                    echo "- $name"
                fi
                ;;
        esac
    fi
done

echo ""

# Tech Stack Information
echo "## 🛠️ Tech Stack"
echo ""
echo "This release is built with:"
echo ""
echo "- ⚡ **Next.js 15** - React framework with App Router"
echo "- 🎨 **Tailwind CSS** - Utility-first CSS framework"
echo "- 🧩 **shadcn/ui** - Beautiful and accessible components"
echo "- 🔒 **NextAuth.js** - Authentication for Next.js"
echo "- 🗃️ **Prisma** - Next-generation ORM"
echo "- 🌍 **next-intl** - Internationalization"
echo "- 🧪 **Vitest** - Fast unit testing framework"
echo "- 🎭 **Playwright** - End-to-end testing"
echo "- 📦 **pnpm** - Fast, disk space efficient package manager"
echo ""

# Installation instructions
echo "## 🚀 Installation & Upgrade"
echo ""
echo "### For new projects:"
echo "\`\`\`bash"
echo "git clone https://github.com/nitrokit/nitrokit-nextjs.git"
echo "cd nitrokit-nextjs"
echo "git checkout $TAG"
echo "pnpm install"
echo "./scripts/dev-setup.sh"
echo "pnpm dev"
echo "\`\`\`"
echo ""
echo "### For existing projects:"
echo "\`\`\`bash"
echo "git pull origin main"
echo "git checkout $TAG"
echo "pnpm install --no-frozen-lockfile"
echo "pnpm prisma:generate"
echo "pnpm build  # Test build"
echo "\`\`\`"
echo ""

# Breaking changes warning
BREAKING_CHANGES=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="BREAKING" --grep="breaking change" --grep="major" -i)
if [[ -n "$BREAKING_CHANGES" ]]; then
    echo "## ⚠️ Breaking Changes"
    echo ""
    echo "🚨 **Important:** This release contains breaking changes. Please review carefully before upgrading."
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$BREAKING_CHANGES"
    echo ""
    echo "### Migration Guide"
    echo ""
    echo "1. Backup your current project"
    echo "2. Review the breaking changes above"
    echo "3. Update your code accordingly"
    echo "4. Run tests before deploying"
    echo ""
fi

# Security updates
SECURITY_UPDATES=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="security" --grep="vulnerability" --grep="CVE" --grep="audit" -i)
if [[ -n "$SECURITY_UPDATES" ]]; then
    echo "## 🔒 Security Updates"
    echo ""
    echo "🛡️ **Security patches included in this release:**"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$SECURITY_UPDATES"
    echo ""
    echo "**We recommend updating immediately to ensure your application remains secure.**"
    echo ""
fi

# Performance improvements
PERFORMANCE=$(git log "$COMPARISON_RANGE" --pretty=format:"%s" --grep="perf" --grep="performance" --grep="optimization" --grep="speed" -i)
if [[ -n "$PERFORMANCE" ]]; then
    echo "## ⚡ Performance Improvements"
    echo ""
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            echo "- $commit"
        fi
    done <<< "$PERFORMANCE"
    echo ""
fi

# Full changelog
echo "## 📝 Full Changelog"
echo ""
if [[ -n "$PREV_TAG" && "$PREV_TAG" != $(git rev-list --max-parents=0 HEAD) ]]; then
    echo "**Full Changelog**: https://github.com/nitrokit/nitrokit-nextjs/compare/$PREV_TAG...$TAG"
else
    echo "**Full Changelog**: https://github.com/nitrokit/nitrokit-nextjs/commits/$TAG"
fi
echo ""

# Additional information
echo "---"
echo ""
echo "### 🔗 Useful Links"
echo ""
echo "- 📖 **Documentation**: [README.md](https://github.com/nitrokit/nitrokit-nextjs#readme)"
echo "- 🛠️ **Development Scripts**: [scripts/README.md](https://github.com/nitrokit/nitrokit-nextjs/blob/main/scripts/README.md)"
echo "- 🐛 **Report Issues**: [GitHub Issues](https://github.com/nitrokit/nitrokit-nextjs/issues)"
echo "- 💬 **Discussions**: [GitHub Discussions](https://github.com/nitrokit/nitrokit-nextjs/discussions)"
echo "- 🌐 **Live Demo**: [Coming Soon](https://nitrokit-nextjs-preview.vercel.app/)"
echo ""
echo "### 🆘 Getting Help"
echo ""
echo "If you encounter any issues with this release:"
echo ""
echo "1. Check the [troubleshooting section](https://github.com/nitrokit/nitrokit-nextjs#troubleshooting)"
echo "2. Search [existing issues](https://github.com/nitrokit/nitrokit-nextjs/issues)"
echo "3. Run \`./scripts/dev-setup.sh\` to reset your development environment"
echo "4. Create a [new issue](https://github.com/nitrokit/nitrokit-nextjs/issues/new) with detailed information"
echo ""
echo "### 🎯 What's Next?"
echo ""
echo "Check out our [roadmap](https://github.com/nitrokit/nitrokit-nextjs/projects) to see what's coming in future releases!"
echo ""
echo "---"
echo ""
echo "**Happy coding with Nitrokit Next.js! 🚀✨**"