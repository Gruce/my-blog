#!/usr/bin/env python3
"""
Comprehensive cleanup script for GEW 2025 images
Moves all images from temp subdirectories to the main directory
"""
import os
import shutil
from pathlib import Path

def cleanup_all_images(base_path):
    """Clean up images in the given base path"""
    base_dir = Path(base_path)
    
    if not base_dir.exists():
        return 0, 0, []
    
    print(f"\n📂 Processing: {base_dir}")
    
    # Find all temp directories
    temp_dirs = [d for d in base_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
    
    # Count images already in main directory
    main_images = {f.name for f in list(base_dir.glob("*.jpg")) + list(base_dir.glob("*.jpeg")) + 
                   list(base_dir.glob("*.png")) + list(base_dir.glob("*.webp"))}
    
    moved_count = 0
    skipped_count = 0
    remaining_dirs = []
    
    for temp_dir in temp_dirs:
        print(f"  📁 {temp_dir.name}")
        
        # Find all image files in temp directory
        image_files = list(temp_dir.glob("*.jpg")) + list(temp_dir.glob("*.jpeg")) + \
                     list(temp_dir.glob("*.png")) + list(temp_dir.glob("*.webp"))
        
        if not image_files:
            # Remove empty directory
            try:
                temp_dir.rmdir()
                print(f"    ✓ Removed empty directory")
            except:
                pass
            continue
        
        print(f"    Found {len(image_files)} image(s)")
        
        for img_file in image_files:
            dest_path = base_dir / img_file.name
            
            if img_file.name in main_images or dest_path.exists():
                # Duplicate - remove from temp
                img_file.unlink()
                skipped_count += 1
            else:
                # Move to main directory
                try:
                    shutil.move(str(img_file), str(dest_path))
                    main_images.add(img_file.name)
                    moved_count += 1
                except Exception as e:
                    print(f"    ✗ Error moving {img_file.name}: {e}")
        
        # Clean up temp directory
        try:
            # Remove any remaining files
            for item in temp_dir.iterdir():
                if item.is_file():
                    item.unlink()
            temp_dir.rmdir()
            print(f"    ✓ Removed directory")
        except:
            remaining_dirs.append(temp_dir.name)
    
    return moved_count, skipped_count, remaining_dirs

def main():
    print("=" * 60)
    print("GEW 2025 Images Cleanup")
    print("=" * 60)
    
    # Try both possible paths
    paths_to_check = [
        "public/2025-gew-tafa3ul-hub",
        "/Users/macmasters/.cursor/worktrees/my-blog/0Hqv5/public/2025-gew-tafa3ul-hub"
    ]
    
    total_moved = 0
    total_skipped = 0
    all_remaining = []
    
    for path in paths_to_check:
        if Path(path).exists():
            moved, skipped, remaining = cleanup_all_images(path)
            total_moved += moved
            total_skipped += skipped
            all_remaining.extend(remaining)
    
    print("\n" + "=" * 60)
    print("Summary:")
    print(f"  ✓ Moved {total_moved} new image(s)")
    print(f"  ⚠️  Skipped {total_skipped} duplicate(s)")
    
    if all_remaining:
        print(f"\n⚠️  {len(all_remaining)} temp directory(ies) could not be removed:")
        for rd in all_remaining:
            print(f"    - {rd}")
    else:
        print("\n✓ All temp directories cleaned up!")
    
    # Final count
    for path in paths_to_check:
        base_dir = Path(path)
        if base_dir.exists():
            final_images = list(base_dir.glob("*.jpg")) + list(base_dir.glob("*.jpeg")) + \
                          list(base_dir.glob("*.png")) + list(base_dir.glob("*.webp"))
            final_dirs = [d for d in base_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
            print(f"\n📊 {path}:")
            print(f"   Images: {len(final_images)}")
            print(f"   Temp dirs: {len(final_dirs)}")

if __name__ == "__main__":
    main()

