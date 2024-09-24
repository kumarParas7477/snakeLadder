import React, { FC } from "react";
import styles from "./selectPlayers.module.scss"
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
        <span>Select No Players</span>
    <ul className={styles.list} onClick={handleSelectPlayers}>
      <li value={2}>2</li>
      <li value={3}>3</li>
      <li value={4}>4</li>
      <li value={5}>5</li>
    </ul>
    </div>
  );
};

export default SelectPlayers;
