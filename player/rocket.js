class Rocket {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.pos = createVector(width / 2, height - 100);
    this.step = 50;
    this.tinggi = 50;
    this.alas = 30;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.knalpot_space = 7;
  }

  show() {
    push();
    fill(255);
    noStroke();
    triangle(this.pos.x, this.pos.y, this.pos.x + this.alas / 2, this.pos.y - this.tinggi, this.pos.x + this.alas, this.pos.y);
    pop();
  }

  move() {
    if (this.right) {
      this.pos.x = this.pos.x + this.step;
      this.right = false;
    }
    if (this.down) {
      this.pos.y = this.pos.y + this.step;
    }
    if (this.left) {
      this.pos.x = this.pos.x - this.step;
      this.left = false;
    }
    if (this.up) {
      this.pos.y = this.pos.y - this.step;
    }
  }

  cekTepi() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }
    if (this.pos.x > width - this.alas) {
      this.pos.x = width - this.alas;
    }
    if (this.pos.y < 0 + this.tinggi) {
      this.pos.y = 0 + this.tinggi;
    }
    if (this.pos.y > height - this.tinggi) {
      this.pos.y = height - this.tinggi;
    }
  }

  knalpot() {
    fill(255);
    stroke(255);
    line(this.pos.x + this.knalpot_space, this.pos.y + this.knalpot_space, this.pos.x + this.knalpot_space, this.pos.y + random(this.knalpot_space + 20));
    line(this.pos.x + this.knalpot_space * 2, this.pos.y + this.knalpot_space, this.pos.x + this.knalpot_space * 2, this.pos.y + random(this.knalpot_space * 7));
    line(this.pos.x + this.knalpot_space * 3, this.pos.y + this.knalpot_space, this.pos.x + this.knalpot_space * 3, this.pos.y + random(this.knalpot_space + 20));
  }
}