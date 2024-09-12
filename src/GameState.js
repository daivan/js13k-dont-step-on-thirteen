import { GameObjectClass, Sprite, Text, initKeys, initGamepad, keyPressed, gamepadPressed, gamepadAxis, collides } from 'kontra';
import play from './Audio';

initKeys();
initGamepad();

export default class GameState extends GameObjectClass {

  constructor(sprite, gameArea, properties) {
    super(properties)
    this.sprite = sprite;
    this.gameArea = gameArea;
    this.score = 100;
    this.level = 1;
    this.maxLevel = 7;
    this.gameOver = false;
    this.gameObjects = [];

    this.scene = 'START';


    this.goalSprite = Sprite({
      x: Math.floor(Math.random() * 7) * 64 + 64,
      y: Math.floor(Math.random() * 7) * 64 + 64,
      radius: 32,
      color: '#edc06d',
      render() {
        this.context.fillStyle = '#00000055';
        this.context.beginPath();
        this.context.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        const gradient = this.context.createRadialGradient(this.radius / 1.3, this.radius / 1.3, 0, 0, 0, this.radius * 2);
        gradient.addColorStop(0, '#edc06dff');
        gradient.addColorStop(1, '#edc06d00');
        this.context.fillStyle = gradient;
        this.context.beginPath();
        this.context.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
        this.context.fill();
      }
    });

    this.energyBar = Sprite({
      x: 64 * 6 + 28,
      y: 64 * 8 + 32,
      width: 96,
      height: 32,
      customRender(energy) {
        this.context.fillStyle = 'white';
        this.context.fillRect(this.x - 32, this.y - this.height / 2, this.width + 36, this.height + 4);
        this.context.fillStyle = 'black';
        this.context.fillRect(this.x + 2, this.y - this.height / 2 + 2, this.width, this.height);
        this.context.fillStyle = '#4a8cbd';
        this.context.fillRect(this.x + 2, this.y - this.height / 2 + 2, this.width * energy / 100, this.height);
        this.context.fillStyle = 'black';
        this.context.font = 'bold 20px Arial';
        this.context.fillText('E', this.x - 22, this.y + 10);
      }
    });

    this.playerSprite = Sprite({
      x: 5 * 64 - 32,
      y: 5 * 64 - 32,
      velocity: { x: 0, y: 0 },
      direction: { x: 0, y: -1 },
      anchor: { x: 0.5, y: 0.5 },
      speed: 2,
      size: 64,
      rotation: 0,
      customImage: this.sprite,
      turbo: false,
      energy: 100,
      cooldown: 0,
      dead: false,
      toggleTurbo() {
        if (this.cooldown === 0) {
          this.turbo = !this.turbo;
          this.cooldown = 30;
        }
      },
      updateEnergy() {
        if (this.turbo) {
          this.energy -= 1;
          if (this.energy <= 0) {
            this.toggleTurbo();
          }
        } else {
          this.energy += 0.5;
          if (this.energy > 100) {
            this.energy = 100;
          }
        }
      },
      getSpeed() {
        return this.turbo ? this.speed * 2 : this.speed;
      },
      remove() {
        this.ttl = 0;
      },
      render() {
        this.context.drawImage(this.customImage, 128, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size);
      },
      update(dt, gameState) {
        let axisX = gamepadAxis('leftstickx', 0);
        let axisY = gamepadAxis('leftsticky', 0);
        this.direction.x = 0;
        this.direction.y = 0;

        if (keyPressed('w') || keyPressed('arrowup') || gamepadPressed('dpadup') || axisY < -0.5) {
          this.direction.y = -1;
        }

        if (keyPressed('s') || keyPressed('arrowdown') || gamepadPressed('dpaddown') || axisY > 0.5) {
          this.direction.y = 1;
        }

        if (keyPressed('a') || keyPressed('arrowleft') || gamepadPressed('dpadleft') || axisX < -0.5) {
          this.direction.x = -1;
        }

        if (keyPressed('d') || keyPressed('arrowright') || gamepadPressed('dpadright') || axisX > 0.5) {
          this.direction.x = 1;
        }

        if (keyPressed('space') || gamepadPressed('south')) {
          this.toggleTurbo();
        }

        this.velocity.x = this.direction.x * this.getSpeed();
        this.velocity.y = this.direction.y * this.getSpeed();

        if (this.velocity.x !== 0 && this.velocity.y !== 0) {
          this.velocity.x /= Math.sqrt(2);
          this.velocity.y /= Math.sqrt(2);
        }


        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.x < 64 + this.size / 2) {
          this.x = 64 + this.size / 2;
        }
        if (this.x > 64 * 8 - this.size / 2) {
          this.x = 64 * 8 - this.size / 2;
        }
        if (this.y < 64 + this.size / 2) {
          this.y = 64 + this.size / 2;
        }
        if (this.y > 64 * 8 - this.size / 2) {
          this.y = 64 * 8 - this.size / 2;
        }

        if (this.direction.x !== 0 || this.direction.y !== 0) {
          this.rotation = Math.atan2(this.direction.y, this.direction.x) + Math.PI / 2;
        }

        this.updateEnergy();
        if (this.cooldown > 0) {
          this.cooldown -= 1;
        }
      }
    });

    this.gameObjects.push(this.playerSprite);

  }


  startGame() {
    this.level = 1;
    this.gameArea.level = this.level;
    this.gameArea.startLevel();
    this.gameObjects = [];
    this.playerSprite.x = 64 * 4.5;
    this.playerSprite.y = 64 * 4.5;
    this.playerSprite.dead = false;
    this.gameOver = false;
    this.score = 0;
    this.scene = 'GAME';
  }

  createLasers() {
    const xstart = this.columnNumber * 64 + 64 * 1.5;
    const ystart = this.rowNumber * 64 + 64 * 1.5;
    const targetPoint = { x: this.colNumber * 64, y: this.rowNumber * 64 + 2 * 64 };
    this.gameObjects.push(Sprite({
      x: xstart,
      y: 64,
      color: '#aa4d8dff',
      size: 4,
      remove: false,
      render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(-this.size / 2, 0, this.size, targetPoint.y - this.y);
      },
      update(dt) {
        this.size += this.size * dt * 50;
        if (this.size > 48) {
          this.size = 48;
          this.remove = true;
        }
      }
    })
    );
    this.gameObjects.push(Sprite({
      x: 64,
      y: ystart,
      color: '#aa4d8dff',
      size: 4,
      remove: false,
      render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(0, -this.size / 2, xstart - 32, this.size);
      },
      update(dt) {
        this.size += this.size * dt * 50;
        if (this.size > 48) {
          this.size = 48;
          this.remove = true;
        }
      }
    })
    );

  }

  createExplosion() {
    let particles = [];
    self = this;

    for (let i = 0; i < 20; i++) {
      particles.push({
        x: this.playerSprite.x,
        y: this.playerSprite.y,
        radius: Math.random() * 20 + 10,
        color: `rgba(255, ${Math.random() * 255}, 0, 1)`,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: (Math.random() - 0.5) * 4,
        life: 1.0
      });
    }

    this.gameObjects.push(Sprite({
      x: this.playerSprite.x,
      y: this.playerSprite.y,
      particles: particles,

      update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          let p = this.particles[i];

          p.x += p.velocityX;
          p.y += p.velocityY;
          p.radius *= 0.97;
          p.life -= 0.02;


          if (p.life <= 0) {
            this.particles.splice(i, 1);
          }
        }

        if (this.particles.length === 0) {
          this.ttl = 0; // "Time to live", döda spriten när partiklarna är borta
          self.gameOver = true;
        }
      },

      // Rendera explosionen
      render() {
        this.particles.forEach(p => {
          this.context.beginPath();
          this.context.arc(p.x - this.x, p.y - this.y, p.radius, 0, 2 * Math.PI, false);
          this.context.fillStyle = p.color.replace("1)", `${p.life})`); // Uppdatera opacitet
          this.context.fill();
        });
      }
    })
    );
  }

  updateNumbers() {
    this.rowNumber = Math.floor(this.playerSprite.y / 64) - 1;
    this.columnNumber = Math.floor(this.playerSprite.x / 64) - 1;
    const summary = this.gameArea.verticalNumbers[this.rowNumber] + this.gameArea.horizontalNumbers[this.columnNumber];
    if (summary === 13) {
      this.createLasers();
      this.playerSprite.dead = true;
      this.createExplosion();
      play('explosion');

    }
  }

  update(dt) {

    if (this.score === this.level * 5) {
      this.level = this.level + 1;
      if (this.level > this.maxLevel) {
        this.level = this.maxLevel;
        this.gameOver = true;
      }
      this.gameArea.level = this.level;
      play('levelup', 0.3);
    }
    if (this.gameOver) {
      this.scene = 'GAME_OVER';
      return;
    }
    this.gameObjects.forEach((object, index) => {
      object.update(dt);
      if (object.remove) {
        this.gameObjects.splice(index, 1);
      }
    });
    if (!this.playerSprite.dead) {
      this.playerSprite.update();
      this.updateNumbers();
    }

    var collide = collides(this.playerSprite, this.goalSprite);
    if (collide) {
      this.score = this.score + 1;
      this.goalSprite.x = Math.floor(Math.random() * 7) * 64 + 64;
      this.goalSprite.y = Math.floor(Math.random() * 7) * 64 + 64;
      play('pickup', 0.2);
    }
  }

  render() {
    this.goalSprite.render();
    if (this.gameOver) {
      this.scene = 'GAME_OVER';
      return;
    }
    this.gameObjects.forEach(laser => laser.render());
    if (!this.playerSprite.dead) {
      this.playerSprite.render();
    }
    this.energyBar.customRender(this.playerSprite.energy);
  }
}