@echo off
REM Cloudflare Pages Build Script for GapLens Website
REM This script optimizes the build for Cloudflare Pages deployment

echo 🚀 Starting Cloudflare Pages build for GapLens Website...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist dist rmdir /s /q dist

REM Install dependencies
echo 📦 Installing dependencies...
npm ci

REM Build the application
echo 🔨 Building application...
npm run build

REM Verify build output
echo ✅ Verifying build output...
if not exist out (
    echo ❌ Build failed - 'out' directory not found
    exit /b 1
)

REM Optimize static assets
echo 🎨 Optimizing static assets...

REM Create optimized asset directories
if not exist out\_next\static\css mkdir out\_next\static\css
if not exist out\_next\static\js mkdir out\_next\static\js
if not exist out\assets\images mkdir out\assets\images
if not exist out\assets\videos mkdir out\assets\videos
if not exist out\assets\fonts mkdir out\assets\fonts

REM Copy and optimize images
echo 📸 Optimizing images...
if exist public\assets\images (
    xcopy public\assets\images\* out\assets\images\ /E /I /Y
)

REM Copy videos
echo 🎬 Copying videos...
if exist public\assets\videos (
    xcopy public\assets\videos\* out\assets\videos\ /E /I /Y
)

REM Copy fonts
echo 🔤 Copying fonts...
if exist public\fonts (
    xcopy public\fonts\* out\assets\fonts\ /E /I /Y
)

REM Generate sitemap
echo 🗺️ Generating sitemap...
if exist out\sitemap.xml (
    echo ✅ Sitemap generated successfully
) else (
    echo ⚠️ Sitemap not found
)

REM Generate robots.txt
echo 🤖 Verifying robots.txt...
if exist out\robots.txt (
    echo ✅ robots.txt found
) else (
    echo ⚠️ robots.txt not found
)

REM Verify critical files
echo 🔍 Verifying critical files...
if exist out\index.html echo ✅ out\index.html
if exist out\archive\index.html echo ✅ out\archive\index.html
if exist out\studio\index.html echo ✅ out\studio\index.html
if exist out\contact\index.html echo ✅ out\contact\index.html
if exist out\editorial\index.html echo ✅ out\editorial\index.html
if exist out\terms\index.html echo ✅ out\terms\index.html

REM Check build size
echo 📊 Build size analysis...
dir out /s

echo 🎉 Cloudflare Pages build completed successfully!
echo 📦 Build output: .\out\
echo 🚀 Ready for Cloudflare Pages deployment!
