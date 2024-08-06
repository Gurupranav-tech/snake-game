class Snake {
  constructor(grid, points) {
    this.grid = grid;
    this.points = points;
    this.grid_elements = Array.from(grid.childNodes);
    this.apple = new Apple(grid);

    this.head = new Vector(3, 3);
    this.head_velocity = new Vector(1, 0);
    this.body = [];
    this.is_running = true;

    this.timer = setInterval(this.update.bind(this), 300);
  }

  render() {
    if (!this.is_running) {
      clearInterval(this.timer);
      document.querySelector('.status').textContent = 'Game Over:';
      return;
    }
    if (
      this.head.x === this.apple.position.x &&
      this.head.y === this.apple.position.y
    ) {
      const current_score = parseInt(this.points.textContent);
      this.points.textContent = current_score + 1;
      this.body.push(new Vector(this.head.x, this.head.y));
      this.apple.new_position();
    }
    this.clean();
    this.grid_elements[coord(this.head.x, this.head.y)].classList.add('head');
    for (const v of this.body) {
      this.grid_elements[coord(v.x, v.y)].classList.add('body');
    }

    requestAnimationFrame(this.render.bind(this));
  }

  update() {
    this.clean();

    for (let i = this.body.length - 1; i >= 1; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    if (this.body.length > 0) {
      this.body[0].x = this.head.x;
      this.body[0].y = this.head.y;
    }
    this.head.x += this.head_velocity.x;
    this.head.y += this.head_velocity.y;

    if (
      this.head.x > 20 ||
      this.head.y > 20 ||
      this.head.x <= 0 ||
      this.head.y <= 0
    ) {
      this.is_running = false;
      document.querySelector('button').classList.remove('hidden');
      return;
    }
    for (let i = 0; i < this.body.length; i++) {
      if (this.body[i].x == this.head.x && this.body[i].y == this.head.y) {
        this.is_running = false;
        document.querySelector('button').classList.remove('hidden');
        return;
      }
    }
  }

  move(dx, dy) {
    if (this.head_velocity.x === dx && this.head_velocity.y === dy) return;

    this.clean();

    for (let i = this.body.length - 1; i >= 1; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    if (this.body.length > 0) {
      this.body[0].x = this.head.x;
      this.body[0].y = this.head.y;
    }
    this.head.x += dx;
    this.head.y += dy;
    this.head_velocity.x = dx;
    this.head_velocity.y = dy;

    if (this.head.x < 0) {
      this.head.x = 0;
    }
    if (this.head.x > 20) {
      this.head.x = 20;
    }
    if (this.head.y < 0) {
      this.head.y = 0;
    }
    if (this.head.y > 20) {
      this.head.y = 20;
    }
  }

  clean() {
    if (!this.is_running) return;
    this.grid_elements[coord(this.head.x, this.head.y)].classList.remove(
      'head'
    );
    for (const v of this.body) {
      this.grid_elements[coord(v.x, v.y)].classList.remove('body');
    }
  }

  restart() {
    this.head = new Vector(3, 3);
    this.head_velocity = new Vector(1, 0);
    this.body = [];
    this.is_running = true;
    this.apple.new_position();
    document.querySelector('button').classList.add('hidden');

    this.timer = setInterval(this.update.bind(this), 300);
    this.render();
  }
}

class Apple {
  constructor(grid) {
    this.grid = grid;
    this.grid_elements = Array.from(grid.childNodes);

    const x = Math.ceil(Math.random() * size);
    const y = Math.ceil(Math.random() * size);
    this.grid_elements[coord(x, y)].classList.add('apple');
    this.position = new Vector(x, y);
  }

  new_position() {
    this.grid_elements[
      coord(this.position.x, this.position.y)
    ].classList.remove('apple');
    const x = Math.ceil(Math.random() * size);
    const y = Math.ceil(Math.random() * size);
    this.grid_elements[coord(x, y)].classList.add('apple');

    this.position.x = x;
    this.position.y = y;
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const coord = (x, y) => size * (y - 1) + (x - 1);
