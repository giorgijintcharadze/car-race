type PaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({ page, onPrev, onNext, totalPages }: PaginationProps) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="rounded-md border border-gray-400 px-4 py-2 text-sm font-medium transition
                   hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ⏮ Prev
      </button>

      <div className="min-w-24 rounded-md border border-gray-300 px-4 py-2 text-center font-semibold">
        Page {page}
      </div>

      <button
        disabled={page === totalPages || totalPages === 0}
        onClick={onNext}
        className="rounded-md border border-gray-400 px-4 py-2 text-sm font-medium transition
                   hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next ⏭
      </button>
    </div>
  );
};

export default Pagination;
