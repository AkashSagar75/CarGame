  import React, { useRef, useState, useEffect } from "react";
import '../CSS/Game.css'
 import music from '../images/music.mp3'

export default function Game() {
  const gameAreaRef = useRef(null);
  const scoreRef = useRef(null);
   const bgAudioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const player = useRef({ speed: 5, score: 0, x: 0, y: 0, startplay: false });
  const keys = useRef({ ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false });

  useEffect(() => {
    const keyDown = (e) => {
      e.preventDefault();
      keys.current[e.key] = true;
    };
    const keyUp = (e) => {
      e.preventDefault();
      keys.current[e.key] = false;
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  const isCollide = (a, b) => {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom ||
      aRect.left > bRect.right ||
      aRect.right < bRect.left
    );
  };

  const movelines = () => {
    const lines = gameAreaRef.current.querySelectorAll(".lines");
    lines.forEach((item) => {
      if (item.y > 700) {
        item.y -= 750;
      }
      item.y += player.current.speed;
      item.style.top = item.y + "px";
    });
  };

  const endGame = () => {
    player.current.startplay = false;
    setIsPlaying(false);
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0; 
    }
  };

  const moveEnemy = (car) => {
    const enemy = gameAreaRef.current.querySelectorAll(".enemy");
    enemy.forEach((item) => {
      if (isCollide(car, item)) {
        endGame();
      }
      if (item.y > 700) {
        item.y = -300;
        item.style.left = Math.floor(Math.random() * 370) + "px";
      }
      item.y += player.current.speed;
      item.style.top = item.y + "px";
    });
  };

  const gameplay = () => {
    const car = gameAreaRef.current.querySelector(".car");
    const road = gameAreaRef.current.getBoundingClientRect();

    if (player.current.startplay) {
      movelines();
      moveEnemy(car);

      if (keys.current.ArrowUp && player.current.y > road.top + 80) {
        player.current.y -= player.current.speed;
      }
      if (keys.current.ArrowDown && player.current.y < road.bottom - 110) {
        player.current.y += player.current.speed;
      }
      if (keys.current.ArrowLeft && player.current.x > 0) {
        player.current.x -= player.current.speed;
      }
      if (keys.current.ArrowRight && player.current.x < road.width - 50) {
        player.current.x += player.current.speed;
      }

      car.style.top = player.current.y + "px";
      car.style.left = player.current.x + "px";
      window.requestAnimationFrame(gameplay);

      player.current.score++;
      setScore(player.current.score - 1);
    }
  };
 

  const startPlay = () => {
bgAudioRef.current = new Audio(music);
    bgAudioRef.current.loop = true;
    bgAudioRef.current.play();

    setIsPlaying(true);

    gameAreaRef.current.innerHTML = "";
    player.current.startplay = true;
    player.current.score = 0; 
    window.requestAnimationFrame(gameplay);

    for (let x = 0; x < 5; x++) {
      let roadline = document.createElement("div");
      roadline.setAttribute("class", "lines");
      roadline.y = x * 150;
      roadline.style.top = roadline.y + "px";
      gameAreaRef.current.appendChild(roadline);
    }

    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameAreaRef.current.appendChild(car);
    player.current.x = car.offsetLeft;
    player.current.y = car.offsetTop;

    for (let x = 0; x < 3; x++) {
      let enemyCar = document.createElement("div");
      enemyCar.setAttribute("class", "enemy");
      enemyCar.y = (x + 1) * 330 * -1;
      enemyCar.style.top = enemyCar.y + "px";
      enemyCar.style.backgroundColor = randomColor();
      enemyCar.style.left = Math.floor(Math.random() * 370) + "px";
      gameAreaRef.current.appendChild(enemyCar);
    }
  };

  const randomColor = () => {
    const c = () => {
      let hex = Math.floor(Math.random() * 256).toString(16);
      return ("0" + String(hex)).substr(-2);
    };
    return "#" + c() + c() + c();
  };
   const dataFrom = sessionStorage.getItem('form Data')
  
     const parsedData  = JSON.parse(dataFrom)
     console.log(parsedData.name)

  
  return (
     <div className="carGames">
      <div className="Devname">
          <p>Name: {parsedData.name}</p>
        <p>UserName: {parsedData.username}</p>
       </div>
       <div className="scorebord">Your Score {score}</div>
       {!isPlaying && (
         <div id="Startscreen" onClick={startPlay}>
           Press here to start
           <br />
           Arrow keys to move
           <br />
           If you hit another car you will lose.
         </div>
       )}
       <div className="gameArea" ref={gameAreaRef}></div>
     </div>
     
  );
}
