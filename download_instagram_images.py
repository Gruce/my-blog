#!/usr/bin/env python3
"""
Script to download images from Instagram posts
"""
import requests
import re
import json
import sys
import os
from urllib.parse import urlparse, parse_qs
import time

def extract_image_urls_from_post(post_url):
    """Extract image URLs from an Instagram post"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
        }
        
        response = requests.get(post_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Try to find JSON data in the page
        html = response.text
        
        # Look for JSON-LD or embedded JSON
        json_pattern = r'<script type="application/ld\+json">(.*?)</script>'
        json_matches = re.findall(json_pattern, html, re.DOTALL)
        
        # Also try to find window._sharedData
        shared_data_pattern = r'window\._sharedData\s*=\s*({.*?});'
        shared_data_match = re.search(shared_data_pattern, html, re.DOTALL)
        
        image_urls = []
        
        # Try to extract from JSON-LD
        for json_str in json_matches:
            try:
                data = json.loads(json_str)
                if isinstance(data, dict) and 'image' in data:
                    if isinstance(data['image'], str):
                        image_urls.append(data['image'])
                    elif isinstance(data['image'], list):
                        image_urls.extend([img for img in data['image'] if isinstance(img, str)])
            except:
                pass
        
        # Try to extract from _sharedData
        if shared_data_match:
            try:
                data = json.loads(shared_data_match.group(1))
                # Navigate through the data structure
                if 'entry_data' in data:
                    entry_data = data['entry_data']
                    for key in entry_data:
                        if isinstance(entry_data[key], list) and len(entry_data[key]) > 0:
                            post_data = entry_data[key][0]
                            if 'graphql' in post_data:
                                media = post_data['graphql'].get('shortcode_media', {})
                                if 'display_url' in media:
                                    image_urls.append(media['display_url'])
                                if 'edge_sidecar_to_children' in media:
                                    edges = media['edge_sidecar_to_children'].get('edges', [])
                                    for edge in edges:
                                        node = edge.get('node', {})
                                        if 'display_url' in node:
                                            image_urls.append(node['display_url'])
            except:
                pass
        
        # Fallback: try to find image URLs in HTML
        if not image_urls:
            img_pattern = r'<meta property="og:image" content="([^"]+)"'
            img_matches = re.findall(img_pattern, html)
            image_urls.extend(img_matches)
        
        return list(set(image_urls))  # Remove duplicates
        
    except Exception as e:
        print(f"Error extracting from {post_url}: {e}")
        return []

def download_image(url, output_path):
    """Download an image from a URL"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        }
        response = requests.get(url, headers=headers, timeout=30, stream=True)
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def main():
    # Instagram post URLs
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
    
    output_dir = "public/2025-gew-tafa3ul-hub"
    os.makedirs(output_dir, exist_ok=True)
    
    downloaded_count = 0
    
    for i, post_url in enumerate(post_urls, 1):
        print(f"\nProcessing post {i}/{len(post_urls)}: {post_url}")
        
        # Extract shortcode from URL
        shortcode = post_url.split('/p/')[-1].rstrip('/')
        
        image_urls = extract_image_urls_from_post(post_url)
        
        if not image_urls:
            print(f"  No images found in {post_url}")
            continue
        
        print(f"  Found {len(image_urls)} image(s)")
        
        for j, img_url in enumerate(image_urls):
            # Determine file extension
            ext = 'jpg'
            if '.webp' in img_url.lower():
                ext = 'webp'
            elif '.png' in img_url.lower():
                ext = 'png'
            
            filename = f"gew-2025-post-{shortcode}"
            if len(image_urls) > 1:
                filename += f"-{j+1}"
            filename += f".{ext}"
            
            output_path = os.path.join(output_dir, filename)
            
            if download_image(img_url, output_path):
                print(f"  ✓ Downloaded: {filename}")
                downloaded_count += 1
            else:
                print(f"  ✗ Failed to download: {filename}")
        
        # Be polite - wait between requests
        time.sleep(2)
    
    print(f"\n\nDownloaded {downloaded_count} image(s) to {output_dir}/")

if __name__ == "__main__":
    main()

