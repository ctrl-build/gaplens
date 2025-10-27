# Image Optimization Guide for GapLens Website

## Current Situation

The website is currently using PNG and JPEG formats for all images. To improve performance and loading times, we need to convert these to modern formats like WebP.

## Why Convert to WebP?

- **30-50% smaller file sizes** compared to PNG/JPEG
- **Faster page loads** and better user experience
- **Reduced bandwidth** consumption
- **Better SEO** scores from PageSpeed Insights

## Images That Need Conversion

### Project Images (Currently PNG)
- `/public/assets/images/projects/project-1/` (5 images)
- `/public/assets/images/projects/project-2/` (5 images)
- `/public/assets/images/projects/project-3/` (5 images)
- `/public/assets/images/projects/project-4/` (6 images)
- `/public/assets/images/projects/project-5/` (6 images)
- `/public/assets/images/projects/project-6/` (7 images)

### Homepage Images (Currently PNG)
- `/public/assets/images/project-1.png`
- `/public/assets/images/project-2.png`
- `/public/assets/images/project-3.png`
- `/public/assets/images/interlude.png`

### Archive Thumbnails
- Various PNG files referenced in components

## How to Convert Images

### Option 1: Using Online Converter (Recommended)
1. Visit https://cloudconvert.com/png-to-webp
2. Upload your PNG files
3. Set quality to 85-90%
4. Download WebP versions
5. Replace PNG files with WebP versions

### Option 2: Using Command Line Tool
```bash
# Install cwebp (WebP encoder)
# Windows: Download from https://developers.google.com/speed/webp/download

# Convert single image
cwebp -q 85 input.png -o output.webp

# Batch convert all PNG files in directory
for %f in (*.png) do cwebp -q 85 "%f" -o "%~nf.webp"
```

### Option 3: Using ImageMagick
```bash
# Install ImageMagick
# Windows: Download from https://imagemagick.org/script/download.php

# Convert single image
magick convert input.png -quality 85 output.webp

# Batch convert
magick mogrify -format webp -quality 85 *.png
```

## Steps to Implement

1. **Backup Original Images**
   ```bash
   cp -r public/assets/images public/assets/images-backup
   ```

2. **Convert to WebP**
   - Use one of the methods above
   - Convert all PNG files to WebP format
   - Keep quality between 85-90%

3. **Update Image References**
   - Change `.png` extensions to `.webp` in code
   - Update `ProjectDetailClient.tsx`
   - Update `ArchiveClient.tsx`
   - Update all component files

4. **Test**
   - Run `npm run build`
   - Test locally
   - Verify images load correctly

5. **Deploy**
   - Push to GitHub
   - Deploy to Cloudflare Pages

## Files That Need Code Updates

### Primary Files:
- `src/components/ProjectDetailClient.tsx` - Project images
- `src/components/ArchiveClient.tsx` - Archive thumbnails
- `src/components/FeaturedWork.tsx` - Homepage project images
- `src/components/Project2.tsx` - Project 2 images
- `src/components/Project3.tsx` - Project 3 images
- `src/components/ThematicInterlude.tsx` - Interlude image
- `src/components/Hero.tsx` - Hero video poster
- `src/app/editorial/[id]/page.tsx` - Editorial images
- `src/components/EditorialClient.tsx` - Editorial thumbnails

## Example Code Change

**Before:**
```tsx
backgroundImage: `url('/assets/images/projects/project-1/1-1.png')`
```

**After:**
```tsx
backgroundImage: `url('/assets/images/projects/project-1/1-1.webp')`
```

## Browser Support

WebP is supported by:
- Chrome (since version 23)
- Firefox (since version 65)
- Edge (since version 18)
- Safari (since version 14)
- Opera (since version 12.1)

**Fallback:** If you need to support older browsers, you can use the `<picture>` element or provide PNG fallbacks.

## Expected Results

After conversion:
- **File sizes reduced by 30-50%**
- **Page load time improved by 1-2 seconds**
- **Better PageSpeed Insights score**
- **Reduced bandwidth costs**

## Priority Order

1. **High Priority:** Project detail images (most visible)
2. **Medium Priority:** Homepage featured images
3. **Low Priority:** Archive thumbnails and interlude images

## Monitoring

After deployment:
- Check PageSpeed Insights score
- Monitor Core Web Vitals
- Verify image quality looks good
- Check browser console for errors

---

**Note:** Next.js image optimization is disabled (`unoptimized: true`) because we're using static export. Cloudflare Pages will handle the serving, but the conversion to WebP needs to be done manually during the build process.

