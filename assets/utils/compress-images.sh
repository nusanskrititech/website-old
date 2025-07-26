#!/bin/bash
# Compress all JPG, JPEG, PNG images and convert to WebP (lossless, visually lossless)
# Usage: bash assets/utils/compress-images.sh

set -e

# Check for required tools
for cmd in jpegoptim optipng cwebp; do
  if ! command -v $cmd &> /dev/null; then
    echo "Error: $cmd is not installed. Please install via 'brew install $cmd'"
    exit 1
  fi
done

# Compress JPG images (85% quality, strip metadata, progressive)
find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -exec jpegoptim --max=85 --strip-all --all-progressive {} +

# Compress PNG images (lossless, max optimization)
find . -type f -iname '*.png' -exec optipng -o7 {} +

# Convert all JPG, JPEG, PNG images to WebP (quality 85)
find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -exec sh -c 'cwebp -q 85 "$0" -o "${0%.*}.webp"' {} \;

echo "Image compression and WebP conversion complete!"
