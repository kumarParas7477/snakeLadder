import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Box from "../Box";
import styles from "./board.module.css";
interface props {
  noOfPlayers: number;
}
const Board: FC<props> = ({ noOfPlayers }) => {
  const playersList : Array<any> = useMemo(() => {
    return [
      { name: "player1", value: 1, color: "yellow" },
      { name: "player2", value: 1, color: "red" },
      { name: "player3", value: 1, color: "blue" },
      { name: "player4", value: 1, color: "violet" },
      { name: "player5", value: 1, color: "plum" },
    ];
  }, []);
  const [players, setPlayers] = useState(playersList.slice(0,noOfPlayers));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [buttonVal, setButtonVal] = useState<string>("Roll Dice");
  const boxes = useMemo(() => {
    const arr = Array.from({ length: 10 }, (_, i) =>
      Array.from({ length: 10 }, (_, j) => i * 10 + j + 1)
    );
    return arr;
  }, []);
  const getRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const snakeBites = useMemo(() => {
    const points = new Map();
    while (points.size < 8) {
      const start = getRandomValue(10, 99);
      const end = getRandomValue(1, start);
      points.set(start, end);
    }
    return points;
  }, []);

  const ladderPoints = useMemo(() => {
    const points = new Map();
    while (points.size < 8) {
      const start = getRandomValue(10, 85);
      const end = getRandomValue(start, 99);
      points.set(start, end);
    }
    return points;
  }, []);
  const stepper = useCallback((current: number, nextval: number) => {
    const intervalId = setInterval(() => {
      if (current !==nextval) {
        current > nextval ? current-- : current++;
        const list = [...players];
        list[currentPlayer].value = current;
        setPlayers(list);   
      } else {
        clearInterval(intervalId); // Stop once it reaches nextval
        const ladder = ladderPoints.get(nextval);
        if (ladder) {
          stepper(current, ladder);
        }
        const didSnakeBite = snakeBites.get(nextval);
        if (didSnakeBite) {
          stepper(current, didSnakeBite);
        }
        setButtonVal("Roll Dice");
        setCurrentPlayer((currentPlayer) =>currentPlayer ===noOfPlayers-1 ? 0 : currentPlayer+1)
      }
    }, 500);
  }, [currentPlayer]);
  const rollDice = () => {
    const number = getRandomValue(1, 6);
    setButtonVal(number.toString());
    if(players[currentPlayer].value ===1 && number !==1){
      setTimeout(()=>{setButtonVal("Roll Dice")
      setCurrentPlayer((currentPlayer) =>currentPlayer ===noOfPlayers-1 ? 0 : currentPlayer+1)},1000)
      return;
    }
    let current = players[currentPlayer].value;
    let nextval = current + number;
    stepper(current, nextval);
  };
  const buttonDisabled = useMemo(
    () => !players || Object.keys(players).length ===0 || buttonVal !=='Roll Dice',
    [players,buttonVal]
  );
  return (
    <>
      <div className={styles.board}>
       
        <table>
          {boxes.map((row1, index) => (
            <tr key={index}>
              {row1.map((val, index) => (
                <Box
                  active={val ===players[currentPlayer].value}
                  snakeVal={snakeBites.get(val)}
                  ladderVal={ladderPoints.get(val)}
                  key={val}
                  players={players}
                  value={val}
                />
              ))}
            </tr>
          ))}
        </table>
      </div>
       <div className={styles.currentPlayer}>currentPlayer : {players[currentPlayer].name}</div>
      <button
        disabled={buttonDisabled}
        onClick={rollDice}
        className={styles.dice}
      >
        {buttonVal}
      </button>
    </>
  );
};

export default Board;
