import React, { FC, useMemo } from "react";
import styles from "./box.module.scss";
import classNames from "classnames";
interface boxProps {
  value: number;
  snakeVal?: number;
  ladderVal?: number;
  active?: boolean;
  players : Array<{name:string,value:number,color:string}>
}
const Box: FC<boxProps> = ({ value, active, snakeVal, ladderVal ,players}) => {
  const objForColors = useMemo(()=>{
    const obj: { [key: number]: string } = {};  // Define the type
      players.forEach((val,index)=> obj[val.value] = val.color )
      return obj
  },[players])
  return (
    <td  className={classNames([
        styles.box,
        active ? styles.active : {},
        snakeVal ? styles.snakeClass : ladderVal ? styles.ladderClass : {},
      ])}
      style={objForColors[value] ? {borderRadius:'100%',backgroundColor:objForColors[value],borderColor:objForColors[value]} : {}}
    >
      {(snakeVal || ladderVal) && (
        <sub className={styles.stepper}> {snakeVal || ladderVal}</sub>
      )}
      
      <span className={styles.value}>{value}</span>
    </td>
  );
};

export default Box;
