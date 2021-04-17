export function rectIntersect(a, b) {
  if (
    b.x > a.width + a.x ||
    a.x > b.width + b.x ||
    b.y > a.height + a.y ||
    a.y > b.height + b.y
  ) {
    return false;
  } else {
    return true;
  }
}

export function randInt(min, max) {
  const num = Math.random() * (max - min) + min;
  return Math.floor(num);
}
