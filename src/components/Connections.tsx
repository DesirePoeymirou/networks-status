import { useState, useEffect } from "react";
import axios from "axios";

type Network = {
  name: string;
  obj: object;
};

const Connections: React.FC = () => {
  const [isLoading, setIsLoading]: [boolean, (isLoading: boolean) => void] =
    useState<boolean>(false);
  const [error, setError]: [string, (error: string) => void] = useState("");

  let [networks, setNetworks] = useState<object>({});

  useEffect(() => {
    axios("https://app.subsocial.network/subid/api/v1/chains/properties")
      .then((response: any) => {
        // console.log(response.data);
        setIsLoading(true);
        // setPhotos(response.data.photos);
        setNetworks(response.data);
      })
      .catch((error: any) => {
        console.log("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        // setFirstCall(false);
        // for (const [key, value] of Object.entries(networks)) {
        //   console.log(`${key}: ${JSON.stringify(value)}`);
        // }
        setIsLoading(false);
        // console.log(photos);
      });
  }, []);
  // console.log(networks)`

  return (
    <div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {/* {networks.map((network: any) => <div key={network.name}>{network.name}</div>)} */}
      {!isLoading && Object.entries(networks).map(([k, v], index) => (
        <div key={index}>{`${k}: ${JSON.stringify(v)}`}</div>
      ))}
    </div>
  );
};

export default Connections;
