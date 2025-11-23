#!/usr/bin/env python3
"""
Script to download images from Instagram posts using instaloader
"""
import instaloader
import os
import sys
import shutil

def download_post_images(post_shortcodes, output_dir):
    """Download images from Instagram posts"""
    # Load session if available
    L = instaloader.Instaloader(
        download_pictures=True,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        post_metadata_txt_pattern='',
        max_connection_attempts=3
    )
    
    # Try to load session
    try:
        L.load_session_from_file('my.damn.space')
        print("Loaded existing session")
    except FileNotFoundError:
        print("No session found. Please login first with: instaloader --login my.damn.space")
        return 0
    
    os.makedirs(output_dir, exist_ok=True)
    
    downloaded_count = 0
    downloaded_files = []
    
    for shortcode in post_shortcodes:
        try:
            print(f"\nProcessing post: {shortcode}")
            
            # Try to load the post
            post = instaloader.Post.from_shortcode(L.context, shortcode)
            
            # Create a temporary directory for this post
            temp_dir = os.path.join(output_dir, f"temp_{shortcode}")
            os.makedirs(temp_dir, exist_ok=True)
            
            # Download the post to temp directory
            L.download_post(post, target=temp_dir)
            
            # Find downloaded image files
            if os.path.exists(temp_dir):
                files = [f for f in os.listdir(temp_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.webp'))]
                
                for i, file in enumerate(sorted(files), 1):
                    old_path = os.path.join(temp_dir, file)
                    # Create a better filename
                    new_name = f"gew-2025-{shortcode}"
                    if len(files) > 1:
                        new_name += f"-{i}"
                    # Preserve extension
                    ext = os.path.splitext(file)[1]
                    new_name += ext
                    new_path = os.path.join(output_dir, new_name)
                    
                    shutil.move(old_path, new_path)
                    print(f"  ✓ Downloaded: {new_name}")
                    downloaded_files.append(new_path)
                    downloaded_count += 1
                
                # Clean up temp directory
                try:
                    for file in os.listdir(temp_dir):
                        file_path = os.path.join(temp_dir, file)
                        if os.path.isfile(file_path):
                            os.remove(file_path)
                    os.rmdir(temp_dir)
                except:
                    pass
            else:
                print(f"  ✗ Post directory not created")
                
        except instaloader.exceptions.LoginRequiredException:
            print(f"  ✗ Login required for post {shortcode}")
        except instaloader.exceptions.PrivateProfileNotFollowedException:
            print(f"  ✗ Post {shortcode} is private")
        except instaloader.exceptions.ConnectionException as e:
            print(f"  ✗ Connection error for {shortcode}: {e}")
        except Exception as e:
            print(f"  ✗ Error downloading {shortcode}: {type(e).__name__}: {e}")
    
    print(f"\n\nDownloaded {downloaded_count} image(s) to {output_dir}/")
    
    if downloaded_files:
        print("\nDownloaded files:")
        for f in downloaded_files[:10]:  # Show first 10
            print(f"  - {os.path.basename(f)}")
        if len(downloaded_files) > 10:
            print(f"  ... and {len(downloaded_files) - 10} more")
    
    return downloaded_count

def main():
    # Extract shortcodes from URLs
    post_urls = [
        "https://www.instagram.com/p/DRZBK-zjR1-/",
        "https://www.instagram.com/p/DRXq_69DSU0/",
        "https://www.instagram.com/p/DRXo0-wjYyG/",
        "https://www.instagram.com/p/DRXoXP6DZCI/",
        "https://www.instagram.com/p/DRXnC81jSZV/",
        "https://www.instagram.com/p/DRXlxsojW3s/",
        "https://www.instagram.com/p/DRXfJdljTzG/",
        "https://www.instagram.com/p/DRWv8ZYjfWK/",
        "https://www.instagram.com/p/DRUxd7ija1E/",
        "https://www.instagram.com/p/DRUofgTDR6x/",
        "https://www.instagram.com/p/DRSSQYYDelq/",
        "https://www.instagram.com/p/DRSJfJPjQt9/",
        "https://www.instagram.com/p/DRNK-92jVEP/",
        "https://www.instagram.com/p/DRNDiLRjTjZ/",
        "https://www.instagram.com/p/DRM9HB2DZ_H/",
        "https://www.instagram.com/p/DRKd-iYjdfc/",
        "https://www.instagram.com/p/DRKd4OHDf0J/",
        "https://www.instagram.com/p/DRKAU2fjUQs/",
        "https://www.instagram.com/p/DRJ4mmEjcmi/",
        "https://www.instagram.com/p/DRHk_O1Dag-/",
        "https://www.instagram.com/p/DRHdFmtjeZR/",
        "https://www.instagram.com/p/DRFZo7wDZEN/",
        "https://www.instagram.com/p/DRFU8SHDbEH/",
        "https://www.instagram.com/p/DRATxAEjQYZ/",
        "https://www.instagram.com/p/DRACX9TDd5Q/",
        "https://www.instagram.com/p/DQ_4ZBpjTkc/",
        "https://www.instagram.com/p/DQ9QaamjTsz/",
        "https://www.instagram.com/p/DQ9GmSijSbB/",
        "https://www.instagram.com/p/DQ801JSDWw7/",
    ]
    
    # Extract shortcodes
    shortcodes = []
    for url in post_urls:
        shortcode = url.split('/p/')[-1].rstrip('/')
        shortcodes.append(shortcode)
    
    output_dir = "public/2025-gew-tafa3ul-hub"
    
    print(f"Attempting to download {len(shortcodes)} Instagram posts...")
    print(f"Output directory: {output_dir}")
    print()
    
    downloaded = download_post_images(shortcodes, output_dir)
    
    if downloaded == 0:
        print("\n⚠️  No images were downloaded.")
        print("\nTroubleshooting:")
        print("1. Make sure you're logged in: instaloader --login my.damn.space")
        print("2. Check if posts are public and accessible")
        print("3. Instagram may have rate limits - try again later")

if __name__ == "__main__":
    main()
