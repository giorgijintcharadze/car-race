import { useAppStore, useInteractionLocked } from "../../../store/useAppStore";
import { WINNERS_LIMIT_PAGE } from "../../../utils/constants";
import Pagination from "../../Garage/components/ui/Pagination";
import useQueryWinners from "../hooks/useQueryWinners";
import type { WinnerSort } from "../types/winner.types";
import WinnersTable from "./WinnersTable";

type WinnersPaginationProps = {
  disabled: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

const WinnersPagination = ({ disabled, page, totalPages, setPage }: WinnersPaginationProps) => (
  <Pagination
    page={page}
    totalPages={totalPages}
    disabled={disabled}
    onPrev={() => setPage(page - 1)}
    onNext={() => setPage(page + 1)}
  />
);

const Winners = () => {
  const store = useAppStore();
  const disabled = useInteractionLocked();
  const query = useQueryWinners(store.winnersPage, store.winnerSort, store.winnerOrder);
  const totalPages = Math.ceil((query.data?.total ?? 0) / WINNERS_LIMIT_PAGE);

  const handleSort = (field: WinnerSort) => {
    if (store.winnerSort === field) {
      store.setWinnerOrder(store.winnerOrder === "ASC" ? "DESC" : "ASC");
    } else {
      store.setWinnerSort(field);
      store.setWinnerOrder("ASC");
    }
    store.setWinnersPage(1);
  };

  if (query.isLoading) {
    return <p>Loading winners...</p>;
  }
  if (query.error) {
    return <p>Could not load winners.</p>;
  }

  return (
    <div className="text-center">
      <h1>Winners</h1>
      <WinnersTable
        winners={query.data?.winners ?? []}
        page={store.winnersPage}
        sort={store.winnerSort}
        order={store.winnerOrder}
        disabled={disabled}
        onSort={handleSort}
      />
      <WinnersPagination
        page={store.winnersPage}
        totalPages={totalPages}
        disabled={disabled}
        setPage={store.setWinnersPage}
      />
    </div>
  );
};

export default Winners;
