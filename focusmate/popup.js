document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('siteInput');
  const addBtn = document.getElementById('addBtn');
  const unblockBtn = document.getElementById('tempUnblockBtn');
  const minutesDropdown = document.getElementById('unblockMinutes');
  const list = document.getElementById('blockedList');
  const timeDisplay = document.getElementById('timeDisplay');
  const startBtn = document.getElementById('startTimerBtn');
  const resetBtn = document.getElementById('resetTimerBtn');

  let timerInterval = null;
  const sessionLength = 0.5 * 60 * 1000; // 30 seconds

  function refreshList() {
    chrome.storage.local.get(['blockedSites'], (result) => {
      const sites = result.blockedSites || [];
      list.innerHTML = '';
      sites.forEach(site => {
        const li = document.createElement('li');
        li.textContent = site;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
          const newList = sites.filter(s => s !== site);
          chrome.storage.local.set({ blockedSites: newList }, refreshList);
        };
        li.appendChild(removeBtn);
        list.appendChild(li);
      });
    });
  }

  function updateTimerDisplay() {
    chrome.storage.local.get(['timerStart', 'focusSession'], ({ timerStart, focusSession }) => {
      if (!focusSession || !timerStart) {
        timeDisplay.textContent = "00:30";
        return;
      }
      const elapsed = Date.now() - timerStart;
      let remaining = sessionLength - elapsed;

      if (remaining <= 0) {
        chrome.storage.local.set({ focusSession: false, timerStart: null });
        clearInterval(timerInterval);
        timeDisplay.textContent = "00:30";
        alert("Focus session complete!");
      } else {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    });
  }

  function startFocusSession() {
    chrome.storage.local.set({
      focusSession: true,
      timerStart: Date.now()
    }, () => {
      updateTimerDisplay();
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(updateTimerDisplay, 1000);
    });
  }

  function resetFocusSession() {
    chrome.storage.local.set({
      focusSession: false,
      timerStart: null
    }, () => {
      clearInterval(timerInterval);
      timeDisplay.textContent = "00:30";
    });
  }

  addBtn.onclick = () => {
    const site = input.value.trim().replace(/^https?:\/\//, '').replace('www.', '').split('/')[0];
    if (!site) return;
    chrome.storage.local.get(['blockedSites'], (result) => {
      const sites = result.blockedSites || [];
      if (!sites.includes(site)) {
        sites.push(site);
        chrome.storage.local.set({ blockedSites: sites }, () => {
          input.value = '';
          refreshList();
        });
      }
    });
  };

  unblockBtn.onclick = () => {
    const site = input.value.trim().replace(/^https?:\/\//, '').replace('www.', '').split('/')[0];
    const minutes = parseInt(minutesDropdown.value);
    if (!site || isNaN(minutes)) return;

    const expiry = Date.now() + minutes * 60 * 1000;
    chrome.storage.local.get(['temporaryUnblocks'], (result) => {
      const unblocks = result.temporaryUnblocks || {};
      unblocks[site] = expiry;
      chrome.storage.local.set({ temporaryUnblocks: unblocks }, () => {
        alert(site + ' will be unblocked for ' + minutes + ' minute(s).');
        input.value = '';
      });
    });
  };

  startBtn.onclick = startFocusSession;
  resetBtn.onclick = resetFocusSession;

  refreshList();
  updateTimerDisplay();
  timerInterval = setInterval(updateTimerDisplay, 1000);
});
