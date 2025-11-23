#!/bin/bash
# Script to organize GEW 2025 images - move all from temp subdirectories to main directory

cd "$(dirname "$0")"
BASE_DIR="public/2025-gew-tafa3ul-hub"

if [ ! -d "$BASE_DIR" ]; then
    echo "Directory $BASE_DIR not found!"
    exit 1
fi

echo "Organizing images in $BASE_DIR..."
echo "=================================="

# Find all temp directories
TEMP_DIRS=$(find "$BASE_DIR" -type d -name "temp_*")

if [ -z "$TEMP_DIRS" ]; then
    echo "No temp directories found. All images are already organized."
    exit 0
fi

MOVED=0
SKIPPED=0

# Process each temp directory
for TEMP_DIR in $TEMP_DIRS; do
    echo ""
    echo "Processing: $(basename "$TEMP_DIR")"
    
    # Move all image files from temp directory to main directory
    find "$TEMP_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | while read IMG_FILE; do
        FILENAME=$(basename "$IMG_FILE")
        DEST="$BASE_DIR/$FILENAME"
        
        if [ -f "$DEST" ]; then
            echo "  ⚠️  $FILENAME already exists, removing duplicate"
            rm "$IMG_FILE"
            SKIPPED=$((SKIPPED + 1))
        else
            mv "$IMG_FILE" "$DEST"
            echo "  ✓ Moved $FILENAME"
            MOVED=$((MOVED + 1))
        fi
    done
    
    # Remove temp directory if empty
    if [ -d "$TEMP_DIR" ] && [ -z "$(ls -A "$TEMP_DIR")" ]; then
        rmdir "$TEMP_DIR"
        echo "  ✓ Removed empty directory"
    else
        # Remove any remaining files and try again
        rm -f "$TEMP_DIR"/*
        rmdir "$TEMP_DIR" 2>/dev/null && echo "  ✓ Removed directory" || echo "  ⚠️  Could not remove directory"
    fi
done

echo ""
echo "=================================="
echo "Summary:"
echo "  ✓ Moved $MOVED image(s)"
echo "  ⚠️  Skipped $SKIPPED duplicate(s)"

# Count final images
FINAL_COUNT=$(find "$BASE_DIR" -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | wc -l | tr -d ' ')
echo "  📊 Total images in main directory: $FINAL_COUNT"

# Check for remaining temp directories
REMAINING=$(find "$BASE_DIR" -type d -name "temp_*" | wc -l | tr -d ' ')
if [ "$REMAINING" -gt 0 ]; then
    echo "  ⚠️  $REMAINING temp directory(ies) still exist"
else
    echo "  ✓ All temp directories removed!"
fi

