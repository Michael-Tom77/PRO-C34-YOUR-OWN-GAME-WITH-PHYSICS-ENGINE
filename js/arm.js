class Arm {
    constructor(x, y, width, height, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.arm_image = loadImage ('assets/man_s_arm-removebg-preview.png');

    }
    display() {
        if (keyIsDown(RIGHT_ARROW) && this.angle < 80) {
            this.angle += 5
        }
        if (keyIsDown(LEFT_ARROW) && this.angle > - 20) {
            this.angle -= 5
        }

    push()
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.arm_image, 0, 0, this.width, this.height);
    pop();
    noFill();
  }
}

   