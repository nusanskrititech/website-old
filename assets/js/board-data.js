// board-data.js
// Dynamically loads board members from a Google Sheet (CSV) and renders modern cards

const BOARD_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQN5oluNdLaqaRW3mZE6ykZzY73DtE1-T0GovQDD1Iehw68Aoawgm096YkelkshflyOoiE_HPXYQGqQ/pub?output=csv";

function parseBoardCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = (values[i] || '').trim());
    return obj;
  });
}

function getDriveThumbnailUrl(image) {
  if (!image) return 'assets/img/team/default.jpg';
  // If it's a Google Drive share link, extract the file ID
  const driveMatch = image.match(/(?:\/d\/|id=|file\/d\/|open\?id=)([\w-]{25,})/);
  const fileId = driveMatch ? driveMatch[1] : (image.match(/^([\w-]{25,})$/) ? image : null);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  }
  // If it's already a direct image URL, return as is
  return image;
}

function createBoardCard(member) {
  const imgSrc = getDriveThumbnailUrl(member.PhotoLink);
  // Normalize social links
  const linkedin = member.Linkedin && member.Linkedin.startsWith('http') ? member.Linkedin : (member.Linkedin ? 'https://' + member.Linkedin : '');
  const instagram = member.Instagram && member.Instagram.startsWith('http') ? member.Instagram : (member.Instagram ? 'https://' + member.Instagram : '');
  return `
    <div class="board-card">
      <div class="board-position">${member.Position || ''}</div>
      <img class="board-photo" src="${imgSrc.replace('thumbnail', 'thumbnail') + '&export=view&sz=w2000'}" alt="${member.Name || ''}">
      <div class="board-name">${member.Name || ''}</div>
      <div class="board-socials">
        ${linkedin ? `<a href="${linkedin}" target="_blank" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>` : ''}
        ${instagram ? `<a href="${instagram}" target="_blank" aria-label="Instagram"><i class="bi bi-instagram"></i></a>` : ''}
        ${member.Email ? `<a href="mailto:${member.Email}" aria-label="Email"><i class="bi bi-envelope"></i></a>` : ''}
      </div>
    </div>
  `;
}

function loadBoardMembers() {
  fetch(BOARD_SHEET_CSV_URL)
    .then(res => res.ok ? res.text() : Promise.reject('Failed to fetch board data'))
    .then(csv => {
      const members = parseBoardCSV(csv);
      const html = members.map(createBoardCard).join('');
      const row = document.getElementById('team-members-row');
      if (row) row.innerHTML = html;
    })
    .catch(err => {
      const row = document.getElementById('team-members-row');
      if (row) row.innerHTML = '<div class="col-12 text-center text-danger">Failed to load board data.</div>';
    });
}

document.addEventListener('DOMContentLoaded', loadBoardMembers);
