document.addEventListener('DOMContentLoaded' , () => {
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;


  function startGame() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'    
  }
  let timerID = setInterval(startGame,20);

  function control(e)  {
    if (e.keyCode === 32) {
        jump()
    }    
  }

  /* Have the bird go up to fight against the gravity */
  function jump() {
    if (birdBottom < 500) birdBottom += 50; 
    bird.style.bottom = birdBottom + 'px';
    console.log(birdBottom)
  }
  
  document.addEventListener('keyup', control)
  
  /* Generate Obstacles */
  function generateObstacle() {
    let obstacleLeft = 500;
    /* Genereate obstacle at random intervals and at random heights. */
    let randomHeight = Math.random() * 60;    
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement('div')
    obstacle.classList.add('obstacle')
    gameDisplay.appendChild(obstacle)
    obstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'

  /* Move obstale from right to left. */
    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px'

      /* Stope the obstacle from going past the left border outside of view. */
      if (obstacleLeft === -60) {
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
      }

    }
    let timerId = setInterval(moveObstacle, 20);    
    
  
  }
  generateObstacle()

  
})