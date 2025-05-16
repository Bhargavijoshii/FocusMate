function cleanHost(hostname) {
  return hostname.replace(/^www\./i, '').toLowerCase();
}

const host = cleanHost(window.location.hostname);

function checkAndBlock() {
  chrome.storage.local.get(
    ['blockedSites', 'temporaryUnblocks', 'focusSession'],
    ({ blockedSites = [], temporaryUnblocks = {}, focusSession }) => {
      const now = Date.now();
      const isBlocked = blockedSites.includes(host);
      const isUnblockedNow = temporaryUnblocks[host] && now < temporaryUnblocks[host];
      const isFocusMode = focusSession === true;

      if (isBlocked && (!isUnblockedNow || isFocusMode)) {
        document.documentElement.innerHTML = `
          <body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#0d47a1;color:white;font-family:sans-serif;text-align:center;">
            <div>
              <h1>⚠️ Stay Focused!</h1>
              <p>This site is blocked${isFocusMode ? " during your focus session" : ""}.</p>
            </div>
          </body>
        `;
      }
    }
  );
}

// Check immediately and then every second
checkAndBlock();
setInterval(checkAndBlock, 1000);
