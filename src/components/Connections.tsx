import { useState, useEffect } from "react";
import axios from "axios";
import Network from "./Network";
import styles from "../modules/Connections.module.css";

interface IProps {
  activity: string;
}

const Connections: React.FC<IProps> = ({ activity }) => {
  const [isLoading, setIsLoading]: [boolean, (isLoading: boolean) => void] =
    useState<boolean>(false);
  const [error, setError]: [string, (error: string) => void] = useState("");

  let [networks, setNetworks] = useState<object>({});

  useEffect(() => {
    axios("https://app.subsocial.network/subid/api/v1/chains/properties")
      .then((response: any) => {
        setIsLoading(true);
        setNetworks(response.data);
      })
      .catch((error: any) => {
        console.log("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className={styles.networks}>
          {Object.entries(networks).map(
            ([k, v], index) =>
              v.tokenSymbol &&
              v.tokenDecimals && (
                <Network key={index + k} _name={v.name} _icon={v.icon} activity={activity} />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Connections;
