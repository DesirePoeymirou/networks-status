import { useState, useEffect } from "react";
import axios from "axios";
import { REFRESH_STATUS } from "../constants";
import styles from "../styles/Network.module.css";

interface IProps {
  _name: string;
  _icon: string;
  activity: string;
}

const Network: React.FC<IProps> = ({ _name, _icon, activity }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [networkStatus, setNetworkStatus] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      load();
    }, REFRESH_STATUS);
    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    try {
      const res = await axios.get(
        `https://app.subsocial.network/subid/api/v1/check/${_name.toLowerCase()}`
      );
      setNetworkStatus(res.data);
    } catch (_error: any) {
      setError(_error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
            <div className={styles.name}>{_name}</div>
            <div className={styles.footer}>
              <div>{networkStatus ? "Connected" : "Disonnected"}</div>
              <div
                className={`${styles.statusSquare} ${
                  networkStatus
                    ? styles.squareConnected
                    : styles.squareDisconnected
                }`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Network;
