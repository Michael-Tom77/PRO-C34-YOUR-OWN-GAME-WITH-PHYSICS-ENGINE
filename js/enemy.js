class Enemy {

    constructor(x, y, width, height, enemyPos, enemyWalkAnimation) {

        this.animation = enemyWalkAnimation;
        this.speed = 0.05;
        this.body = Bodies.rectangle(x, y, width, height);
        this.width = width;
        this.height = height;
        this.x = this.positionX;
        this.y = this.positionY;

        this.enemyPosition = enemyPos;
        this.isDead = false;

        World.add(world, this.body);
    }

    animate() {
        this.speed += 0.05;
    }

    discard(index) {
        this.animation = enemyDeathAnimation;
        this.speed = 0.05;
        this.width = 400;
        this.height = 400;
        this.isDead = true;
        setTimeout(() => {
            matterMin.World.remove(world, enemies[index].body);
            spearGroup.splice(index, 1);
        }, 2000);
    }

    display() {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, this.enemyPosition, this.width, this.height);
        noTint();
        pop();
    }
}