class Bullet {
  constructor(rocketX, rocketY) {
    this.pos = createVector(rocketX, rocketY);
    this.reset();
  }

  reset() {
    this.r = 10;
    this.speed = 20;
  }

  show() {
    push();
    // fill(220, 10, 10);
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r + 20);
    pop();
  }

  move() {
    this.pos.y = this.pos.y - this.speed;
  }

  pantulkan() {
    if (this.pos.y < 0) {
      this.speed *= -1;
      sfxEdge.play();
      mis++;
    } else if (this.pos.y > height) {
      return true;
    }
  }

  hit(e) {
    for (let i = 0; i < e.length; i++) {
      var d = dist(this.pos.x, this.pos.y, e[i].pos.x, e[i].pos.y);
      if (d < this.r + e[i].r / 2) {
        e.splice(i, 1);
        return true;
      }
      // hit = collidePointTriangle(this.pos.x, this.pos.y, ...)
    }
  }
}