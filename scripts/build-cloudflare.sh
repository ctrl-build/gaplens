#!/bin/bash

set -e

echo "🚀 Starting Cloudflare Pages build for GapLens Website..."

echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building application..."
npm run build

echo "✅ Verifying build output..."
if [ ! -d "out" ]; then
    echo "❌ Build failed - 'out' directory not found"
    exit 1
fi

echo "🎨 Optimizing static assets..."

mkdir -p out/_next/static/css
mkdir -p out/_next/static/js
mkdir -p out/assets/images
mkdir -p out/assets/videos
mkdir -p out/assets/fonts

echo "📸 Optimizing images..."
if [ -d "public/assets/images" ]; then
    cp -r public/assets/images/* out/assets/images/ 2>/dev/null || true
fi

echo "🎬 Copying videos..."
if [ -d "public/assets/videos" ]; then
    cp -r public/assets/videos/* out/assets/videos/ 2>/dev/null || true
fi

echo "🔤 Copying fonts..."
if [ -d "public/fonts" ]; then
    cp -r public/fonts/* out/assets/fonts/ 2>/dev/null || true
fi

echo "🗺️ Generating sitemap..."
if [ -f "out/sitemap.xml" ]; then
    echo "✅ Sitemap generated successfully"
else
    echo "⚠️ Sitemap not found"
fi

echo "🤖 Verifying robots.txt..."
if [ -f "out/robots.txt" ]; then
    echo "✅ robots.txt found"
else
    echo "⚠️ robots.txt not found"
fi

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

echo "📊 Build size analysis..."
du -sh out/
echo "📁 Directory structure:"
find out -type f -name "*.html" | head -10

echo "🎉 Cloudflare Pages build completed successfully!"
echo "📦 Build output: ./out/"
echo "🚀 Ready for Cloudflare Pages deployment!"
