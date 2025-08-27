// Block YouTube Shorts & Slop - Content Script

// Function to hide Shorts and other slop elements dynamically
function hideShorts() {
  // === BLOCK TWITTER/X VIDEO POSTS ===
  if (window.location.hostname === 'twitter.com' || window.location.hostname === 'x.com') {
    // Find all tweet articles
    const tweets = document.querySelectorAll('article[data-testid="tweet"]');
    tweets.forEach(tweet => {
      // Check if tweet contains video
      if (tweet.querySelector('[data-testid="videoPlayer"]') || 
          tweet.querySelector('[data-testid="videoComponent"]') ||
          tweet.querySelector('video')) {
        // Hide the entire tweet
        tweet.style.display = 'none';
        
        // Also hide the parent cell to prevent empty space
        const cellParent = tweet.closest('[data-testid="cellInnerDiv"]');
        if (cellParent) {
          cellParent.style.display = 'none';
        }
      }
    });
  }
  
  // Skip YouTube-specific hiding if not on YouTube
  if (!window.location.hostname.includes('youtube.com')) {
    return;
  }
  
  // === BLOCK YOUTUBE PLAYABLES (GAMES) ===
  // Hide sections containing YouTube Playables
  const playablesSections = document.querySelectorAll('ytm-rich-section-renderer, ytd-rich-section-renderer');
  playablesSections.forEach(section => {
    // Check for game cards or Playables title
    if (section.querySelector('mini-game-card-view-model') || 
        section.querySelector('.yt-mini-game-card-view-model') ||
        section.querySelector('a[href*="/playables"]')) {
      section.style.display = 'none';
    }
    
    // Check for "YouTube Playables" in title
    const titleElement = section.querySelector('h2 .yt-core-attributed-string');
    if (titleElement && titleElement.textContent.includes('YouTube Playables')) {
      section.style.display = 'none';
    }
    
    // Check for dismissal button (promotional content)
    if (section.querySelector('.icon-dismissal')) {
      section.style.display = 'none';
    }
  });
  
  // Hide Playables shelf specifically
  const playablesShelves = document.querySelectorAll('ytm-rich-shelf-renderer');
  playablesShelves.forEach(shelf => {
    const titleEl = shelf.querySelector('h2 .yt-core-attributed-string');
    if (titleEl && (titleEl.textContent.includes('YouTube Playables') || 
                    titleEl.textContent.includes('Games'))) {
      shelf.style.display = 'none';
    }
  });
  
  // Hide mini game cards directly
  const gameCards = document.querySelectorAll('mini-game-card-view-model, .yt-mini-game-card-view-model');
  gameCards.forEach(card => card.style.display = 'none');
  
  // === BLOCK OTHER SLOP (NEWS, TRENDING, ETC) ===
  const slopTitles = ['News', 'Breaking news', 'Trending', 'Live', 'Gaming'];
  const allSections = document.querySelectorAll('ytm-rich-section-renderer, ytd-rich-section-renderer, ytm-rich-shelf-renderer, ytd-rich-shelf-renderer');
  allSections.forEach(section => {
    const titleEl = section.querySelector('h2 .yt-core-attributed-string, span.yt-core-attributed-string');
    if (titleEl && slopTitles.some(slop => titleEl.textContent.includes(slop))) {
      section.style.display = 'none';
    }
  });
  
  // === ORIGINAL SHORTS BLOCKING ===
  // Hide mobile/responsive Shorts sections
  const mobileRichSections = document.querySelectorAll('ytm-rich-section-renderer');
  mobileRichSections.forEach(section => {
    // Check if section contains Shorts
    if (section.querySelector('.shortsLockupViewModelHost') || 
        section.querySelector('h2 .yt-core-attributed-string')?.textContent === 'Shorts') {
      section.style.display = 'none';
    }
  });
  
  // Hide grid shelf containing Shorts
  const gridShelves = document.querySelectorAll('grid-shelf-view-model');
  gridShelves.forEach(shelf => {
    if (shelf.querySelector('.shortsLockupViewModelHost')) {
      shelf.style.display = 'none';
    }
  });
  
  // Hide Shorts pivot bar items (mobile navigation)
  const pivotItems = document.querySelectorAll('ytm-pivot-bar-item-renderer');
  pivotItems.forEach(item => {
    if (item.querySelector('.pivot-shorts') || 
        item.querySelector('.yt-core-attributed-string')?.textContent === 'Shorts') {
      item.style.display = 'none';
    }
  });
  
  // Hide section headers with "Shorts" title
  const sectionHeaders = document.querySelectorAll('yt-section-header-view-model, yt-shelf-header-layout');
  sectionHeaders.forEach(header => {
    const titleText = header.querySelector('.yt-core-attributed-string')?.textContent;
    if (titleText === 'Shorts') {
      // Hide the entire parent section
      const parentSection = header.closest('ytm-rich-section-renderer') || 
                           header.closest('ytd-rich-shelf-renderer') ||
                           header.closest('grid-shelf-view-model');
      if (parentSection) {
        parentSection.style.display = 'none';
      }
    }
  });
  
  // Hide Shorts tab in sidebar - target the ytd-guide-entry-renderer that contains a[title="Shorts"]
  const shortsEntries = document.querySelectorAll('ytd-guide-entry-renderer');
  shortsEntries.forEach(entry => {
    if (entry.querySelector('a[title="Shorts"]')) {
      entry.style.display = 'none';
    }
  });
  
  // Hide Shorts in mini guide (collapsed sidebar)
  const miniGuideEntries = document.querySelectorAll('ytd-mini-guide-entry-renderer');
  miniGuideEntries.forEach(entry => {
    if (entry.querySelector('a[title="Shorts"]')) {
      entry.style.display = 'none';
    }
  });
  
  // Hide desktop Shorts shelf by checking for "Shorts" in the title
  const richShelves = document.querySelectorAll('ytd-rich-shelf-renderer');
  richShelves.forEach(shelf => {
    const titleElement = shelf.querySelector('span#title');
    if (titleElement && titleElement.textContent === 'Shorts') {
      shelf.style.display = 'none';
    }
    // Also hide if it contains Shorts lockup models
    if (shelf.querySelector('.shortsLockupViewModelHost')) {
      shelf.style.display = 'none';
    }
  });
  
  // Hide new Shorts lockup components
  const shortsLockups = document.querySelectorAll('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2');
  shortsLockups.forEach(el => el.style.display = 'none');
  
  // Hide reel shelf renderer
  const reelShelf = document.querySelectorAll('ytd-reel-shelf-renderer');
  reelShelf.forEach(el => el.style.display = 'none');
  
  // Hide individual Shorts videos in search and feeds
  const shortsVideos = document.querySelectorAll('a[href*="/shorts/"], a.reel-item-endpoint');
  shortsVideos.forEach(el => {
    // Find the parent video renderer element
    const videoRenderer = el.closest('ytd-video-renderer') || 
                         el.closest('ytd-grid-video-renderer') || 
                         el.closest('ytd-rich-item-renderer') ||
                         el.closest('ytd-compact-video-renderer');
    if (videoRenderer) videoRenderer.style.display = 'none';
  });
  
  // Hide reel items
  const reelItems = document.querySelectorAll('ytd-reel-item-renderer');
  reelItems.forEach(el => el.style.display = 'none');
}

// Determine which site we're on
const isTwitter = window.location.hostname === 'twitter.com' || window.location.hostname === 'x.com';
const isYouTube = window.location.hostname.includes('youtube.com');

// Run on page load with slight delay for dynamic content
if (isTwitter || isYouTube) {
  setTimeout(hideShorts, 100);
  hideShorts();
  
  // Set up observer for dynamically loaded content
  const observer = new MutationObserver(() => {
    hideShorts();
  });

  // Start observing when DOM is ready
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    // Wait for body to be available
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
}