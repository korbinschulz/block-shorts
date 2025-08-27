# Block Shorts & Slop - Chrome Extension

A Chrome extension that removes distracting content from YouTube and Twitter/X.

## Features

### YouTube
- Removes Shorts from homepage, search, and channel pages
- Hides the Shorts tab in the sidebar  
- Blocks YouTube Playables (games) section
- Removes promotional content with dismiss buttons
- Filters out News, Trending, and Gaming sections

### Twitter/X
- Hides all posts containing videos
- Keeps text-only and image posts visible
- Works on both twitter.com and x.com

## Installation

### From Chrome Web Store
(Coming soon)

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `block-shorts` folder
6. The extension will be installed and active immediately

## How It Works

This extension uses CSS and JavaScript injection to hide unwanted content:
- CSS rules with `:has()` selectors for efficient hiding
- JavaScript for dynamic content detection
- MutationObserver to catch newly loaded content
- No data collection or external requests

## Compatibility

- Chrome/Chromium browsers (v88+)
- Edge (Chromium-based)
- Brave Browser
- Other Chromium-based browsers

## Troubleshooting

**Content still appearing?**
- Refresh the page
- Make sure the extension is enabled in `chrome://extensions/`
- Sites may have updated their layout - check for extension updates

**Site looks broken?**
- Disable the extension temporarily to check if it's causing issues
- Report any problems via GitHub Issues

**Twitter videos not being hidden?**
- Make sure you're on twitter.com or x.com
- Some embedded videos might use different structures
- Try refreshing the page

## Privacy

This extension:
- Does NOT collect any user data
- Does NOT track your browsing
- Does NOT require any account or login
- Works entirely locally in your browser

## Contributing

Feel free to submit issues or pull requests if you find bugs or have improvements.

## License

MIT License - See LICENSE file for details

## Support

If you find this extension helpful, consider starring the repository on GitHub!