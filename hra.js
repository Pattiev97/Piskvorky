import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';
let currentPlayer = 'circle';
const squares = document.querySelectorAll('.square');

const playerTurn = async (e) => {
  e.target.disabled = true;
  if (currentPlayer === 'circle') {
    e.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    document.querySelector('.current-player').src = './pictures/cross.svg';
  } else {
    e.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    document.querySelector('.current-player').src = './pictures/circle.svg';
  }

  const playground = [...squares].map((item) => {
    if (item.classList.contains('board__field--circle')) {
      return 'o';
    } else if (item.classList.contains('board__field--cross')) {
      return 'x';
    } else {
      return '_';
    }
  });

  const returnWinner = async () => {
    const winner = findWinner(playground);
    if (winner === 'o' || winner === 'x') {
      alert(`Vyhrál hráč se symbolem "${winner}".`);
      location.reload();
    } else if (winner === 'tie') {
      alert('Hra skončila nerozhodně.');
    } else {
      if (currentPlayer === 'cross') {
        squares.forEach((squares) => {
          squares.disabled = true;
        });

        const response = await fetch(
          'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              board: playground,
              player: 'x',
            }),
          },
        );

        const data = await response.json();
        const { x, y } = data.position;
        const square = squares[x + y * 10];

        squares.forEach((square) => {
          if (
            square.classList.contains('board__field--circle') ||
            square.classList.contains('board__field--cross')
          ) {
            square.disabled = true;
          } else {
            square.disabled = false;
          }
        });

        square.click();
      }
    }
  };
  setTimeout(returnWinner, 100);
};

squares.forEach((square) => {
  square.addEventListener('click', playerTurn);
});

document.querySelector('.restart').addEventListener('click', (e) => {
  const confirmRestart = confirm('Pozor! Opravdu chceš restartovat celou hru?');
  if (confirmRestart === false) {
    e.preventDefault();
  }
});
