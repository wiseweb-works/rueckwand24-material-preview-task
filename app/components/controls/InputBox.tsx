import { useDesignState } from "../../hooks/useDesignState";

interface InputBoxProps {
  disabled?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ disabled }) => {
  const circles = useDesignState((s) => s.circles);
  const selectedCircleId = useDesignState((s) => s.selectedCircleId);
  const handleChangeX = useDesignState((s) => s.handleChangeX);
  const handleChangeY = useDesignState((s) => s.handleChangeY);
  const handleAddCircle = useDesignState((s) => s.handleAddCircle);
  const selectedCircle = circles.find((c) => c.id === selectedCircleId);
  const x = selectedCircle?.x ?? 0;
  const y = selectedCircle?.y ?? 0;

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-1">Kreisposition</h2>
        <p className="text-xs">Position des ausgewählten Kreises anpassen</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label htmlFor="x-position" className="text-xs font-medium">
            X-Position
          </label>
          <input
            type="number"
            value={Math.round(x)}
            onChange={(e) => handleChangeX(Number(e.target.value))}
            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm"
            placeholder="X-Koordinate"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="y-position" className="text-xs font-medium">
            Y-Position
          </label>
          <input
            type="number"
            value={Math.round(y)}
            onChange={(e) => handleChangeY(Number(e.target.value))}
            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm"
            placeholder="Y-Koordinate"
          />
        </div>
      </div>

      <button
        onClick={handleAddCircle}
        disabled={disabled}
        className="w-full font-semibold py-2 px-3 rounded-lg shadow-md"
      >
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Neuen Kreis hinzufügen
        </span>
      </button>

      {disabled && (
        <p className="text-xs text-center">
          Maximale Anzahl an Kreisen erreicht (5)
        </p>
      )}
    </div>
  );
};

export default InputBox;
