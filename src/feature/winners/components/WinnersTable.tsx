import type { Winner, WinnerTableRow } from "../types/winner.types";

type WinnersTableProps = {
  winners: WinnerTableRow[];
};

const WinnersTable = ({ winners }: WinnersTableProps) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="mx-auto min-w-[700px] border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">№</th>
            <th className="border px-4 py-2">Car</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Wins</th>
            <th className="border px-4 py-2">Best time (s)</th>
          </tr>
        </thead>

        <tbody>
          {winners.map((winner, index) => (
            <tr key={winner.id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>

              <td className="border px-4 py-2">
                <div
                  className="mx-auto h-6 w-6 rounded-full border"
                  style={{ backgroundColor: winner.color }}
                />
              </td>

              <td className="border px-4 py-2">{winner.name}</td>

              <td className="border px-4 py-2">{winner.wins}</td>

              <td className="border px-4 py-2">{winner.time.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WinnersTable;
