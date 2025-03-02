#!/bin/bash

# Script for cleaning up duplicate files across the project
# Usage:
#   ./cleanup_duplicates.sh                   - Check for duplicate images between static/images and static/posts
#   ./cleanup_duplicates.sh --all             - Check for duplicates of all file types
#   ./cleanup_duplicates.sh --between-posts   - Check for duplicates between different posts
#   ./cleanup_duplicates.sh --replace-with-symlinks - Replace duplicates with symbolic links

# Create a temporary directory for storing file information
temp_dir=$(mktemp -d)
trap 'rm -rf "$temp_dir"' EXIT

# Parse command line arguments
REPLACE_WITH_SYMLINKS=false

for arg in "$@"; do
  case $arg in
    --replace-with-symlinks)
      REPLACE_WITH_SYMLINKS=true
      ;;
  esac
done

# Function to check for duplicates between source and target directories
check_duplicates() {
    local source_dir=$1
    local target_dir=$2
    local file_pattern=$3
    
    echo "Comparing files between $source_dir and $target_dir..."
    
    # Find files in source directory
    find "$source_dir" -type f -name "$file_pattern" > "$temp_dir/source_files.txt"
    
    # Find files in target directory
    find "$target_dir" -type f -name "$file_pattern" > "$temp_dir/target_files.txt"
    
    # Check each file in source directory
    while IFS= read -r source_file; do
        # Get file size
        size=$(stat -f "%z" "$source_file")
        
        # Check each file in target directory with the same size
        while IFS= read -r target_file; do
            target_size=$(stat -f "%z" "$target_file")
            
            if [ "$size" -eq "$target_size" ]; then
                # Compare file contents
                if cmp -s "$source_file" "$target_file"; then
                    echo "Duplicate found:"
                    echo "  $source_file"
                    echo "  $target_file"
                    
                    if [ "$REPLACE_WITH_SYMLINKS" = true ]; then
                        echo "Replacing with symbolic link..."
                        # Create backup
                        cp "$source_file" "${source_file}.bak"
                        # Remove original
                        rm "$source_file"
                        # Create symbolic link
                        ln -s "$(realpath "$target_file")" "$source_file"
                        echo "Created symbolic link: $source_file -> $(realpath "$target_file")"
                    else
                        echo "Consider replacing one with a symbolic link to save space"
                    fi
                fi
            fi
        done < "$temp_dir/target_files.txt"
    done < "$temp_dir/source_files.txt"
}

# Function to check for duplicates between different posts
check_duplicates_between_posts() {
    local posts_dir="static/posts"
    local file_pattern=$1
    
    # Get list of post directories
    find "$posts_dir" -mindepth 1 -maxdepth 1 -type d | sort > "$temp_dir/post_dirs.txt"
    
    # Compare each post with others
    while IFS= read -r post1; do
        post1_name=$(basename "$post1")
        
        while IFS= read -r post2; do
            post2_name=$(basename "$post2")
            
            # Skip comparing a post with itself
            if [ "$post1" != "$post2" ]; then
                echo "Comparing posts: $post1_name <-> $post2_name"
                
                # Find files in first post
                find "$post1" -type f -name "$file_pattern" > "$temp_dir/post1_files.txt"
                
                # Find files in second post
                find "$post2" -type f -name "$file_pattern" > "$temp_dir/post2_files.txt"
                
                # Check each file in first post
                while IFS= read -r file1; do
                    # Get file size
                    size1=$(stat -f "%z" "$file1")
                    
                    # Check each file in second post with the same size
                    while IFS= read -r file2; do
                        size2=$(stat -f "%z" "$file2")
                        
                        if [ "$size1" -eq "$size2" ]; then
                            # Compare file contents
                            if cmp -s "$file1" "$file2"; then
                                echo "Duplicate found between posts:"
                                echo "  $file1"
                                echo "  $file2"
                                
                                if [ "$REPLACE_WITH_SYMLINKS" = true ]; then
                                    echo "Replacing with symbolic link..."
                                    # Create backup
                                    cp "$file1" "${file1}.bak"
                                    # Remove original
                                    rm "$file1"
                                    # Create symbolic link
                                    ln -s "$(realpath "$file2")" "$file1"
                                    echo "Created symbolic link: $file1 -> $(realpath "$file2")"
                                else
                                    echo "Consider replacing one with a symbolic link to save space"
                                fi
                            fi
                        fi
                    done < "$temp_dir/post2_files.txt"
                done < "$temp_dir/post1_files.txt"
            fi
        done < "$temp_dir/post_dirs.txt"
    done < "$temp_dir/post_dirs.txt"
}

# Function to check if a file exists in any post directory
check_file_in_posts() {
    local file=$1
    local file_name=$(basename "$file")
    
    echo "Checking $file..."
    
    # Find all files with the same name in posts directories
    find "static/posts" -type f -name "$file_name" > "$temp_dir/matching_files.txt"
    
    # If no files found with the same name, it's not a duplicate
    if [ ! -s "$temp_dir/matching_files.txt" ]; then
        echo "File $file is not found in post directories, keeping it"
        return 1
    fi
    
    # Check each matching file for content match
    while IFS= read -r post_file; do
        if cmp -s "$file" "$post_file"; then
            echo "File $file is a duplicate of $post_file"
            
            if [ "$REPLACE_WITH_SYMLINKS" = true ]; then
                echo "Replacing with symbolic link..."
                # Create backup
                cp "$file" "${file}.bak"
                # Remove original
                rm "$file"
                # Create symbolic link
                ln -s "$(realpath "$post_file")" "$file"
                echo "Created symbolic link: $file -> $(realpath "$post_file")"
            else
                echo "Consider replacing with a symbolic link to save space"
            fi
            return 0
        fi
    done < "$temp_dir/matching_files.txt"
    
    # If we got here, no content match was found
    echo "File $file has the same name but different content from files in posts, keeping it"
    return 1
}

echo "Starting duplicate file cleanup..."

# Define file types
image_pattern="*.jpg *.jpeg *.png *.gif *.webp"
video_pattern="*.mp4 *.webm *.mov *.avi"
document_pattern="*.pdf *.doc *.docx *.txt *.md"

if [[ "$*" == *"--between-posts"* ]]; then
    echo "Checking for duplicates between posts..."
    check_duplicates_between_posts "*"
elif [[ "$*" == *"--all"* ]]; then
    echo "Checking all file types..."
    
    echo "Checking images..."
    for pattern in $image_pattern; do
        for file in $(find "static/images" -type f -name "$pattern" 2>/dev/null); do
            check_file_in_posts "$file"
        done
    done
    
    echo "Checking videos..."
    for pattern in $video_pattern; do
        for file in $(find "static/videos" -type f -name "$pattern" 2>/dev/null); do
            check_file_in_posts "$file"
        done
    done
    
    echo "Checking documents..."
    for pattern in $document_pattern; do
        for file in $(find "static/documents" -type f -name "$pattern" 2>/dev/null); do
            check_file_in_posts "$file"
        done
    done
else
    # Default behavior: check for duplicate images between static/images and static/posts
    echo "Checking for duplicate images..."
    for pattern in $image_pattern; do
        check_duplicates "static/images" "static/posts" "$pattern"
    done
fi

echo "Cleanup completed!" 