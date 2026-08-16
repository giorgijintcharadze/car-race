import { WINNERS_LIMIT_PAGE, WINNER_TIME_DECIMALS } from "../../../utils/constants";
import CarIcon from "../../Garage/components/ui/CarIcon";
import type { SortOrder, WinnerSort, WinnerTableRow } from "../types/winner.types";

type WinnersTableProps = {
  winners: WinnerTableRow[];
  page: number;
  sort: WinnerSort;
  order: SortOrder;
  disabled: boolean;
  onSort: (field: WinnerSort) => void;
};

const WinnersTable = ({ winners, page, sort, order, disabled, onSort }: WinnersTableProps) => (
  <div className="mt-6 overflow-x-auto">
    <table className="mx-auto min-w-[700px] border-collapse border border-gray-300">
      <thead>
        <tr>
          <th scope="col">Number</th>
          <th scope="col">Car</th>
          <th scope="col">Name</th>
          <th scope="col">
            <button type="button" disabled={disabled} onClick={() => onSort("wins")}>
              Wins {sort === "wins" && (order === "ASC" ? "ascending" : "descending")}
            </button>
          </th>
          <th scope="col">
            <button type="button" disabled={disabled} onClick={() => onSort("time")}>
              Best time {sort === "time" && (order === "ASC" ? "ascending" : "descending")}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={winner.id}>
            <td>{(page - 1) * WINNERS_LIMIT_PAGE + index + 1}</td>
            <td>
              <CarIcon color={winner.color} name={winner.name} className="mx-auto h-8 w-16" />
            </td>
            <td>{winner.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.time.toFixed(WINNER_TIME_DECIMALS)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {winners.length === 0 && <p>No winners yet.</p>}
  </div>
);

export default WinnersTable;
