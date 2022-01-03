import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../modules/Network.module.css";

interface IProps {
  _name: string;
  _icon: string;
  activity: string;
}

const Network: React.FC<IProps> = ({ _name, _icon, activity }) => {
  // const [status, setStatus]: [boolean, (status: boolean) => void] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(false);
  const [error, setError]: [string, (error: string) => void] = useState("");

  useEffect(() => {
    axios(
      `https://app.subsocial.network/subid/api/v1/check/${_name.toLowerCase()}`
    )
      .then((response: any) => {
        setNetworkStatus(response.data);
      })
      .catch((_error: any) => {
        console.log("Error fetching data: ", error);
        setError(_error);
      })
      .finally(() => {});
  }, []);

  return (
    <div
      className={`${
        ((activity === "connected" && !networkStatus) ||
          (activity === "disconnected" && networkStatus)) &&
        styles.hide
      } ${styles.network} ${
        networkStatus ? styles.connected : styles.disconnected
      }`}
    >
      <img
        className={styles.img}
        src={`https://sub.id/images/${_icon}`}
        alt={_name}
      />
      <div className={styles.info}>
        <div>{_name}</div>
        <div className={styles.footer}>
          <div>{networkStatus ? "Connected" : "Disonnected"}</div>
          <div
            className={`${styles.statusSquare} ${
              networkStatus ? styles.squareConnected : styles.squareDisconnected
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Network;
