document.addEventListener("DOMContentLoaded", () => {
    const heartsContainer = document.getElementById("hearts-container");
    const words = ["Eres mi todo", "Mi amorcito", "Para siempre", "Mi golosita", "Mi dormilona", "Te adoro", "Eres increíble", "te voy a esperar","mi chiquita","mi esposa","mi toxica","mi princes"];
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = `❤️ ${words[Math.floor(Math.random() * words.length)]} ❤️`;
        
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.top = `${Math.random() * window.innerHeight}px`;
        heart.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 1000);

    // Configurar lienzo de fuegos artificiales
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let fireworks = [];

    function createFirework() {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height / 2;
        let color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        let particles = [];

        for (let i = 0; i < 20; i++) {
            let angle = Math.random() * Math.PI * 2;
            let speed = Math.random() * 4 + 1;
            particles.push({
                x: x,
                y: y,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                life: 60,
                shape: Math.random() > 0.5 ? "❤️" : "⭐",
                color: color
            });
        }

        fireworks.push(particles);
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "20px Arial";

        fireworks.forEach((particles, index) => {
            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.fillText(p.shape, p.x, p.y);

                p.x += p.dx;
                p.y += p.dy;
                p.dy += 0.05; // Gravedad
                p.life--;

                if (p.life <= 0) {
                    fireworks.splice(index, 1);
                }
            });
        });

        requestAnimationFrame(drawFireworks);
    }

    setInterval(createFirework, 1000);
    drawFireworks();
});


