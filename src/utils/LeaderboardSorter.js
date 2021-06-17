/* eslint-disable */

export default function leaderBoardSorter(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].position = i + 1;
  }
  return array;
}
