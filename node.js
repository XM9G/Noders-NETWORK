// THIS IS NOT NODE.JS BUT IT IS A DIFFRENT NODE.JS!!!! ITS A NODE ANIMATION.
const canvas = document.getElementById("nodes");
const ctx = nodes.getContext("2d");
const nodes = [];
const numNodes = 50;
const maxDistance = 100;
const nodeRadius = 10;

// Node class
class Node {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Bounce off walls
    if (this.x < nodeRadius || this.x > canvas.width - nodeRadius) {
      this.vx *= -1;
    }
    if (this.y < nodeRadius || this.y > canvas.height - nodeRadius) {
      this.vy *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff8c00";
    ctx.fill();
  }
}

// Initialize nodes
for (let i = 0; i < numNodes; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const vx = Math.random() * 200 - 100;
  const vy = Math.random() * 200 - 100;
  nodes.push(new Node(x, y, vx, vy));
}

// Main animation loop
function animate(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update nodes
  for (let i = 0; i < numNodes; i++) {
    nodes[i].update(t / 1000);
  }

  // Draw nodes
  for (let i = 0; i < numNodes; i++) {
    nodes[i].draw();
  }

  // Draw connections between nearby nodes
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = "#ff8c00";
        ctx.lineWidth = 2 * (1 - distance / maxDistance);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);