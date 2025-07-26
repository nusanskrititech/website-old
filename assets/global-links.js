// global-links.js
// Dynamically fetches global links from a Google Sheet (CSV) and applies them to the page.
// If the sheet is not found, uses the default values.

const DEFAULT_LINKS = {
  LINKEDIN_URL: "https://go.nusanskriti.org/linkedIn-website",
  SLACK_URL: "https://go.nusanskriti.org/slack-website",
  FACEBOOK_URL: "https://go.nusanskriti.org/facebook-website",
  INSTAGRAM_URL: "https://go.nusanskriti.org/instagram-website",
  CONTACT_EMAIL: "namaste@nusanskriti.org",
  HOME_URL: "./index.html",
  ABOUT_URL: "./about.html",
  EVENTS_URL: "./events.html",
  NEWSTUDENTS_URL: "./newstudent.html",
  JOINUS_URL: "./joinus.html",
  BOARD_URL: "./board.html",
  SPONSORS_URL: "./sponsors.html",
  CONTACT_URL: "./contact.html",
  JOIN_THE_CREW_URL: "https://go.nusanskriti.org/join-the-crew-website",
  JOINUS_POLICY_PDF_URL: "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view?usp=sharing",
  WHATSAPP_COMMUNITY_LINK: "./whatsapp.html",
  CHAT_POLICY_LINK: "",
  //GOOGLE_ANALYTICS_ID: "G-CWQ5EFFNDN", //for temporary.nusanskriti.org
  GOOGLE_ANALYTICS_ID: "G-QP94LJCKGP" // for nusanskriti.org 
  VERSION: "v2.1.4",
  BUILD_DATE: "2025-07-25",
  BUILD_ID: "mltp-fix"
};

// Replace with your published Google Sheet CSV URL, this contains the links
// Make sure the sheet is public and the link is accessible
// Example: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvP_w46vQTmLuJA7NfC4SwP8ij
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvP_w46vQTmLuJA7NfC4SwP8ijgRQq7yyLTwdYDsQx9TMcmjzFdHvIiGHt5FgDWfjS2AnYH1pVUIQQ/pub?gid=0&single=true&output=csv";

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const obj = {};
  for (let i = 1; i < lines.length; i++) {
    const [key, ...rest] = lines[i].split(',');
    obj[key.trim()] = rest.join(',').trim();
  }
  return obj;
}

function applyLinks(links) {
  // Only update external/social/email links and 'jointhecrew'
  document.querySelectorAll('[data-link="linkedin"]').forEach(el => el.href = links.LINKEDIN_URL);
  document.querySelectorAll('[data-link="slack"]').forEach(el => el.href = links.SLACK_URL);
  document.querySelectorAll('[data-link="facebook"]').forEach(el => el.href = links.FACEBOOK_URL);
  document.querySelectorAll('[data-link="instagram"]').forEach(el => el.href = links.INSTAGRAM_URL);

  // Email
  document.querySelectorAll('[data-link="email"]').forEach(el => {
    el.textContent = links.CONTACT_EMAIL;
    if (el.tagName === 'A') el.href = 'mailto:' + links.CONTACT_EMAIL;
  });

  // Only update 'jointhecrew' button dynamically
  document.querySelectorAll('[data-link="jointhecrew"]').forEach(el => el.href = links.JOIN_THE_CREW_URL);
  
  // Update version information
  updateVersionInfo(links);

  // Publish WhatsApp community link as a global variable
  window.WHATSAPP_COMMUNITY_LINK = links.WHATSAPP_COMMUNITY_LINK;
}

function updateVersionInfo(links) {
  // Add version info to footer if version container exists
  const versionContainer = document.getElementById('version-info');
  if (versionContainer) {
    versionContainer.innerHTML = `
      <small class="text-muted">
        ${links.VERSION} | Build: ${links.BUILD_ID} | ${links.BUILD_DATE}
      </small>
    `;
  }
}

function fetchAndApplyLinks() {
  fetch(SHEET_CSV_URL)
    .then(res => res.ok ? res.text() : Promise.reject())
    .then(csv => applyLinks({...DEFAULT_LINKS, ...parseCSV(csv)}))
    .catch(() => applyLinks(DEFAULT_LINKS));
}

// Initialize Google Analytics
function initializeGoogleAnalytics(links) {
  if (links.GOOGLE_ANALYTICS_ID && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Create and load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${links.GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', links.GOOGLE_ANALYTICS_ID);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch(SHEET_CSV_URL)
    .then(res => res.ok ? res.text() : Promise.reject())
    .then(csv => {
      const combinedLinks = {...DEFAULT_LINKS, ...parseCSV(csv)};
      applyLinks(combinedLinks);
      initializeGoogleAnalytics(combinedLinks);
    })
    .catch(() => {
      applyLinks(DEFAULT_LINKS);
      initializeGoogleAnalytics(DEFAULT_LINKS);
    });
});
