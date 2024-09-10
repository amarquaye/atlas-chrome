chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      const url = new URL(tab.url);
      const allowedHosts = ['chatgpt.com', 'gemini.google.com', 'claude.ai'];
      
      if (allowedHosts.some(host => url.hostname.includes(host))) {
        chrome.sidePanel.setOptions({ tabId, path: 'sidepanel.html', enabled: true });
      } else {
        chrome.sidePanel.setOptions({ tabId, enabled: false });
      }
    }
  });
  
  chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-side-panel") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.sidePanel.open({ tabId: tabs[0].id });
        }
      });
    }
  });
  