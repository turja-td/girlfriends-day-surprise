// --- Cinematic Navigation ---
function nextScreen(currentId, nextId) {
  const currentScreen = document.getElementById(currentId);
  const nextScreen = document.getElementById(nextId);

  // Fade out current screen smoothly
  currentScreen.style.opacity = '0';
  currentScreen.style.transform = 'translateY(-20px) scale(0.95)';
  currentScreen.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
  
  setTimeout(() => {
    currentScreen.classList.remove('active');
    currentScreen.classList.add('hidden');
    
    nextScreen.classList.remove('hidden');
    
    // Tiny delay to ensure browser registers the display change before animating
    setTimeout(() => {
      nextScreen.classList.add('active');
    }, 100);
  }, 1000); // 1 full second of transition darkness
}

// --- First Tap Logic (Starts Music & Flowers) ---
function startJourney() {
  const bgMusic = document.getElementById('bg-music');
  bgMusic.volume = 0; // Start at 0 for fade in
  bgMusic.play().catch(e => console.log("Audio requires manual play."));
  
  // Cinematic Audio Fade In
  let fadeAudio = setInterval(function () {
    if (bgMusic.volume < 0.6) {
      bgMusic.volume += 0.05;
    } else {
      clearInterval(fadeAudio);
    }
  }, 200);
  
  createFlowers();
  nextScreen('screen-1', 'screen-2');
}

// --- Cinematic Flower Animations ---
function createFlowers() {
  const container = document.getElementById('flower-container');
  const flowerShapes = ['🌸', '❀', '💮', '🤍']; 
  
  setInterval(() => {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.innerText = flowerShapes[Math.floor(Math.random() * flowerShapes.length)];
    
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.fontSize = (Math.random() * 15 + 10) + 'px'; 
    flower.style.animationDuration = (Math.random() * 6 + 6) + 's'; 
    
    container.appendChild(flower);
    setTimeout(() => { flower.remove(); }, 12000); 
  }, 400); 
}

// --- Video & Massive Heart Confetti Logic ---
const video = document.getElementById('finale-video');
const bgMusic = document.getElementById('bg-music');
const postMsg = document.getElementById('post-video-msg');
const restartBtn = document.getElementById('restart-btn');

// Cinematic audio fade out when video plays
video.addEventListener('play', () => {
  let fadeAudio = setInterval(function () {
    if (bgMusic.volume > 0.05) {
      bgMusic.volume -= 0.05;
    } else {
      bgMusic.pause();
      clearInterval(fadeAudio);
    }
  }, 100);
});

// Resume music if video pauses
video.addEventListener('pause', () => {
  if (!video.ended) {
    bgMusic.play();
    bgMusic.volume = 0.6;
  }
});

// DRAMATIC LOVE BOMB CONFETTI & RESTART BUTTON REVEAL
video.addEventListener('ended', () => {
  // Reveal hidden final message
  postMsg.style.opacity = 1;
  postMsg.style.transform = 'scale(1)';

  // Reveal Restart Button shortly after
  setTimeout(() => {
    restartBtn.classList.add('show');
  }, 1000);

  // Intense Confetti setup
  const duration = 5000; 
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 999 };

  function randomInRange(min, max) { return Math.random() * (max - min) + min; }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 60 * (timeLeft / duration);
    const colors = ['#ffffff', '#ffb6c1', '#ff0000', '#ff1493', '#ff69b4'];

    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: colors,
      shapes: ['circle', 'square'] 
    }));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: colors,
      shapes: ['circle', 'square']
    }));
  }, 250);
});