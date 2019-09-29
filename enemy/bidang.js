class Bidang {
  constructor() {
    this.reset();
  }

  reset() {
    this.pos = createVector(random(width), 0 - random(500));
    this.r = random(30, 70);
    this.step = random(0.5, 1.2);
    this.warna = color(random(70, 255), random(150, 255), random(100, 200), 150);
    this.enemy = random(4);
  }

  show() {
    push();
    fill(this.warna)
    noStroke();
    this.enemy = Math.floor(this.enemy);
    if (this.enemy == 0) {
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
    } else if (this.enemy == 1) {
      rectMode(CENTER);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    } else if (this.enemy == 2) {
      triangle(
        this.pos.x, this.pos.y,
        this.pos.x, this.pos.y - 50,
        this.pos.x + 50, this.pos.y
      );
    } else {
      triangle(
        this.pos.x - 50, this.pos.y,
        this.pos.x, this.pos.y - 50,
        this.pos.x + 50, this.pos.y
      );
      this.nama = "Segitiga Sama Sisi";
    }
    pop();
  }

  move() {
    this.pos.y = this.pos.y + this.step;
  }

  cekTepi() {
    if (this.pos.y > height + this.r) {
      return true;
    }
  }

  jiggling() {
    this.pos.x = this.pos.x + random(-3, 3);
  }
}