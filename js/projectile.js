class Projectile {

    constructor(x, y) {
        var options = {
            isStatic: true
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0.05;
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.image = image("assets/spear-removebg-preview (1).png");
        this.animagetion = [this.image];
        this.trajectory = [];
        this.isGone = false;

        World.add(world, this.body);
    }
    animate() {
        this.speed += 0.05;
    }

    remove(index) {
        this.isGone = true;
        matterMin.Body.setVelocity(this.body, { x: 0, y: 0 });

        //this.animation = poofAnimation;
        this.speed = 0.05
        setTimeout(() => {
            matterMin, World.remove(world, this.body);
            delete spearGroup[index];
        }, 2000);
    }

    throw() {
        var newAngle = arm.angle - 28;
        newAngle = newAngle * (3.14 / 180);
        var velocity = p5Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        MatterMin.Body.setStatic(this.body, false);
        MatterMin.Body.setVelocuty(this.body, {
            x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)
        }
        );
    }

    display() {

        var angle = this.body.angle;
        var position = this.body.position;
        var index = floor(this.speed % this.animation.length);

        push();
        translate(position.x, position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, 0, this.width, this.height);
        pop();

        if (this.body.velocity.x > 0 && position.x > 10 && !this.isGone) {
            var position = [position.x, position.y];
            this.trajectory.push(position);
        }

        for (var i = 0; i < this.trajectory.length; i++) {
            image(this.image, this, trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
    }
}