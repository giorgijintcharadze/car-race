import type { CSSProperties } from "react";
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

type SortButtonProps = {
  disabled: boolean;
  field: WinnerSort;
  label: string;
  order: SortOrder;
  sort: WinnerSort;
  onSort: (field: WinnerSort) => void;
};

const SortButton = ({ disabled, field, label, order, sort, onSort }: SortButtonProps) => (
  <button type="button" disabled={disabled} onClick={() => onSort(field)}>
    {label} <span aria-hidden="true">↕</span>
    <span className="sr-only">
      {sort === field && (order === "ASC" ? "ascending" : "descending")}
    </span>
  </button>
);

const WinnersTable = ({ winners, page, sort, order, disabled, onSort }: WinnersTableProps) => (
  <div className="winners-table-wrap">
    <table className="winners-table">
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Icon</th>
          <th scope="col">Name</th>
          <th scope="col">
            <SortButton {...{ disabled, order, sort, onSort }} field="wins" label="Wins" />
          </th>
          <th scope="col">
            <SortButton {...{ disabled, order, sort, onSort }} field="time" label="Best time (s)" />
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={winner.id} style={{ "--winner-accent": winner.color } as CSSProperties}>
            <td>{(page - 1) * WINNERS_LIMIT_PAGE + index + 1}</td>
            <td>
              <CarIcon color={winner.color} name={winner.name} className="winner-car" />
            </td>
            <td>{winner.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.time.toFixed(WINNER_TIME_DECIMALS)}s</td>
          </tr>
        ))}
      </tbody>
    </table>
    {winners.length === 0 && <p className="empty-state">No winners yet. Start a race!</p>}
  </div>
);

export default WinnersTable;
