# GitHub Pages Deployment Guide

## Quick Fix for 404 Error

The 404 error was caused by a mismatch between the repository name and the Vite base path configuration.

### What was fixed:

1. **Updated Vite Config**: Changed base path from `/3D-PRINTER-SUITE/3d-printer-suite/` to `/3D-PRINTER-MANAGER/3d-printer-suite/`
2. **Updated GitHub Actions**: Migrated to the newer `actions/deploy-pages` workflow
3. **Added .nojekyll**: Prevents Jekyll from processing the files
4. **Enhanced Build Script**: Added proper build preparation

## Current Configuration

- **Repository**: `3D-PRINTER-MANAGER`
- **Base Path**: `/3D-PRINTER-MANAGER/3d-printer-suite/`
- **Deployment URL**: `https://aidenfaulconer.github.io/3D-PRINTER-MANAGER/3d-printer-suite/`

## Deployment Process

### Automatic Deployment (Recommended)
1. Push changes to `main` or `master` branch
2. GitHub Actions will automatically build and deploy
3. Visit the deployment URL after completion

### Manual Deployment
```bash
# Build for GitHub Pages
yarn build:pages

# Deploy using gh-pages
yarn deploy
```

## Build Scripts

- `yarn build` - Standard build
- `yarn build:pages` - Build optimized for GitHub Pages
- `yarn deploy` - Build and deploy to GitHub Pages

## Troubleshooting

### Still getting 404?
1. Check that the repository name matches the base path in `vite.config.js`
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the deployment branch is set to `gh-pages`
4. Check the Actions tab for build errors

### Build Failures?
1. Check Node.js version (requires 18.5.0+)
2. Verify all dependencies are installed
3. Check for TypeScript or ESLint errors
4. Review the build logs in GitHub Actions

### Assets Not Loading?
1. Verify the base path in `vite.config.js` matches your repository structure
2. Check that all assets are included in the build
3. Ensure `.nojekyll` file is present in the dist directory

## File Structure

```
3d-printer-suite/
├── .github/workflows/deploy.yml    # GitHub Actions workflow
├── .nojekyll                      # Prevents Jekyll processing
├── vite.config.js                 # Vite configuration with base path
├── scripts/build-for-github-pages.js  # Build preparation script
└── dist/                          # Built files (created during build)
    ├── .nojekyll                  # Ensures proper serving
    ├── index.html                 # Main HTML file
    └── assets/                    # CSS, JS, and other assets
```

## GitHub Pages Settings

In your repository settings:
1. Go to **Pages** section
2. Source: **GitHub Actions**
3. The workflow will automatically deploy to `gh-pages` branch

## Support

If you continue to experience issues:
1. Check the GitHub Actions logs
2. Verify repository permissions
3. Ensure the workflow has the correct permissions
4. Review the deployment URL format