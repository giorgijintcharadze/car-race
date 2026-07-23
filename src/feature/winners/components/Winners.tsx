import { useState } from "react";
import useQueryWinners from "../hooks/useQueryWinners";
import WinnersTable from "./WinnersTable";

const Winners = () => {
  const [page] = useState(1);

  const { data, isLoading, error } = useQueryWinners(page);
  const winners = data?.winners ?? [];

  if (isLoading) return <p className="text-center">loading...</p>;

  if (error) return <p className="text-center">error</p>;

  console.log(winners);

  return (
    <div className="text-center">
      Winners <WinnersTable winners={winners} />
    </div>
  );
};

export default Winners;
