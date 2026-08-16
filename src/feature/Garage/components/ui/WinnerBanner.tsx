import { useEffect } from "react";
import { WINNER_BANNER_DURATION_MS, WINNER_TIME_DECIMALS } from "../../../../utils/constants";
import type { RaceWinner } from "../../types/engine.types";

type WinnerBannerProps = {
  winner: RaceWinner | null;
  onClose: () => void;
};

const WinnerBanner = ({ winner, onClose }: WinnerBannerProps) => {
  useEffect(() => {
    if (!winner) {
      return undefined;
    }

    const timer = window.setTimeout(onClose, WINNER_BANNER_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [winner, onClose]);

  if (!winner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal>
      <button
        type="button"
        aria-label="Close winner announcement"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative rounded-lg bg-yellow-500 px-8 py-6 text-center shadow-2xl">
        <h2>Winner</h2>
        <p>{winner.carName} won the race!</p>
        <p>Time: {winner.time.toFixed(WINNER_TIME_DECIMALS)} seconds</p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerBanner;
