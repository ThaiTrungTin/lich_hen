/**
 * DATE PROPOSAL - MÈO ĐỰC & BÉ KHỈ 💕
 * Troll button logic, Always-playing Romantic Music Box, and Celebration View
 */

// ==========================================
// 1. NHẠC NỀN LUÔN PHÁT (ALWAYS PLAYING ROMANTIC MUSIC BOX)
// ==========================================
class CuteAudioEngine {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.isMuted = false;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tự động kích hoạt phát nhạc ngay khi có thể
  autoStartBGM() {
    this.init();
    if (!this.bgmPlaying && !this.isMuted) {
      this.startBGM();
    }
  }

  // Tiếng lò xo nhảy tưng tưng khi nút "Không" chạy trốn
  playBoing() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.22);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Tiếng "Meow" ngọt ngào của Mèo đực
  playMeow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(460, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Tiếng chuông chúc mừng rộn rã khi bấm "Đồng ý"
  playCelebration() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    });
  }

  // Giai điệu hộp nhạc Lofi lãng mạn nhẹ nhàng (vòng lặp vô tận)
  startBGM() {
    this.init();
    if (!this.ctx || this.bgmPlaying) return;
    this.bgmPlaying = true;

    // Giai điệu nốt nhạc du dương dễ thương (Canon in D / Romantic Ballad)
    const melody = [
      // Đoạn 1
      { note: 523.25, dur: 0.35, bass: 261.63 }, // C5 + C4
      { note: 659.25, dur: 0.35, bass: null },   // E5
      { note: 783.99, dur: 0.35, bass: null },   // G5
      { note: 987.77, dur: 0.55, bass: null },   // B5
      // Đoạn 2
      { note: 880.00, dur: 0.35, bass: 220.00 }, // A5 + A3
      { note: 783.99, dur: 0.35, bass: null },   // G5
      { note: 659.25, dur: 0.35, bass: null },   // E5
      { note: 523.25, dur: 0.55, bass: null },   // C5
      // Đoạn 3
      { note: 698.46, dur: 0.35, bass: 174.61 }, // F5 + F3
      { note: 659.25, dur: 0.35, bass: null },   // E5
      { note: 587.33, dur: 0.35, bass: null },   // D5
      { note: 659.25, dur: 0.55, bass: null },   // E5
      // Đoạn 4
      { note: 783.99, dur: 0.35, bass: 196.00 }, // G5 + G3
      { note: 880.00, dur: 0.35, bass: null },   // A5
      { note: 987.77, dur: 0.35, bass: null },   // B5
      { note: 1046.50, dur: 0.6, bass: null }    // C6
    ];

    let index = 0;

    const playStep = () => {
      if (!this.bgmPlaying || !this.ctx || this.isMuted) return;

      const current = melody[index % melody.length];
      const now = this.ctx.currentTime;

      // Note chính (tiếng chuông trong trẻo)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(current.note, now);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + current.dur + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + current.dur + 0.3);

      // Nốt đệm trầm ấm (nếu có)
      if (current.bass) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(current.bass, now);

        bassGain.gain.setValueAtTime(0.06, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.85);
      }

      index++;
      this.bgmTimer = setTimeout(playStep, 380);
    };

    playStep();
    this.updateButtonUI(true);
  }

  toggleMute(btnElement) {
    this.init();
    if (this.isMuted) {
      this.isMuted = false;
      if (!this.bgmPlaying) {
        this.startBGM();
      }
      this.updateButtonUI(true);
    } else {
      this.isMuted = true;
      this.bgmPlaying = false;
      if (this.bgmTimer) {
        clearTimeout(this.bgmTimer);
        this.bgmTimer = null;
      }
      this.updateButtonUI(false);
    }
  }

  updateButtonUI(isPlaying) {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    if (isPlaying && !this.isMuted) {
      btn.innerHTML = '<span class="music-icon">🎶</span> Nhạc đang phát';
      btn.style.opacity = '1';
    } else {
      btn.innerHTML = '🔇 Đang tắt tiếng';
      btn.style.opacity = '0.65';
    }
  }
}

const audio = new CuteAudioEngine();

// Tự động kích hoạt nhạc ngay khi load hoặc khi người dùng chạm bất kì đâu
function enableAutoMusic() {
  audio.autoStartBGM();
  // Trình duyệt thường yêu cầu 1 thao tác tương tác bất kì để cấp quyền audio
  const unlockAudio = () => {
    audio.autoStartBGM();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('mousemove', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('mousemove', unlockAudio, { passive: true });
}

enableAutoMusic();

// Nút âm thanh trên góc
const soundBtn = document.getElementById('sound-toggle-btn');
soundBtn?.addEventListener('click', () => {
  audio.toggleMute(soundBtn);
});


// ==========================================
// 2. TROLL BUTTON LOGIC (CHẠY TRỐN SIÊU MƯỢT)
// ==========================================
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const trollHint = document.getElementById('troll-hint');
const speechBubble = document.getElementById('speech-bubble');
const catSweat = document.getElementById('cat-sweat');

// Danh sách câu troll hài hước, lém lỉnh khi rủ đi cà phê
const trollMessages = [
  "Ơ kìa bấm trượt rồi nha 😜",
  "Đố em bấm được á! 🏃‍♀️💨",
  "Nút này bị khoá rồi, bấm nút hồng đi! 👉",
  "Ủa sao nhanh tay dữ vậy mà vẫn hụt? 🤭",
  "Đi cà phê xíu thôi mà, bấm bên kia đii haha 😂",
  "Năn nỉ đó, đi chơi một bữa cho vui nha! ✨",
  "Chỉ có một đáp án đúng thôi nha! 🙈",
  "Tính né anh thiệt hả? Không dễ đâu nha! 😜",
  "Chịu thua chưa nè? Bấm Đi lunn lẹ đi! 🥰"
];

// Danh sách câu nói trong bóng thoại
const catSpeechList = [
  "Đi cà phê với anh nha! ☕✨",
  "Đi xíu nói chuyện cho vui nè! 🌸",
  "Bấm nút hồng lẹ lẹ đi em! 👉👈",
  "Anh đợi câu chốt kèo nhen! ✨",
  "Chuẩn bị lên đồ thôi nào! 🛵"
];

let trollCount = 0;
let yesScale = 1.0;

function escapeButton(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  audio.autoStartBGM();
  audio.playBoing();

  trollCount++;
  btnNo.classList.add('running');

  // Tạo hiệu ứng khói "vùuu 💨" tại vị trí cũ
  createPoofSmoke(btnNo.offsetLeft + btnNo.offsetWidth / 2, btnNo.offsetTop + btnNo.offsetHeight / 2);

  // Tính toán vị trí ngẫu nhiên an toàn trên màn hình (không bao giờ bay ra khỏi view)
  const padding = 24;
  const btnWidth = btnNo.offsetWidth || 140;
  const btnHeight = btnNo.offsetHeight || 48;

  const maxW = window.innerWidth - btnWidth - padding;
  const maxH = window.innerHeight - btnHeight - padding;

  let newX = Math.floor(Math.random() * (maxW - padding)) + padding;
  let newY = Math.floor(Math.random() * (maxH - padding)) + padding;

  // Đảm bảo không quá sát nút Đồng Ý
  const yesRect = btnYes.getBoundingClientRect();
  if (Math.abs(newX - yesRect.left) < 100 && Math.abs(newY - yesRect.top) < 70) {
    newX = (newX + 160) % maxW;
  }

  btnNo.style.position = 'fixed';
  btnNo.style.left = `${newX}px`;
  btnNo.style.top = `${newY}px`;

  // Cập nhật câu troll
  const trollMsg = trollMessages[trollCount % trollMessages.length];
  trollHint.textContent = trollMsg;
  trollHint.classList.add('active');

  // Đổi chữ trên nút Không
  const buttonNoTexts = [
    "Không đi đâu 😝",
    "Trượt rồi nè! 💨",
    "Đố bắt được 😜",
    "Hông đi đâu 🙈",
    "Chịu thua chưa 🏃"
  ];
  btnNo.querySelector('.btn-no-text').textContent = buttonNoTexts[trollCount % buttonNoTexts.length];

  // Cập nhật lời mèo nói & biểu cảm
  if (speechBubble) {
    speechBubble.textContent = catSpeechList[trollCount % catSpeechList.length];
  }
  if (catSweat) {
    catSweat.style.opacity = '1';
  }

  // Nút Đồng Ý to dần lên sau mỗi lần Khỉ cố bấm Không!
  if (yesScale < 1.45) {
    yesScale += 0.055;
    btnYes.style.transform = `scale(${yesScale})`;
  }
}

// Tạo hiệu ứng đám mây khói poof khi nút né
function createPoofSmoke(x, y) {
  const smoke = document.createElement('div');
  smoke.className = 'poof-smoke';
  smoke.textContent = '💨';
  smoke.style.left = `${x}px`;
  smoke.style.top = `${y}px`;
  document.body.appendChild(smoke);
  setTimeout(() => smoke.remove(), 600);
}

// Bắt sự kiện: Chuột tới gần (desktop) & Chạm tay (mobile)
btnNo.addEventListener('mouseenter', escapeButton);
btnNo.addEventListener('touchstart', escapeButton, { passive: false });
btnNo.addEventListener('pointerdown', escapeButton);
btnNo.addEventListener('click', escapeButton);

// Proximity detection trên laptop: Nếu chuột lại gần trong bán kính 65px thì né luôn!
document.addEventListener('mousemove', (e) => {
  if (document.getElementById('celebration-view').classList.contains('active')) return;
  const rect = btnNo.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
  if (dist < 60) {
    escapeButton();
  }
});

// ==========================================
// 3. KHI KHỈ BẤM "ĐỒNG Ý" -> CHỐT KÈO YÊU THƯƠNG
// ==========================================
const invitationView = document.getElementById('invitation-view');
const celebrationView = document.getElementById('celebration-view');

btnYes.addEventListener('click', () => {
  audio.autoStartBGM();
  audio.playMeow();
  setTimeout(() => audio.playCelebration(), 250);

  // Ẩn nút Không
  btnNo.style.display = 'none';

  // Hiệu ứng pháo hoa giấy & tim bay ngập trời
  triggerFullConfetti();

  // Chuyển sang màn hình Mèo & Khỉ hạnh phúc
  invitationView.style.display = 'none';
  celebrationView.classList.add('active');

  // Cuộn mượt lên trên nếu màn hình nhỏ
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// 4. CONFETTI GENERATOR (PHÁO HOA HOA HỒNG & TIM)
// ==========================================
function triggerFullConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 120;
  const particles = [];
  const emojis = ['💖', '🌸', '✨', '🍓', '🎀', '🐾', '💕', '🥰'];

  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.7) * 20,
      size: Math.random() * 18 + 14,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      opacity: 1,
      gravity: 0.38
    });
  }

  let startTime = Date.now();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985;
      p.rotation += p.rotSpeed;

      if (elapsed > 1800) {
        p.opacity -= 0.015;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.font = `${p.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
    });

    if (elapsed < 3800) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(animate);
}

// ==========================================
// 5. FLOATING SAKURA & HEARTS BACKGROUND
// ==========================================
function createFloatingHearts() {
  const container = document.getElementById('bg-decorations');
  if (!container) return;
  const icons = ['🌸', '💕', '✨', '🐾', '🎀'];

  setInterval(() => {
    if (document.hidden) return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = `${Math.random() * 95}vw`;
    heart.style.fontSize = `${Math.random() * 16 + 14}px`;
    heart.style.animationDuration = `${Math.random() * 4 + 6}s`;
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 9000);
  }, 1200);
}

createFloatingHearts();
