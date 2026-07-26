import { useEffect } from "react";

type WinnerBannerProps = {
  winner: {
    carName: string;
    time: number;
  } | null;
  onClose: () => void;
};

const WinnerBanner = ({ winner, onClose }: WinnerBannerProps) => {
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [winner, onClose]);

  if (!winner) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-2xl px-8 py-6 max-w-md text-center animate-bounce">
        <h2 className="text-3xl font-bold text-white mb-2">🏆 WINNER! 🏆</h2>
        <p className="text-xl text-white mb-4">
          <span className="font-bold">{winner.carName}</span> won the race!
        </p>
        <p className="text-2xl font-bold text-white mb-6">
          ⏱️ Time: <span className="text-yellow-900">{winner.time.toFixed(2)}s</span>
        </p>
        <button
          onClick={onClose}
          className="bg-white text-yellow-600 px-6 py-2 rounded font-bold hover:bg-yellow-100 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerBanner;
