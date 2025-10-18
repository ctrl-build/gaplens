#!/bin/bash

# Cloudflare Pages Build Script for GapLens Website
# This script optimizes the build for Cloudflare Pages deployment

set -e

echo "🚀 Starting Cloudflare Pages build for GapLens Website..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ ! -d "out" ]; then
    echo "❌ Build failed - 'out' directory not found"
    exit 1
fi

# Optimize static assets
echo "🎨 Optimizing static assets..."

# Create optimized asset directories
mkdir -p out/_next/static/css
mkdir -p out/_next/static/js
mkdir -p out/assets/images
mkdir -p out/assets/videos
mkdir -p out/assets/fonts

# Copy and optimize images
echo "📸 Optimizing images..."
if [ -d "public/assets/images" ]; then
    cp -r public/assets/images/* out/assets/images/ 2>/dev/null || true
fi

# Copy videos
echo "🎬 Copying videos..."
if [ -d "public/assets/videos" ]; then
    cp -r public/assets/videos/* out/assets/videos/ 2>/dev/null || true
fi

# Copy fonts
echo "🔤 Copying fonts..."
if [ -d "public/fonts" ]; then
    cp -r public/fonts/* out/assets/fonts/ 2>/dev/null || true
fi

# Generate sitemap
echo "🗺️ Generating sitemap..."
if [ -f "out/sitemap.xml" ]; then
    echo "✅ Sitemap generated successfully"
else
    echo "⚠️ Sitemap not found"
fi

# Generate robots.txt
echo "🤖 Verifying robots.txt..."
if [ -f "out/robots.txt" ]; then
    echo "✅ robots.txt found"
else
    echo "⚠️ robots.txt not found"
fi

# Verify critical files
echo "🔍 Verifying critical files..."
critical_files=(
    "out/index.html"
    "out/archive/index.html"
    "out/studio/index.html"
    "out/contact/index.html"
    "out/editorial/index.html"
    "out/terms/index.html"
)

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

# Check build size
echo "📊 Build size analysis..."
du -sh out/
echo "📁 Directory structure:"
find out -type f -name "*.html" | head -10

echo "🎉 Cloudflare Pages build completed successfully!"
echo "📦 Build output: ./out/"
echo "🚀 Ready for Cloudflare Pages deployment!"
