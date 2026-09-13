const weddingDate = new Date('2027-03-13T16:30:00-03:00').getTime();
const fields = { days: document.querySelector('#days'), hours: document.querySelector('#hours'), minutes: document.querySelector('#minutes'), seconds: document.querySelector('#seconds') };

function updateCountdown() {
  const remaining = Math.max(0, weddingDate - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
  Object.entries(values).forEach(([key, value]) => { fields[key].textContent = String(value).padStart(key === 'days' ? 3 : 2, '0'); });
}

function downloadCalendar() {
  const event = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dani y Pablo//Invitacion//ES', 'BEGIN:VEVENT', 'UID:dani-pablo-20270313@invitacion.local', 'DTSTAMP:20260913T000000Z', 'DTSTART:20270313T193000Z', 'DTEND:20270314T060000Z', 'SUMMARY:Boda de Dani y Pablo', 'LOCATION:Parroquia Nuestra Sra. de Luján y La Catalá, Córdoba', 'DESCRIPTION:Ceremonia 16:30. Festejo 18:00.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([event], { type: 'text/calendar;charset=utf-8' }));
  link.download = 'boda-dani-y-pablo.ics';
  link.click();
  URL.revokeObjectURL(link.href);
}

const weddingSong = document.querySelector('#wedding-song');
const soundButton = document.querySelector('#sound-toggle');
const soundLabel = document.querySelector('#sound-label');

async function startSongAutomatically() {
  try {
    await weddingSong.play();
    soundButton.setAttribute('aria-pressed', 'true');
  } catch {
    soundButton.setAttribute('aria-pressed', 'false');
    soundLabel.textContent = 'Tocá para escuchar';
  }
}

async function toggleSong() {
  if (weddingSong.paused) {
    try {
      await weddingSong.play();
      soundButton.setAttribute('aria-pressed', 'true');
      soundLabel.textContent = 'Pausar canción';
    } catch {
      soundLabel.textContent = 'Tocá para escuchar';
    }
    return;
  }
  weddingSong.pause();
  soundButton.setAttribute('aria-pressed', 'false');
  soundLabel.textContent = 'Nuestra canción';
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
startSongAutomatically();
document.querySelector('#calendar-button').addEventListener('click', downloadCalendar);
document.querySelector('#sound-toggle').addEventListener('click', toggleSong);

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
document.querySelectorAll('.photo').forEach((photo) => {
  photo.addEventListener('click', () => {
    lightboxImage.src = photo.dataset.photo;
    lightboxImage.alt = photo.querySelector('img').alt;
    lightbox.showModal();
  });
});
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
