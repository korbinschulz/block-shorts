// Block YouTube Shorts - Content Script

// Function to hide Shorts elements dynamically
function hideShorts() {
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
  
  // Hide Shorts shelf by checking for "Shorts" in the title
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

// Run on page load
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