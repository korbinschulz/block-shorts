// Block YouTube Shorts - Content Script

// Function to hide Shorts elements dynamically
function hideShorts() {
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