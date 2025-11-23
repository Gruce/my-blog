#!/usr/bin/env python3
"""
Fix GEW directory - handle the division slash issue and organize images
"""
import os
import shutil
from pathlib import Path

def main():
    # Try both possible directory names
    dir1 = Path("public/2025-gew-tafa3ul-hub")  # Regular slash
    dir2 = Path("public∕2025-gew-tafa3ul-hub")   # Division slash
    
    # Find which one actually exists and has files
    source_dir = None
    target_dir = dir1  # Use regular slash as target
    
    for d in [dir1, dir2]:
        if d.exists():
            images = list(d.glob("*.jpg")) + list(d.glob("*.jpeg")) + \
                    list(d.glob("*.png")) + list(d.glob("*.webp"))
            if images or any(d.iterdir()):
                if source_dir is None:
                    source_dir = d
                print(f"Found directory: {d} ({len(images)} images)")
    
    if source_dir is None:
        print("❌ No GEW directory found!")
        return
    
    if source_dir == target_dir:
        print(f"✓ Using directory: {source_dir}")
    else:
        print(f"⚠️  Source directory uses different character: {source_dir}")
        print(f"   Will consolidate to: {target_dir}")
    
    # Ensure target directory exists
    target_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"\n📂 Processing: {source_dir}")
    print("=" * 60)
    
    # Find all temp directories
    temp_dirs = [d for d in source_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
    
    # Get existing images in target
    existing_images = {f.name for f in list(target_dir.glob("*.jpg")) + list(target_dir.glob("*.jpeg")) + 
                      list(target_dir.glob("*.png")) + list(target_dir.glob("*.webp"))}
    
    # Also get images directly in source directory
    source_images = list(source_dir.glob("*.jpg")) + list(source_dir.glob("*.jpeg")) + \
                    list(source_dir.glob("*.png")) + list(source_dir.glob("*.webp"))
    
    print(f"📊 Images in source directory: {len(source_images)}")
    print(f"📊 Images already in target: {len(existing_images)}")
    print(f"📊 Temp directories: {len(temp_dirs)}")
    
    moved = 0
    skipped = 0
    
    # Move images from source directory to target
    for img_file in source_images:
        dest = target_dir / img_file.name
        if dest.exists() or img_file.name in existing_images:
            print(f"  ⚠️  {img_file.name} already exists, skipping")
            skipped += 1
        else:
            try:
                shutil.move(str(img_file), str(dest))
                existing_images.add(img_file.name)
                print(f"  ✓ Moved {img_file.name}")
                moved += 1
            except Exception as e:
                print(f"  ✗ Error moving {img_file.name}: {e}")
    
    # Process temp directories
    for temp_dir in temp_dirs:
        print(f"\n📁 Processing {temp_dir.name}...")
        
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
            dest = target_dir / img_file.name
            if dest.exists() or img_file.name in existing_images:
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
            for item in temp_dir.iterdir():
                if item.is_file():
                    item.unlink()
            temp_dir.rmdir()
            print(f"  ✓ Removed directory")
        except Exception as e:
            print(f"  ⚠️  Could not remove directory: {e}")
    
    # If source and target are different, try to remove source if empty
    if source_dir != target_dir:
        try:
            remaining = list(source_dir.iterdir())
            if not remaining:
                source_dir.rmdir()
                print(f"\n✓ Removed empty source directory")
            else:
                print(f"\n⚠️  Source directory still has {len(remaining)} item(s)")
        except:
            pass
    
    # Final count
    final_images = list(target_dir.glob("*.jpg")) + list(target_dir.glob("*.jpeg")) + \
                  list(target_dir.glob("*.png")) + list(target_dir.glob("*.webp"))
    remaining_dirs = [d for d in target_dir.iterdir() if d.is_dir() and d.name.startswith("temp_")]
    
    print("\n" + "=" * 60)
    print("✅ Cleanup Complete!")
    print(f"  ✓ Moved {moved} new image(s)")
    print(f"  ⚠️  Skipped {skipped} duplicate(s)")
    print(f"  📊 Total images in {target_dir}: {len(final_images)}")
    
    if remaining_dirs:
        print(f"  ⚠️  {len(remaining_dirs)} temp directory(ies) still exist")
    else:
        print(f"  ✓ All temp directories removed!")

if __name__ == "__main__":
    main()

