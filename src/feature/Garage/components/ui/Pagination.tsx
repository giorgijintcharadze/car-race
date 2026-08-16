type PaginationProps = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({ page, onPrev, onNext, totalPages, disabled = false }: PaginationProps) => (
  <div className="pagination" aria-label="Pagination">
    <button
      type="button"
      className="pagination-control"
      onClick={onPrev}
      disabled={disabled || page <= 1}
    >
      Prev
    </button>
    <p className="pagination-status">
      <span>{totalPages === 0 ? 0 : page}</span>
      <small>/</small>
      <span>{totalPages}</span>
    </p>
    <button
      type="button"
      className="pagination-control"
      onClick={onNext}
      disabled={disabled || totalPages === 0 || page >= totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
