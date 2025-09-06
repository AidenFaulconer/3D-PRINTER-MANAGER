#!/bin/bash

# Build the project
echo "Building project..."
yarn build

# Create .nojekyll file for GitHub Pages
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# Add all files to git
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Push to main branch
echo "Pushing to main branch..."
git push origin main

# Deploy to gh-pages branch
echo "Deploying to GitHub Pages..."
npx gh-pages -d dist

echo "Deployment complete!"
