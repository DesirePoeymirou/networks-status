import { useState, useEffect } from "react";
import axios from "axios";
import Network from "./Network";
import styles from "../styles/Connections.module.css";

interface IProps {
  activity: string;
}

const Connections: React.FC<IProps> = ({ activity }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [networks, setNetworks] = useState<object>({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { data } = await axios.get(
        "https://app.subsocial.network/subid/api/v1/chains/properties"
      );
      setNetworks(data);
    } catch (error: any) {
      setError(error);
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
        <div className={styles.networks}>
          {Object.entries(networks).map(
            ([k, v], index) =>
              v.tokenSymbol &&
              v.tokenDecimals && (
                <Network
                  key={index + k}
                  _name={v.name}
                  _icon={v.icon}
                  activity={activity}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Connections;
