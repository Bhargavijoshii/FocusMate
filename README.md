[FOCUSMATE_README.md](https://github.com/user-attachments/files/20272337/FOCUSMATE_README.md)[Uploading FOCUSMAT
# ⏳ FocusMate - Distraction Blocker Chrome Extension

FocusMate is a productivity Chrome extension that helps you stay focused by blocking access to distracting websites like social media, video streaming, and more during your work or study hours.

## 🚀 Features

- Block distracting websites (e.g., YouTube, Facebook, Twitter).
- Customize the list of blocked websites.
- Enable or disable the blocker anytime.
- Lightweight and easy to use.

## 🛠️ Installation

1. Download or clone this repository:
   ```bash
   git clone https://github.com/yourusername/focusmate-extension.git
   ```

2. Open Chrome and go to `chrome://extensions/`.

3. Enable **Developer mode** (toggle switch at top right).

4. Click **Load unpacked** and select the `focusmate` folder.

5. The extension icon should now appear in your Chrome toolbar.

## 📁 Project Structure

```
focusmate/
│
├── manifest.json              # Extension metadata
├── background.js              # Background script to monitor tabs
├── popup.html                 # User interface for enabling/disabling blocker
├── popup.js                   # Handles UI logic
├── styles.css                 # Styling for the popup
└── blocklist.json             # List of websites to block
```

## 📋 Permissions

The extension requires the following permissions:
- `tabs`: To monitor active browser tabs.
- `storage`: To save user settings.
- `webRequest`, `webRequestBlocking`: To block access to websites.

## ✅ Usage

1. Click on the FocusMate icon in the Chrome toolbar.
2. Enable the blocker using the toggle.
3. When enabled, any website from the blocklist will be inaccessible.
4. You can modify the blocklist (if supported in UI or settings).

## 💡 Use Cases

- Avoiding procrastination while working or studying.
- Creating distraction-free browsing sessions.
- Practicing digital minimalism.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Author**: [Your Name]  
**GitHub**: [github.com/yourusername](https://github.com/yourusername)
E_README.md…]()
