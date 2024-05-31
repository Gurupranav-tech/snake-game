const grid = document.querySelector('.grid');
const points = document.querySelector('.points');
const restart = document.querySelector('button');
const snake = new Snake(grid, points);

document.addEventListener('keypress', (ev) => {
  const k = ev.key;
  if (k == 'w') snake.move(0, -1);
  if (k == 's') snake.move(0, 1);
  if (k == 'a') snake.move(-1, 0);
  if (k == 'd') snake.move(1, 0);
});

restart.addEventListener('click', snake.restart.bind(snake));

requestAnimationFrame(snake.render.bind(snake));
