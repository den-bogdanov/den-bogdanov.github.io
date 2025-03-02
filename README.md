# Personal Blog

This repository contains the source code of my personal blog created with Hugo.

## Project Structure

- `content/` - blog content (posts, pages)
- `static/` - static files (images, CSS, JavaScript)
- `layouts/` - templates for displaying content
- `scripts/` - helper scripts for blog management

## Using Scripts

### Creating a New Post

To create a new post, use the `create_post.sh` script:

```bash
./scripts/create_post.sh "Post Title" "post-slug" "YYYY-MM-DD" "image1.jpg,image2.jpg,..."
```

For example:

```bash
./scripts/create_post.sh "DeepSeek Releases Version 3" "deepseek-v3" "2024-12-30" "image1.jpg,image2.jpg"
```

The script will perform the following actions:
1. Create a directory for post images
2. Copy specified images from `static/images/` to the post directory
3. Delete original images to save space
4. Create a post template with basic structure
5. Add files to Git

### Cleaning Up Duplicate Files

To clean up duplicate files and save disk space, use the `cleanup_duplicates.sh` script:

```bash
./scripts/cleanup_duplicates.sh                   # Check for duplicate images between static/images and static/posts
./scripts/cleanup_duplicates.sh --all             # Check for duplicates of all file types
./scripts/cleanup_duplicates.sh --between-posts   # Check for duplicates between different posts
./scripts/cleanup_duplicates.sh --replace-with-symlinks # Automatically replace duplicates with symbolic links
```

You can combine options, for example:
```bash
./scripts/cleanup_duplicates.sh --all --replace-with-symlinks # Replace all duplicate files with symbolic links
```

The script identifies duplicate files based on content comparison and can automatically replace them with symbolic links to save space.

## Running a Local Server

To run a local development server, use the command:

```bash
hugo server -D
```

The site will be available at http://localhost:1313/

## Building the Site

To build the static site, use the command:

```bash
hugo
```

The build result will be placed in the `public/` directory.

