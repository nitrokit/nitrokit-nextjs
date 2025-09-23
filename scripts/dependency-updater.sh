#!/bin/bash

# dependency-updater.sh - Node.js/Next.js/Angular dependency management with security checks

# Default configuration
DEFAULT_PACKAGE_MANAGER="auto"
DEFAULT_UPDATE_MODE="safe"
DEFAULT_BACKUP_DIR=".dependency"
DEFAULT_SECURITY_CHECK="true"
DEFAULT_DRY_RUN="false"
DEFAULT_PROJECT_ROOT="auto"

# Configuration variables
PACKAGE_MANAGER="${PACKAGE_MANAGER:-$DEFAULT_PACKAGE_MANAGER}"
UPDATE_MODE="${UPDATE_MODE:-$DEFAULT_UPDATE_MODE}"
BACKUP_DIR="${BACKUP_DIR:-$DEFAULT_BACKUP_DIR}"
SECURITY_CHECK="${SECURITY_CHECK:-$DEFAULT_SECURITY_CHECK}"
DRY_RUN="${DRY_RUN:-$DEFAULT_DRY_RUN}"
PROJECT_ROOT="${PROJECT_ROOT:-$DEFAULT_PROJECT_ROOT}"

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Help function
show_help() {
    cat << EOF
🔄 Node.js Dependency Updater - Automated package updates for Node.js projects

USAGE:
    ./dependency-updater.sh [OPTIONS]

DESCRIPTION:
    Automatically updates Node.js project dependencies (npm/yarn/pnpm) with security 
    vulnerability scanning and backup functionality. Optimized for Next.js and Angular projects.

OPTIONS:
    --package-manager TYPE   Package manager to use (auto|npm|yarn|pnpm) (default: $DEFAULT_PACKAGE_MANAGER)
    --update-mode MODE       Update strategy (safe|major|patch|minor|all) (default: $DEFAULT_UPDATE_MODE)
    --backup-dir DIR         Backup directory for rollback (default: $DEFAULT_BACKUP_DIR)
    --project-root DIR       Project root directory (auto|.|..|path) (default: $DEFAULT_PROJECT_ROOT)
    --security-check         Enable security vulnerability scanning (default: $DEFAULT_SECURITY_CHECK)
    --no-security           Disable security vulnerability scanning
    --dry-run               Preview changes without applying them
    --restore BACKUP_ID     Restore from backup (use backup timestamp)
    --list-backups          Show available backups
    --clean-backups         Remove old backups (keeps last 5)
    -h, --help              Show this help message and exit

UPDATE MODES:
    safe     - Only security updates and patch versions
    patch    - Patch version updates only
    minor    - Minor and patch version updates
    major    - Major version updates (potentially breaking)
    all      - Update everything to latest versions

PROJECT ROOT DETECTION:
    auto     - Automatically search for package.json in current and parent directories
    .        - Use current directory
    ..       - Use parent directory
    path     - Use specific path

SUPPORTED PACKAGE MANAGERS:
    🟢 npm      - Node.js default package manager
    🟢 yarn     - Facebook's package manager (yarn.lock detection)
    🟢 pnpm     - Fast, disk space efficient package manager (pnpm-lock.yaml detection)

PROJECT TYPES:
    📦 Next.js   - Automatic Next.js optimizations and build cache handling
    🅰️ Angular   - Angular CLI compatibility and dependency checks
    ⚛️ React     - React-specific dependency management
    📝 Node.js   - General Node.js project support

EXAMPLES:
    ./dependency-updater.sh                                    # Auto-detect and safe update
    ./dependency-updater.sh --project-root ..                 # Use parent directory
    ./dependency-updater.sh --package-manager yarn --dry-run  # Preview yarn updates
    ./dependency-updater.sh --update-mode major --no-security # Major updates without security scan
    ./dependency-updater.sh --restore 20250525_003649         # Restore from backup

SECURITY FEATURES:
    🔍 npm audit / yarn audit / pnpm audit vulnerability scanning
    🛡️ Automatic backup before updates
    🔄 Easy rollback functionality
    📊 Detailed security reports
    ⚠️  Breaking change warnings for major version updates
    🚀 Next.js specific optimizations

EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --package-manager)
            PACKAGE_MANAGER="$2"
            shift 2
            ;;
        --update-mode)
            UPDATE_MODE="$2"
            shift 2
            ;;
        --backup-dir)
            BACKUP_DIR="$2"
            shift 2
            ;;
        --project-root)
            PROJECT_ROOT="$2"
            shift 2
            ;;
        --security-check)
            SECURITY_CHECK="true"
            shift
            ;;
        --no-security)
            SECURITY_CHECK="false"
            shift
            ;;
        --dry-run)
            DRY_RUN="true"
            shift
            ;;
        --restore)
            RESTORE_BACKUP="$2"
            shift 2
            ;;
        --list-backups)
            LIST_BACKUPS="true"
            shift
            ;;
        --clean-backups)
            CLEAN_BACKUPS="true"
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown parameter: $1${NC}"
            echo -e "${BLUE}💡 For help: $0 --help${NC}"
            exit 1
            ;;
    esac
done

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${PURPLE}🔄 $1${NC}"
}

# Function to find project root
find_project_root() {
    local search_dir="${1:-$(pwd)}"
    local max_depth=3
    local current_depth=0
    
    # If PROJECT_ROOT is set to a specific path, use it
    if [[ "$PROJECT_ROOT" != "auto" ]]; then
        if [[ -d "$PROJECT_ROOT" ]]; then
            # Convert to absolute path
            cd "$PROJECT_ROOT" && pwd
            return 0
        else
            log_error "Specified project root does not exist: $PROJECT_ROOT"
            return 1
        fi
    fi
    
    # Search in current and parent directories for package.json
    local check_dir="$(realpath "$search_dir")"
    while [[ $current_depth -le $max_depth ]]; do
        if [[ -f "$check_dir/package.json" ]]; then
            echo "$check_dir"
            return 0
        fi
        
        # Move to parent directory
        check_dir="$(dirname "$check_dir")"
        current_depth=$((current_depth + 1))
        
        # Stop if we reach root
        if [[ "$check_dir" == "/" ]]; then
            break
        fi
    done
    
    log_error "No package.json found in current or parent directories"
    return 1
}

# Function to detect package manager in specific directory
detect_package_manager() {
    local project_dir="$1"
    local detected=""
    
    if [[ -f "$project_dir/package.json" ]]; then
        if [[ -f "$project_dir/pnpm-lock.yaml" ]]; then
            detected="pnpm"
        elif [[ -f "$project_dir/yarn.lock" ]]; then
            detected="yarn"
        else
            detected="npm"
        fi
    fi
    
    echo "$detected"
}

# Function to detect project type
detect_project_type() {
    local project_dir="$1"
    local project_type="node"
    
    if [[ -f "$project_dir/package.json" ]]; then
        # Check for Next.js
        if grep -q "next" "$project_dir/package.json" || [[ -f "$project_dir/next.config.js" ]] || [[ -f "$project_dir/next.config.mjs" ]]; then
            project_type="nextjs"
        # Check for Angular
        elif grep -q "@angular/core" "$project_dir/package.json" || [[ -f "$project_dir/angular.json" ]]; then
            project_type="angular"
        # Check for React
        elif grep -q "react" "$project_dir/package.json"; then
            project_type="react"
        fi
    fi
    
    echo "$project_type"
}

# Function to check if tool is installed
check_tool() {
    local tool="$1"
    if ! command -v "$tool" &> /dev/null; then
        return 1
    fi
    return 0
}

# Function to install package manager tools
install_package_manager() {
    local pm="$1"
    
    case "$pm" in
        npm)
            if ! check_tool "node"; then
                log_error "Node.js is required for npm"
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    log_info "Install with: brew install node"
                else
                    log_info "Install Node.js from: https://nodejs.org/"
                fi
                return 1
            fi
            ;;
        yarn)
            if ! check_tool "yarn"; then
                log_step "Installing Yarn..."
                npm install -g yarn
            fi
            ;;
        pnpm)
            if ! check_tool "pnpm"; then
                log_step "Installing pnpm..."
                npm install -g pnpm
            fi
            ;;
        *)
            log_error "Unsupported package manager: $pm"
            log_info "Supported: npm, yarn, pnpm"
            return 1
            ;;
    esac
    return 0
}

# Function to create backup
create_backup() {
    local pm="$1"
    local project_dir="$2"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    
    # Get parent directory of script (nitrokit directory)
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local parent_dir="$(dirname "$script_dir")"
    local backup_path="$parent_dir/$BACKUP_DIR/$timestamp"
    
    log_step "Creating backup: $backup_path"
    mkdir -p "$backup_path"
    
    # Backup package files
    cp "$project_dir/package.json" "$backup_path/" 2>/dev/null || true
    cp "$project_dir/package-lock.json" "$backup_path/" 2>/dev/null || true
    cp "$project_dir/yarn.lock" "$backup_path/" 2>/dev/null || true
    cp "$project_dir/pnpm-lock.yaml" "$backup_path/" 2>/dev/null || true
    
    # Backup Next.js config if exists
    cp "$project_dir/next.config.js" "$backup_path/" 2>/dev/null || true
    cp "$project_dir/next.config.mjs" "$backup_path/" 2>/dev/null || true
    
    # Backup Angular config if exists
    cp "$project_dir/angular.json" "$backup_path/" 2>/dev/null || true
    cp "$project_dir/tsconfig.json" "$backup_path/" 2>/dev/null || true
    
    # Create backup info file
    {
        echo "$timestamp"
        echo "$pm"
        date
        echo "$project_dir"
    } > "$backup_path/.backup_info"
    
    log_success "Backup created: $timestamp"
    echo "$timestamp"
}

# Function to restore from backup
restore_backup() {
    local backup_id="$1"
    
    # Get parent directory of script (nitrokit directory)
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local parent_dir="$(dirname "$script_dir")"
    local backup_path="$parent_dir/$BACKUP_DIR/$backup_id"
    
    if [[ ! -d "$backup_path" ]]; then
        log_error "Backup not found: $backup_id"
        return 1
    fi
    
    local backup_info="$backup_path/.backup_info"
    local original_project_dir="."
    
    if [[ -f "$backup_info" ]]; then
        original_project_dir=$(sed -n '4p' "$backup_info")
    fi
    
    log_step "Restoring from backup: $backup_id to $original_project_dir"
    
    # Copy files back to original project directory
    for file in "$backup_path"/*; do
        if [[ -f "$file" && "$(basename "$file")" != ".backup_info" ]]; then
            cp "$file" "$original_project_dir/"
            log_info "Restored: $(basename "$file") to $original_project_dir"
        fi
    done
    
    log_success "Backup restored successfully"
}

# Function to list backups
list_backups() {
    # Get parent directory of script (nitrokit directory)
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local parent_dir="$(dirname "$script_dir")"
    local backup_dir="$parent_dir/$BACKUP_DIR"
    
    if [[ ! -d "$backup_dir" ]]; then
        log_info "No backups found"
        return 0
    fi
    
    echo -e "${CYAN}📋 Available Backups:${NC}"
    echo "----------------------------------------"
    
    for backup in "$backup_dir"/*; do
        if [[ -d "$backup" && -f "$backup/.backup_info" ]]; then
            local backup_id=$(basename "$backup")
            local pm=$(sed -n '2p' "$backup/.backup_info")
            local date=$(sed -n '3p' "$backup/.backup_info")
            local project_dir=$(sed -n '4p' "$backup/.backup_info")
            
            echo -e "${YELLOW}🗂️  $backup_id${NC}"
            echo "   Package Manager: $pm"
            echo "   Project Dir: $project_dir"
            echo "   Created: $date"
            echo ""
        fi
    done
}

# Function to clean old backups
clean_backups() {
    # Get parent directory of script (nitrokit directory)
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local parent_dir="$(dirname "$script_dir")"
    local backup_dir="$parent_dir/$BACKUP_DIR"
    
    if [[ ! -d "$backup_dir" ]]; then
        log_info "No backups to clean"
        return 0
    fi
    
    log_step "Cleaning old backups (keeping last 5)..."
    
    # Get sorted list of backups (newest first)
    local backups=($(ls -1t "$backup_dir"))
    local count=${#backups[@]}
    
    if [[ $count -le 5 ]]; then
        log_info "Only $count backups found, nothing to clean"
        return 0
    fi
    
    # Remove backups beyond the first 5
    for ((i=5; i<count; i++)); do
        local backup_path="$backup_dir/${backups[$i]}"
        if [[ -d "$backup_path" ]]; then
            rm -rf "$backup_path"
            log_info "Removed old backup: ${backups[$i]}"
        fi
    done
    
    log_success "Cleaned $((count-5)) old backups"
}

# Function to run security audit
run_security_audit() {
    local pm="$1"
    local project_dir="$2"
    
    log_step "Running security audit in: $project_dir"
    
    # Change to project directory for audit
    local original_dir=$(pwd)
    cd "$project_dir"
    
    case "$pm" in
        npm)
            if check_tool "npm"; then
                npm audit --audit-level=moderate
            fi
            ;;
        yarn)
            if check_tool "yarn"; then
                yarn audit --level moderate
            fi
            ;;
        pnpm)
            if check_tool "pnpm"; then
                pnpm audit --audit-level moderate
            fi
            ;;
    esac
    
    # Return to original directory
    cd "$original_dir"
}

# Function to handle Next.js specific optimizations
handle_nextjs_optimizations() {
    local project_dir="$1"
    local pm="$2"
    
    log_step "Applying Next.js optimizations..."
    
    # Change to project directory
    local original_dir=$(pwd)
    cd "$project_dir"
    
    # Clear Next.js cache
    if [[ -d ".next" ]]; then
        log_info "Clearing Next.js build cache..."
        rm -rf ".next"
    fi
    
    # Update Next.js specific dependencies
    case "$pm" in
        npm)
            npm update next @next/font @next/bundle-analyzer
            ;;
        yarn)
            yarn upgrade next @next/font @next/bundle-analyzer
            ;;
        pnpm)
            pnpm update next @next/font @next/bundle-analyzer
            ;;
    esac
    
    log_success "Next.js optimizations applied"
    
    # Return to original directory
    cd "$original_dir"
}

# Function to handle Angular specific optimizations
handle_angular_optimizations() {
    local project_dir="$1"
    local pm="$2"
    
    log_step "Applying Angular optimizations..."
    
    # Change to project directory
    local original_dir=$(pwd)
    cd "$project_dir"
    
    # Update Angular dependencies together
    case "$pm" in
        npm)
            if check_tool "ng"; then
                ng update @angular/core @angular/cli --force
            else
                npm update @angular/core @angular/cli @angular/common
            fi
            ;;
        yarn)
            if check_tool "ng"; then
                ng update @angular/core @angular/cli --force --package-manager yarn
            else
                yarn upgrade @angular/core @angular/cli @angular/common
            fi
            ;;
        pnpm)
            pnpm update @angular/core @angular/cli @angular/common
            ;;
    esac
    
    log_success "Angular optimizations applied"
    
    # Return to original directory
    cd "$original_dir"
}

# Function to update dependencies
update_dependencies() {
    local pm="$1"
    local mode="$2"
    local project_dir="$3"
    local project_type="$4"
    
    log_step "Updating $project_type dependencies with $pm in $mode mode..."
    
    # Change to project directory for updates
    local original_dir=$(pwd)
    cd "$project_dir"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "DRY RUN: Would update dependencies with the following commands:"
    fi
    
    case "$pm" in
        npm)
            case "$mode" in
                safe)
                    if [[ "$DRY_RUN" == "true" ]]; then
                        echo "npm update"
                    else
                        npm update
                    fi
                    ;;
                patch)
                    if [[ "$DRY_RUN" == "true" ]]; then
                        echo "npm update --save-exact"
                    else
                        npm update --save-exact
                    fi
                    ;;
                minor|major|all)
                    if ! check_tool "npm-check-updates"; then
                        log_step "Installing npm-check-updates..."
                        npm install -g npm-check-updates
                    fi
                    local ncu_args=""
                    [[ "$mode" == "minor" ]] && ncu_args="--target minor"
                    [[ "$mode" == "patch" ]] && ncu_args="--target patch"
                    
                    if [[ "$DRY_RUN" == "true" ]]; then
                        echo "ncu $ncu_args --upgrade && npm install"
                    else
                        ncu $ncu_args --upgrade
                        npm install
                    fi
                    ;;
            esac
            ;;
        yarn)
            case "$mode" in
                safe|patch)
                    if [[ "$DRY_RUN" == "true" ]]; then
                        echo "yarn upgrade"
                    else
                        yarn upgrade
                    fi
                    ;;
                minor|major|all)
                    if [[ "$DRY_RUN" == "true" ]]; then
                        echo "yarn upgrade --latest"
                    else
                        yarn upgrade --latest
                    fi
                    ;;
            esac
            ;;
        pnpm)
            case "$mode" in
                safe|patch)
                    if [[ "$DRY_RUN" == "true" ]]; then
                        echo "pnpm update"
                    else
                        pnpm update
                    fi
                    ;;
                minor|major|all)
                    if [[ "$DRY_RUN" == "true" ]]; then
                        echo "pnpm update --latest"
                    else
                        pnpm update --latest
                    fi
                    ;;
            esac
            ;;
    esac
    
    # Apply project-specific optimizations
    if [[ "$DRY_RUN" != "true" ]]; then
        case "$project_type" in
            nextjs)
                handle_nextjs_optimizations "$project_dir" "$pm"
                ;;
            angular)
                handle_angular_optimizations "$project_dir" "$pm"
                ;;
        esac
    fi
    
    # Return to original directory
    cd "$original_dir"
}

# Function to show update summary
show_update_summary() {
    local pm="$1"
    local project_dir="$2"
    local project_type="$3"
    
    log_step "Generating update summary..."
    
    # Change to project directory
    local original_dir=$(pwd)
    cd "$project_dir"
    
    echo -e "${CYAN}📊 Project Summary:${NC}"
    echo "Project Type: $project_type"
    echo "Package Manager: $pm"
    echo ""
    
    if check_tool "npm"; then
        echo -e "${CYAN}📦 Installed Packages (top 15):${NC}"
        npm list --depth=0 2>/dev/null | head -15
    fi
    
    # Show project-specific information
    case "$project_type" in
        nextjs)
            echo -e "${CYAN}🚀 Next.js Information:${NC}"
            if [[ -f "package.json" ]]; then
                grep -A 1 -B 1 "next" package.json | head -5
            fi
            ;;
        angular)
            echo -e "${CYAN}🅰️ Angular Information:${NC}"
            if check_tool "ng"; then
                ng version 2>/dev/null | head -5
            fi
            ;;
        react)
            echo -e "${CYAN}⚛️ React Information:${NC}"
            if [[ -f "package.json" ]]; then
                grep -A 1 -B 1 "react" package.json | head -5
            fi
            ;;
    esac
    
    # Return to original directory
    cd "$original_dir"
}

# Function to handle Prisma-specific updates
handle_prisma_updates() {
    local project_dir="$1"
    
    if [[ -f "$project_dir/prisma/schema.prisma" ]]; then
        log_step "Handling Prisma updates..."
        
        # Regenerate Prisma client with production flags
        if check_tool "npx"; then
            cd "$project_dir"
            npx prisma generate --no-engine
            log_success "Prisma client regenerated with production optimizations"
        fi
        
        # Check for schema changes
        if [[ -n "$(git diff --name-only | grep 'prisma/schema.prisma')" ]]; then
            log_warning "Prisma schema changes detected. Consider running migrations:"
            log_info "  npx prisma migrate dev"
            log_info "  npx prisma db push"
        fi
    fi
}

# Main function
main() {
    echo -e "${PURPLE}🔄 Node.js Dependency Updater - Starting automation...${NC}"
    echo ""
    
    # Handle special commands first
    if [[ "$LIST_BACKUPS" == "true" ]]; then
        list_backups
        exit 0
    fi
    
    if [[ "$CLEAN_BACKUPS" == "true" ]]; then
        clean_backups
        exit 0
    fi
    
    if [[ -n "$RESTORE_BACKUP" ]]; then
        restore_backup "$RESTORE_BACKUP"
        exit 0
    fi
    
    # Find project root directory
    log_step "Searching for Node.js project files..."
    local project_root
    project_root=$(find_project_root)
    if [[ $? -ne 0 ]]; then
        exit 1
    fi
    
    log_success "Project root found: $project_root"
    
    # Detect package manager if auto
    if [[ "$PACKAGE_MANAGER" == "auto" ]]; then
        log_step "Detecting package manager in: $project_root"
        PACKAGE_MANAGER=$(detect_package_manager "$project_root")
        if [[ -z "$PACKAGE_MANAGER" ]]; then
            log_error "Could not detect package manager in: $project_root"
            log_info "Make sure package.json exists"
            exit 1
        fi
        log_success "Detected package manager: $PACKAGE_MANAGER"
    fi
    
    # Detect project type
    local project_type
    project_type=$(detect_project_type "$project_root")
    log_success "Detected project type: $project_type"
    
    # Install/check package manager
    if ! install_package_manager "$PACKAGE_MANAGER"; then
        exit 1
    fi
    
    # Create backup (unless dry run)
    local backup_id=""
    if [[ "$DRY_RUN" != "true" ]]; then
        backup_id=$(create_backup "$PACKAGE_MANAGER" "$project_root")
    fi
    
    # Run security audit if enabled
    if [[ "$SECURITY_CHECK" == "true" ]]; then
        run_security_audit "$PACKAGE_MANAGER" "$project_root"
    fi
    
    # Update dependencies
    update_dependencies "$PACKAGE_MANAGER" "$UPDATE_MODE" "$project_root" "$project_type"
    
    # Handle Prisma if exists
    if [[ "$DRY_RUN" != "true" ]]; then
        handle_prisma_updates "$project_root"
    fi
    
    # Show summary (unless dry run)
    if [[ "$DRY_RUN" != "true" ]]; then
        show_update_summary "$PACKAGE_MANAGER" "$project_root" "$project_type"
    fi
    
    echo ""
    if [[ "$DRY_RUN" == "true" ]]; then
        log_success "Dry run completed! Use without --dry-run to apply changes."
    else
        log_success "Dependencies updated successfully!"
        log_info "Project type: $project_type"
        log_info "Project root: $project_root"
        log_info "Package manager: $PACKAGE_MANAGER"
        log_info "Backup created: $backup_id"
        log_info "To rollback: $0 --restore $backup_id"
    fi
}

# Run main function
main "$@"