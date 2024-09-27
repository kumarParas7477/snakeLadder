import React, { FC } from "react";
import styles from "./selectPlayers.module.scss";

interface props {
  setPlayers: (value: number) => void;
}
const SelectPlayers: FC<props> = ({ setPlayers }) => {
  const handleSelectPlayers = (e: any) => {
    e.preventDefault();
    setPlayers(e.target.value);
  };
  return (
    <div className={styles.content}>
    <ul className={styles.list} onClick={handleSelectPlayers}>
      <li value={2}>Players 2</li>
      <li value={3}>Players 3</li>
      <li value={4}>Players 4</li>
      <li value={5}>Player 5</li>
    </ul>
    </div>
  );
};

export default SelectPlayers;
