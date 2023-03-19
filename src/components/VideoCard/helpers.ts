export function formatedTime(time: number) {
  return ` ${Math.floor(time / 60)}:${
    Math.floor(time) - Math.floor(time / 60) * 60
  }`;
}
