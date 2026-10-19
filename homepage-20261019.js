const clips = ['bavardio-60sec.mp4', 'bavardio-demo2.mp4', 'bavardio-demo3.mp4'];
const player = document.getElementById('video-player');
const selectors = [...document.querySelectorAll('[data-clip]')];
const statusText = document.getElementById('video-status');
let selected = 0;
async function selectClip(index) {
  const muted = player.muted;
  const volume = player.volume;
  player.pause(); selected = index; player.src = clips[index];
  player.muted = muted; player.volume = volume; player.load();
  selectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  try { await player.play(); } catch { statusText.textContent = 'Press play to start the video rotation.'; }
}
selectors.forEach((button, index) => button.addEventListener('click', () => selectClip(index)));
player.addEventListener('ended', () => selectClip((selected + 1) % clips.length));
player.addEventListener('playing', () => { statusText.textContent = 'Videos play in rotation · Use the controls to pause or turn sound on'; });
player.play().catch(() => { statusText.textContent = 'Press play to start the video rotation.'; });
const eventStart = Date.parse('2026-11-02T00:00:00-08:00');
const eventEnd = Date.parse('2026-11-06T00:00:00-08:00');
function updateCountdown() {
  const now = Date.now();
  const timer = document.getElementById('countdown');
  const label = document.getElementById('countdown-label');
  if (now >= eventStart) {
    timer.hidden = true; timer.style.display = 'none';
    label.textContent = now < eventEnd ? 'Happening now · Visit Booth #908' : 'Thank you for joining us at WISPAPALOOZA';
    document.querySelector('.countdown-note').hidden = true;
    return;
  }
  const remaining = Math.floor((eventStart - now) / 1000);
  const values = { days: Math.floor(remaining / 86400), hours: Math.floor(remaining / 3600) % 24, minutes: Math.floor(remaining / 60) % 60, seconds: remaining % 60 };
  for (const [unit, value] of Object.entries(values)) document.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, '0');
}
updateCountdown(); setInterval(updateCountdown, 1000);


