#!/bin/bash

# i18n declaration generator script
# Generates type declaration file for next-intl modular structure

set -e

echo "🔄 Generating i18n declaration file..."

# Define paths
MODULES_PATH="./messages/en"
DECLARATION_FILE="./messages/declarations.json"

# Auto-discover modules by scanning the directory
MODULES=()
if [ -d "$MODULES_PATH" ]; then
    echo "📂 Scanning modules directory: $MODULES_PATH"
    for file in "$MODULES_PATH"/*.json; do
        if [ -f "$file" ]; then
            # Extract filename without path and extension
            module_name=$(basename "$file" .json)
            MODULES+=("$module_name")
            echo "🔍 Found module: $module_name"
        fi
    done
else
    echo "⚠️  Modules directory not found: $MODULES_PATH"
    echo "📁 Creating modules directory..."
    mkdir -p "$MODULES_PATH"
fi

# If no modules found, create default structure
if [ ${#MODULES[@]} -eq 0 ]; then
    echo "⚠️  No modules found, creating default modules..."
    DEFAULT_MODULES=("common" "auth" "dashboard" "account" "navigation" "errors" "home")
    for module in "${DEFAULT_MODULES[@]}"; do
        echo "{}" > "$MODULES_PATH/$module.json"
        MODULES+=("$module")
        echo "✨ Created default module: $module"
    done
fi

echo "📋 Total modules found: ${#MODULES[@]}"

# Create declaration object
DECLARATION="{"

# Process each module
for i in "${!MODULES[@]}"; do
    MODULE="${MODULES[$i]}"
    MODULE_FILE="$MODULES_PATH/$MODULE.json"
    
    # Add comma if not first item
    if [ $i -gt 0 ]; then
        DECLARATION="$DECLARATION,"
    fi
    
    # Check if module file exists
    if [ -f "$MODULE_FILE" ]; then
        echo "✅ Found module: $MODULE"
        # Add module content to declaration
        MODULE_CONTENT=$(cat "$MODULE_FILE")
        DECLARATION="$DECLARATION\"$MODULE\":$MODULE_CONTENT"
    else
        echo "⚠️  Module not found: $MODULE (creating empty object)"
        DECLARATION="$DECLARATION\"$MODULE\":{}"
    fi
done

DECLARATION="$DECLARATION}"

# Write declaration file with proper formatting
echo "$DECLARATION" | pnpm exec prettier --parser json --write --stdin-filepath "$DECLARATION_FILE"

echo "✅ Generated declaration file: $DECLARATION_FILE"
echo "🎉 i18n declaration generation completed!"