let currentPlayer = 'circle';

const playerTurn = (e) => {
  e.target.disabled = true;
  if (currentPlayer === 'circle') {
    e.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    document.querySelector('.current-player').src = 'pictures/cross.svg';
  } else {
    e.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    document.querySelector('.current-player').src = 'pictures/circle.svg';
  }
};

document
  .querySelector('button:nth-child(1)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(2)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(3)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(4)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(5)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(6)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(7)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(8)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(9)')
  .addEventListener('click', playerTurn);
document
  .querySelector('button:nth-child(10)')
  .addEventListener('click', playerTurn);

document.querySelector('.restart').addEventListener('click', (e) => {
  const confirmRestart = confirm('Opravdu chceš restartovat celou hru?');
  if (confirmRestart === false) {
    e.preventDefault();
  }
});
