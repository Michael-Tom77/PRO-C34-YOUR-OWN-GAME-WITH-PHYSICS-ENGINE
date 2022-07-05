class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.man_image = loadImage ('assets/man_survivor-removebg-preview.png');

    }
    display() {
    push()
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.man_image, 0, 0, this.width, this.height);
    pop();
    noFill();
  }
}