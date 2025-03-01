#!/bin/bash

# Script for creating a new blog post
# Usage: ./create_post.sh "Post Title" "post-slug" "YYYY-MM-DD" "image1.jpg,image2.jpg,..."

# Check arguments
if [ $# -lt 4 ]; then
  echo "Usage: $0 \"Post Title\" \"post-slug\" \"YYYY-MM-DD\" \"image1.jpg,image2.jpg,...\""
  exit 1
fi

TITLE="$1"
SLUG="$2"
DATE="$3"
IMAGES="$4"

# Create directories
mkdir -p "static/posts/$SLUG/images"
echo "Directory created: static/posts/$SLUG/images"

# Process images
IFS=',' read -ra IMG_ARRAY <<< "$IMAGES"
for i in "${!IMG_ARRAY[@]}"; do
  IMG="${IMG_ARRAY[$i]}"
  # Check if image exists
  if [ -f "static/images/$IMG" ]; then
    # Generate name for the image
    NEW_NAME=$(echo "$SLUG-image-$((i+1))" | tr ' ' '-').jpg
    # Copy image
    cp "static/images/$IMG" "static/posts/$SLUG/images/$NEW_NAME"
    echo "Image copied: $IMG -> $NEW_NAME"
    # Delete original image
    rm "static/images/$IMG"
    echo "Original image deleted: $IMG"
  else
    echo "Error: Image $IMG not found in static/images/ directory"
  fi
done

# Create post template
cat > "content/posts/$SLUG.md" << EOF
---
title: "$TITLE"
date: $DATE
draft: false
tags: ["Tag1", "Tag2", "Tag3"]
categories: ["Category1", "Category2"]
description: "Brief description of the post"
---

# $TITLE

![Main Image](/posts/$SLUG/images/${SLUG}-image-1.jpg)

Introduction to the post...

## Section 1

Content of section 1...

## Section 2

Content of section 2...

## Conclusion

Concluding thoughts...

---

Questions or comments? Share them below!
EOF

echo "Post template created: content/posts/$SLUG.md"
echo "Don't forget to edit the metadata and content of the post!"

# Add files to Git
git add "content/posts/$SLUG.md" "static/posts/$SLUG/"
echo "Files added to Git"

echo "Done! Post created and ready for editing." 