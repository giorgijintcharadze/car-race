type PaginationProps = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({ page, onPrev, onNext, totalPages, disabled = false }: PaginationProps) => (
  <div className="mt-6 flex items-center justify-center gap-4">
    <button type="button" onClick={onPrev} disabled={disabled || page <= 1}>
      Previous
    </button>
    <p>
      Page {totalPages === 0 ? 0 : page} of {totalPages}
    </p>
    <button
      type="button"
      onClick={onNext}
      disabled={disabled || totalPages === 0 || page >= totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
