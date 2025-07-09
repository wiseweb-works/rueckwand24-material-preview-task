import { useDesignState } from '../../hooks/useDesignState';

interface InputBoxProps {
    disabled?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ disabled }) => {
    const circles = useDesignState(s => s.circles);
    const selectedCircleId = useDesignState(s => s.selectedCircleId);
    const handleChangeX = useDesignState(s => s.handleChangeX);
    const handleChangeY = useDesignState(s => s.handleChangeY);
    const handleAddCircle = useDesignState(s => s.handleAddCircle);
    const selectedCircle = circles.find(c => c.id === selectedCircleId);
    const x = selectedCircle?.x ?? 0;
    const y = selectedCircle?.y ?? 0;

    return (
        <div className="space-y-3" role="region" aria-label="Kreispositionseinstellungen">
            <div className="text-center">
                <h2
                    className="text-lg font-semibold text-foreground mb-1"
                    id="circle-position-title"
                >
                    Kreisposition
                </h2>
                <p className="text-xs text-muted-foreground">
                    Position des ausgewählten Kreises anpassen
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <label htmlFor="x-position" className="text-xs font-medium text-foreground">
                        X-Position
                    </label>
                    <input
                        id="x-position"
                        type="number"
                        value={Math.round(x)}
                        onChange={e => handleChangeX(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="X-Koordinate"
                        step="1"
                        aria-describedby="circle-position-title"
                        aria-label="X-Koordinate des ausgewählten Kreises"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="y-position" className="text-xs font-medium text-foreground">
                        Y-Position
                    </label>
                    <input
                        id="y-position"
                        type="number"
                        value={Math.round(y)}
                        onChange={e => handleChangeY(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="Y-Koordinate"
                        step="1"
                        aria-describedby="circle-position-title"
                        aria-label="Y-Koordinate des ausgewählten Kreises"
                    />
                </div>
            </div>

            <button
                onClick={handleAddCircle}
                disabled={disabled}
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Neuen Kreis zum Design hinzufügen"
                aria-describedby={disabled ? 'max-circles-message' : undefined}
            >
                <span className="flex items-center justify-center gap-2">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
                <p
                    id="max-circles-message"
                    className="text-sm text-red-500 font-bold text-center"
                    role="status"
                >
                    Maximale Anzahl an Kreisen erreicht (5)
                </p>
            )}
        </div>
    );
};

export default InputBox;
