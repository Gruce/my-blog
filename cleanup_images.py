#!/usr/bin/env python3
"""
Clean up Instagram images - move all images from temp directories to main directory
"""
import os
import shutil
from pathlib import Path

def cleanup_images():
    base_dir = Path("public/2025-gew-tafa3ul-hub")
    
    if not base_dir.exists():
        print(f"Directory {base_dir} does not exist!")
        return
    
    print(f"Cleaning up images in {base_dir}")
    print("=" * 60)
    
    # Find all temp directories
    temp_dirs = [d for d in base_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
    
    # Count images already in main directory
    main_images = list(base_dir.glob("*.jpg")) + list(base_dir.glob("*.jpeg")) + list(base_dir.glob("*.png")) + list(base_dir.glob("*.webp"))
    print(f"\nImages already in main directory: {len(main_images)}")
    
    if not temp_dirs:
        print("\n✓ No temp directories found. All images are in the main directory.")
        return
    
    print(f"\nFound {len(temp_dirs)} temp directories:")
    for td in temp_dirs:
        print(f"  - {td.name}")
    
    moved_count = 0
    skipped_count = 0
    
    for temp_dir in temp_dirs:
        print(f"\n📁 Processing {temp_dir.name}...")
        
        # Find all image files in temp directory
        image_files = list(temp_dir.glob("*.jpg")) + list(temp_dir.glob("*.jpeg")) + list(temp_dir.glob("*.png")) + list(temp_dir.glob("*.webp"))
        
        if not image_files:
            print(f"  ⚠️  No images found")
            # Try to remove empty directory
            try:
                temp_dir.rmdir()
                print(f"  ✓ Removed empty directory")
            except:
                pass
            continue
        
        print(f"  Found {len(image_files)} image(s)")
        
        # Check if files already exist in main directory
        for img_file in image_files:
            dest_path = base_dir / img_file.name
            
            if dest_path.exists():
                print(f"  ⚠️  {img_file.name} already exists, removing duplicate from temp")
                # Remove from temp directory since it's already in main
                img_file.unlink()
                skipped_count += 1
            else:
                # Move to main directory
                try:
                    shutil.move(str(img_file), str(dest_path))
                    print(f"  ✓ Moved {img_file.name}")
                    moved_count += 1
                except Exception as e:
                    print(f"  ✗ Error moving {img_file.name}: {e}")
        
        # Remove temp directory if empty or only has non-image files
        try:
            remaining = list(temp_dir.iterdir())
            if not remaining:
                temp_dir.rmdir()
                print(f"  ✓ Removed empty directory")
            else:
                # Remove any remaining files (metadata, etc.)
                for item in remaining:
                    if item.is_file():
                        item.unlink()
                # Try to remove directory again
                try:
                    temp_dir.rmdir()
                    print(f"  ✓ Removed directory after cleaning")
                except:
                    print(f"  ⚠️  Could not remove directory (may not be empty)")
        except Exception as e:
            print(f"  ⚠️  Could not remove directory: {e}")
    
    print("\n" + "=" * 60)
    print(f"✓ Cleanup complete!")
    print(f"  - Moved {moved_count} new image(s) to main directory")
    print(f"  - Skipped {skipped_count} duplicate(s)")
    
    # Count total images in main directory
    final_images = list(base_dir.glob("*.jpg")) + list(base_dir.glob("*.jpeg")) + list(base_dir.glob("*.png")) + list(base_dir.glob("*.webp"))
    print(f"  - Total images in main directory: {len(final_images)}")
    
    # Check for remaining temp directories
    remaining_dirs = [d for d in base_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
    if remaining_dirs:
        print(f"\n⚠️  Warning: {len(remaining_dirs)} temp directory(ies) still exist:")
        for rd in remaining_dirs:
            print(f"    - {rd.name}")

if __name__ == "__main__":
    cleanup_images()
