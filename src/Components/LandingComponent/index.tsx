import { useState } from "react";
import Board from "../Board";
import SelectPlayers from "../selectPlayers";
import { IPlayer } from "../../types";
import styles from "./landing.module.scss";
const list: Array<any> = [
  { name: "player1", value: 1, color: "yellow" },
  { name: "player2", value: 1, color: "red" },
  { name: "player3", value: 1, color: "blue" },
  { name: "player4", value: 1, color: "violet" },
  { name: "player5", value: 1, color: "plum" },
];
const LandingComponent = () => {

  const [players, setPlayers] = useState<IPlayer[]>([]);
  const handleSelectPlayers = (val: number) => {
    setPlayers(list.slice(0, val));
  };

  return (
    <div className={styles.landingPage}>
      {players.length == 0 ?<SelectPlayers setPlayers={handleSelectPlayers} /> : null}
      {players.length ? <Board initialPlayers={players} /> : null}
    </div>
  );
};


export default LandingComponent;