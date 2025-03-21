# Icon and Splash Screen Setup Guide

This guide will help you set up custom icons and splash screens for your Ionic iOS app.

## Directory Structure

Create the following directory structure in the `resources` folder:

```
resources/
├── icon.png         # Master icon file (1024x1024px)
├── splash.png       # Master splash screen file (2732x2732px)
├── ios/
    ├── icon/        # Generated iOS icons
    └── splash/      # Generated iOS splash screens
```

## Requirements

1. Icon Requirements:
   - Create a master icon.png (1024x1024 pixels)
   - PNG format with transparency
   - No rounded corners (iOS will mask it automatically)

2. Splash Screen Requirements:
   - Create a master splash.png (2732x2732 pixels)
   - PNG format
   - Center your artwork in a safe area (1200x1200px centered)
   - Use a background color that matches your app's theme

## Steps to Implement

1. Place your icon.png and splash.png files in the resources/ directory

2. Run the following commands to generate all required sizes:
   ```bash
   ionic cordova resources ios
   # or for Capacitor
   cordova-res ios --skip-config --copy
   ```

3. The resources will be automatically copied to the correct locations in your iOS project

4. Build and run your app:
   ```bash
   ionic build
   npx cap sync ios
   npx cap open ios
   ```

Note: Make sure your icon and splash screen files meet the size requirements for the best results. The system will automatically generate all necessary sizes for different iOS devices.