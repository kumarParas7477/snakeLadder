import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Box from "../Box";
import styles from "./board.module.css";
import SelectPlayers from "../selectPlayers";
import { IPlayer } from "../../types";

interface props {
  initialPlayers: IPlayer[];
}

const Board: FC<props> = ({ initialPlayers }) => {
  const [winner,setWinner] = useState<string | null>(null)
  const [players, setPlayers] = useState<any[]>(initialPlayers);
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

  const stepper = useCallback(
    (current: number, nextval: number) => {
      const intervalId = setInterval(() => {
        if (current !== nextval) {
          current > nextval ? current-- : current++;
          const list = [...players];
          list[currentPlayer].value = current;
          setPlayers(list);
          if(current == 100){
            setWinner(players[currentPlayer].name);
            setButtonVal('Reload');
            clearInterval(intervalId);
            return;
          }
        } else {
          clearInterval(intervalId); // Stop once it reaches nextval
          const ladder = ladderPoints.get(nextval);
          const didSnakeBite = snakeBites.get(nextval);
          if (ladder) {
            stepper(current, ladder);
          }
          else if (didSnakeBite) {
            stepper(current, didSnakeBite);
          }
          else{
            setButtonVal("Roll Dice");
          setCurrentPlayer((currentPlayer) =>
            currentPlayer === players.length - 1 ? 0 : currentPlayer + 1
          );
          }
        }
      }, 100);
    },
    [currentPlayer,initialPlayers]
  );

  const rollDice = () => {
    if(winner){
      window.location.reload()
    }
    const number = getRandomValue(1, 6);
    setButtonVal(number.toString());
    if (players[currentPlayer].value === 1 && number !== 1) {
      setTimeout(() => {
        setButtonVal("Roll Dice");
        setCurrentPlayer((currentPlayer) =>
          currentPlayer === players.length - 1 ? 0 : currentPlayer + 1
        );
      }, 1000);
      return;
    }
    let current = players[currentPlayer].value;
    let nextval = current + number;
    stepper(current, nextval);
  };

  const buttonDisabled = useMemo(
    () =>
      players.length === 0 ||
      (buttonVal !== "Roll Dice" && buttonVal !== 'Reload'),
    [players, buttonVal,buttonVal]
  );

  const getTable = useCallback(() => {
    return (
      <table>
        <tbody>
          {boxes.map((row1, index) => (
            <tr key={index}>
              {row1.map((val, index) => (
                <Box
                  active={val === players[currentPlayer]?.value}
                  snakeVal={snakeBites.get(val)}
                  ladderVal={ladderPoints.get(val)}
                  key={val}
                  players={players}
                  value={val}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },[initialPlayers,currentPlayer,players]);
  return (
    <> 
      {winner && <span className={styles.winner}>{`${winner} won the game!!`}</span>}
      <div className={styles.board}>{getTable()}</div>
      {players.length !== 0 && (
        <div className={styles.diceAndPlayer}>
          <div className={styles.currentPlayer}>
            currentPlayer : {players[currentPlayer]?.name}
          </div>
          <button
            disabled={buttonDisabled}
            onClick={rollDice}
            className={styles.dice}
          >
            {buttonVal}
          </button>
        </div>
      )}
    </>
  );
};

export default Board;
