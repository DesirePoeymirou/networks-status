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
    // {activity === 'connected' || activity === 'disconnected' &&
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
      <h5>{_name}</h5>
      <h6>{networkStatus ? "Connected" : "Disonnected"}</h6>
    </div>
  );
};

export default Network;
