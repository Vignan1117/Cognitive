import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Animated background logic
const canvas = document.getElementById('neural-bg') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: Particle[] = [];
  const particleCount = Math.floor((canvas.width * canvas.height) / 10000);

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.01;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx!.fillStyle = 'rgba(34, 211, 238, 0.5)';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
    }
  }

  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  init();

  function animate() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }
  animate();

  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const distance = Math.sqrt(
          (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
          (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)
        );

        if (distance < 100) {
          opacityValue = 1 - (distance / 100);
          ctx!.strokeStyle = `rgba(59, 130, 246, ${opacityValue})`;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(particles[a].x, particles[a].y);
          ctx!.lineTo(particles[b].x, particles[b].y);
          ctx!.stroke();
        }
      }
    }
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0; // Clear the array
    init(); // Re-initialize with new dimensions
  });
}