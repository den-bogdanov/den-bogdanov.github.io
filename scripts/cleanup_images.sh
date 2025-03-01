#!/bin/bash

# Script for cleaning up duplicate images
# Usage: ./cleanup_images.sh

echo "Starting image check in static/images directory..."

# Create temporary directory
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Check all images in static/images directory
find static/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r image; do
  image_basename=$(basename "$image")
  
  # Skip system files
  if [[ "$image_basename" == .* ]]; then
    continue
  fi
  
  # Flag to track if duplicate was found
  rm -f "$TEMP_DIR/found"
  
  # Get original file size
  original_size=$(stat -f%z "$image")
  
  # Find files with the same size
  find static/posts -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r post_image; do
    # If sizes match, compare content
    if [ "$original_size" = "$(stat -f%z "$post_image")" ]; then
      if cmp -s "$image" "$post_image"; then
        echo "Duplicate found: $image_basename -> $(basename "$(dirname "$(dirname "$post_image")")")/$(basename "$(dirname "$post_image")")/$(basename "$post_image")"
        touch "$TEMP_DIR/found"
        # Delete original image
        echo "Removing duplicate image: $image"
        rm "$image"
        break
      fi
    fi
  done
  
  # If copy not found, report it
  if [ ! -f "$TEMP_DIR/found" ]; then
    echo "Image $image_basename not found in post directories, keeping it"
  fi
done

echo "Cleanup completed!" 