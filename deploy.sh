#!/bin/bash
# Deployment Instructions for Remoteok

echo "========================================="
echo "Remoteok Deployment Guide"
echo "========================================="

echo ""
echo "STEP 1: Create a GitHub Repository"
echo "-----------------------------------"
echo "1. Go to https://github.com/new"
echo "2. Enter 'remoteok' as repository name"
echo "3. Make it PUBLIC"
echo "4. Do NOT initialize with README"
echo "5. Click 'Create repository'"
echo ""

echo "STEP 2: Push to GitHub"
echo "-----------------------------------"
echo "Run these commands in your terminal:"
echo ""
echo "  git remote add origin https://github.com/YOUR_USERNAME/remoteok.git"
echo "  git branch -M master"
echo "  git push -u origin master"
echo ""

echo "STEP 3: Deploy to Vercel"
echo "-----------------------------------"
echo "1. Go to https://vercel.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New Project'"
echo "4. Import 'remoteok' repository"
echo "5. Click 'Deploy'"
echo ""

echo "========================================="
echo "Your app will be live at:"
echo "https://your-project.vercel.app"
echo "========================================="
