# 🛠️ Scripts

Development and automation scripts for Nitrokit Next.js project.

## Available Scripts

### 🚀 Development Setup

```bash
./dev-setup.sh
```

Sets up the development environment, installs dependencies, and configures the database.

### 📦 Dependency Management

```bash
./dependency-updater.sh [OPTIONS]
```

Updates project dependencies with security checks and backup functionality.

**Options:**

- `--package-manager TYPE` - Use npm, yarn, or pnpm (default: auto)
- `--update-mode MODE` - safe, patch, minor, major, all (default: safe)
- `--dry-run` - Preview changes without applying
- `--security-check` - Enable vulnerability scanning

### 📝 Release Notes

```bash
./generate-release-notes.sh <tag-name>
```

Generates comprehensive release notes from git commit history.

**Example:**

```bash
./generate-release-notes.sh v1.2.0
```

### 🌍 i18n Declarations

```bash
./generate-i18n-declaration.sh
```

Generates TypeScript declarations for internationalization modules.

## Usage Examples

### Initial Setup

```bash
# Set up development environment
./dev-setup.sh

# Start development server
pnpm dev
```

### Update Dependencies

```bash
# Safe update with backup
./dependency-updater.sh

# Preview major updates
./dependency-updater.sh --update-mode major --dry-run

# Restore from backup
./dependency-updater.sh --restore 20250525_003649
```

### Generate Release

```bash
# Create release notes
./generate-release-notes.sh v1.0.0 > RELEASE_NOTES.md

# Update i18n types
./generate-i18n-declaration.sh
```

## Requirements

- **Node.js** (v18+)
- **pnpm** (recommended package manager)
- **Git** (for release notes)

## Notes

- All scripts are executable and include help documentation
- Scripts automatically detect project configuration
- Backup functionality available for dependency updates
- Cross-platform compatibility (macOS, Linux, Windows with WSL)
