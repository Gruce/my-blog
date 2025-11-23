#!/usr/bin/env python3
"""
Final cleanup - move all images from temp subdirectories to main directory
"""
import os
import shutil
from pathlib import Path

def main():
    base_dir = Path("public/2025-gew-tafa3ul-hub")
    
    if not base_dir.exists():
        print(f"❌ Directory {base_dir} does not exist!")
        return
    
    print(f"📂 Cleaning up: {base_dir}")
    print("=" * 60)
    
    # Find all temp directories
    temp_dirs = [d for d in base_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
    
    if not temp_dirs:
        print("✓ No temp directories found!")
        # Count images in main directory
        images = list(base_dir.glob("*.jpg")) + list(base_dir.glob("*.jpeg")) + \
                list(base_dir.glob("*.png")) + list(base_dir.glob("*.webp"))
        print(f"📊 Total images in main directory: {len(images)}")
        return
    
    print(f"Found {len(temp_dirs)} temp directory(ies):")
    for td in temp_dirs:
        print(f"  - {td.name}")
    
    moved = 0
    skipped = 0
    
    # Get existing images in main directory to check for duplicates
    existing_images = {f.name for f in list(base_dir.glob("*.jpg")) + list(base_dir.glob("*.jpeg")) + 
                     list(base_dir.glob("*.png")) + list(base_dir.glob("*.webp"))}
    
    print(f"\n📊 Images already in main directory: {len(existing_images)}")
    
    # Process each temp directory
    for temp_dir in temp_dirs:
        print(f"\n📁 Processing {temp_dir.name}...")
        
        # Find all image files
        image_files = list(temp_dir.glob("*.jpg")) + list(temp_dir.glob("*.jpeg")) + \
                     list(temp_dir.glob("*.png")) + list(temp_dir.glob("*.webp"))
        
        if not image_files:
            print("  ⚠️  No images found")
            try:
                temp_dir.rmdir()
                print("  ✓ Removed empty directory")
            except:
                pass
            continue
        
        print(f"  Found {len(image_files)} image(s)")
        
        for img_file in image_files:
            dest = base_dir / img_file.name
            
            if img_file.name in existing_images or dest.exists():
                print(f"  ⚠️  {img_file.name} already exists, removing duplicate")
                img_file.unlink()
                skipped += 1
            else:
                try:
                    shutil.move(str(img_file), str(dest))
                    existing_images.add(img_file.name)
                    print(f"  ✓ Moved {img_file.name}")
                    moved += 1
                except Exception as e:
                    print(f"  ✗ Error moving {img_file.name}: {e}")
        
        # Clean up temp directory
        try:
            # Remove any remaining files
            for item in temp_dir.iterdir():
                if item.is_file():
                    item.unlink()
            temp_dir.rmdir()
            print(f"  ✓ Removed directory")
        except Exception as e:
            print(f"  ⚠️  Could not remove directory: {e}")
    
    # Final count
    final_images = list(base_dir.glob("*.jpg")) + list(base_dir.glob("*.jpeg")) + \
                  list(base_dir.glob("*.png")) + list(base_dir.glob("*.webp"))
    remaining_dirs = [d for d in base_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
    
    print("\n" + "=" * 60)
    print("✅ Cleanup Complete!")
    print(f"  ✓ Moved {moved} new image(s)")
    print(f"  ⚠️  Skipped {skipped} duplicate(s)")
    print(f"  📊 Total images in main directory: {len(final_images)}")
    
    if remaining_dirs:
        print(f"  ⚠️  {len(remaining_dirs)} temp directory(ies) still exist")
    else:
        print(f"  ✓ All temp directories removed!")

if __name__ == "__main__":
    main()

