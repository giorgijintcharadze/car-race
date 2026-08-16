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
    <div className="winner-overlay" role="dialog" aria-modal>
      <button
        type="button"
        aria-label="Close winner announcement"
        className="winner-backdrop"
        onClick={onClose}
      />
      <div className="winner-dialog">
        <span className="winner-trophy" aria-hidden="true">
          ♜
        </span>
        <p className="winner-kicker">Current winner</p>
        <h2>{winner.carName}</h2>
        <p>Race completed in {winner.time.toFixed(WINNER_TIME_DECIMALS)} seconds</p>
        <button className="primary-action" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerBanner;
