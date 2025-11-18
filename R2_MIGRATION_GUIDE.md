# Cloudflare R2 Migration Guide

This document explains the migration from local disk storage to Cloudflare R2 for all images in the portfolio.

## Overview

All images (project covers, screenshots, static assets) are now stored in Cloudflare R2 instead of on the local filesystem. This provides better scalability, reliability, and CDN capabilities.

## Setup Instructions

### 1. Create Cloudflare R2 Bucket

1. Log in to your Cloudflare dashboard
2. Navigate to R2 Object Storage
3. Create a new bucket (e.g., `portfolio-assets`)
4. Configure public access if needed, or use a custom domain

### 2. Get R2 Credentials

1. In the R2 dashboard, go to "Manage R2 API Tokens"
2. Create a new API token with read & write permissions
3. Note down:
   - Account ID
   - Access Key ID
   - Secret Access Key

### 3. Configure Environment Variables

Add the following to your `.env` or `.env.local` file:

```bash
# Cloudflare R2 Storage Configuration
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=your_r2_bucket_name
R2_PUBLIC_URL=https://your-bucket-url.r2.dev
NEXT_PUBLIC_R2_PUBLIC_URL=https://your-bucket-url.r2.dev
```

**Note:** The `NEXT_PUBLIC_` prefix is required for client-side access to the R2 URL.

### 4. Upload Existing Assets to R2

You'll need to manually upload your existing static assets to maintain the same structure:

```
R2 Bucket Structure:
├── logo.png
├── name.png
├── wave.svg
├── documents/
│   └── resume.pdf
└── uploads/
    ├── covers/
    ├── screenshots/
    └── general/
```

You can use the Cloudflare dashboard, AWS CLI, or the R2 API to upload these files.

#### Using AWS CLI

```bash
# Configure AWS CLI for R2
aws configure --profile r2
# Use your R2 Access Key ID and Secret Access Key
# Region: auto
# Endpoint: https://<account-id>.r2.cloudflarestorage.com

# Upload files
aws s3 cp public/logo.png s3://your-bucket-name/logo.png --profile r2 --endpoint-url https://<account-id>.r2.cloudflarestorage.com
aws s3 cp public/name.png s3://your-bucket-name/name.png --profile r2 --endpoint-url https://<account-id>.r2.cloudflarestorage.com
aws s3 cp public/wave.svg s3://your-bucket-name/wave.svg --profile r2 --endpoint-url https://<account-id>.r2.cloudflarestorage.com
aws s3 cp public/documents/resume.pdf s3://your-bucket-name/documents/resume.pdf --profile r2 --endpoint-url https://<account-id>.r2.cloudflarestorage.com

# Upload project images
aws s3 sync public/projects s3://your-bucket-name/projects --profile r2 --endpoint-url https://<account-id>.r2.cloudflarestorage.com
```

## How It Works

### Admin Panel

1. **Cover Images**: 
   - Use the FileUpload component to upload
   - Returns full R2 URL automatically
   - Can also manually enter URL

2. **Screenshots**:
   - Use the FileUpload component to upload each screenshot
   - Returns full R2 URL for each upload
   - Can also manually enter comma-separated URLs

3. **All uploads** are automatically stored in R2 with the following structure:
   - Cover images: `uploads/covers/<timestamp>-<random>.<ext>`
   - Screenshots: `uploads/screenshots/<timestamp>-<random>.<ext>`
   - General uploads: `uploads/general/<timestamp>-<random>.<ext>`

### Static Assets

Static assets (logo, name, wave, resume) are referenced using the `getAssetUrl()` utility function that:
- Returns R2 URL when `R2_PUBLIC_URL` is configured
- Falls back to local path in development if not configured

### Database

Project records store full R2 URLs in the database:
- `cover` field: Full R2 URL (e.g., `https://bucket.r2.dev/uploads/covers/123.png`)
- `screenshots` field: Array of full R2 URLs

## Development Mode

If R2 environment variables are not set, the application falls back to local paths:
- Static assets load from `/public` directory
- New uploads will fail (you need R2 configured to upload)

This allows development without R2 setup, but you'll need R2 for the admin panel to work.

## File Size Limits

Current upload limits:
- Maximum file size: 5MB
- Allowed types: JPG, JPEG, PNG, GIF, WEBP

These limits are enforced in the upload API route.

## Security

- R2 credentials are stored as environment variables (never committed to git)
- Upload endpoint requires admin authentication
- File type and size validation on upload
- CodeQL security scan passes with no alerts

## Migration Checklist

- [ ] Create Cloudflare R2 bucket
- [ ] Get R2 API credentials
- [ ] Configure environment variables
- [ ] Upload existing static assets (logo.png, name.png, wave.svg, resume.pdf)
- [ ] Upload existing project images to maintain same structure
- [ ] Test admin panel upload functionality
- [ ] Verify images load correctly on frontend
- [ ] Update existing project records in database if they have local paths

## Troubleshooting

### Images not loading

1. Check that `R2_PUBLIC_URL` or `NEXT_PUBLIC_R2_PUBLIC_URL` is set correctly
2. Verify the bucket has public read access or a custom domain configured
3. Check browser console for CORS errors
4. Verify Next.js image domains are configured in `next.config.ts`

### Upload fails

1. Check that all R2 environment variables are set
2. Verify R2 credentials have write permissions
3. Check file size (max 5MB)
4. Verify file type is allowed (images only)

### Static assets not loading

1. Ensure assets are uploaded to R2 bucket root
2. Check `NEXT_PUBLIC_R2_PUBLIC_URL` is set (client-side access)
3. Verify asset paths match exactly (case-sensitive)

## API Changes

### Upload API (`/api/admin/upload`)

**Before:**
- Saved files to local filesystem (`public/uploads/...`)
- Returned relative path (e.g., `/uploads/covers/file.png`)

**After:**
- Uploads files to R2
- Returns full R2 URL (e.g., `https://bucket.r2.dev/uploads/covers/file.png`)

### Project API

No changes needed - stores URLs as strings in database.

## Code Changes Summary

### New Files
- `lib/storage/r2-client.ts` - R2 storage client
- `lib/utils/assets.ts` - Asset URL utility

### Modified Files
- `app/api/admin/upload/route.ts` - Upload to R2
- `components/Navbar.tsx` - Use R2 for logo and resume
- `app/(with-navbar)/contact/page.tsx` - Use R2 for name image
- `app/(with-navbar)/home/Hero.tsx` - Use R2 for wave SVG
- `app/admin/projects/page.tsx` - Added screenshot upload UI
- `next.config.ts` - Added R2 image domains
- `.env.example` - Added R2 environment variables
- `package.json` - Added @aws-sdk/client-s3

## Future Enhancements

Potential improvements:
- Automatic image optimization/resizing on upload
- Image deletion when project is deleted
- Bulk upload for multiple screenshots
- Image CDN/caching configuration
- Automatic migration script for existing images
