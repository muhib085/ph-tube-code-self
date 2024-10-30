function getTime(time) {
  const hours = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hours} hours ${minutes} minutes ${remainingSecond} seconds`;
}
console.log(getTime(4567));
