import InputBox from "./InputBox";
import MaterialSelector, { MaterialOption } from "./MaterialSelector";
import { useDesignState } from "../../hooks/useDesignState";

interface ControlsSectionProps {
  maxCircles: number;
  materialOptions: MaterialOption[];
}

const ControlsSection: React.FC<ControlsSectionProps> = ({
  maxCircles,
  materialOptions,
}) => {
  const circles = useDesignState((s) => s.circles);
  const handleSubmit = useDesignState((s) => s.handleSubmit);

  return (
    <div className="w-full space-y-6">
      <div className="border rounded-3xl p-6 shadow-xl">
        <InputBox disabled={circles.length >= maxCircles} />
      </div>

      <div className="border rounded-3xl shadow-xl overflow-hidden">
        <MaterialSelector materials={materialOptions} />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-2xl shadow-lg "
      >
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Design absenden
        </span>
      </button>
    </div>
  );
};

export default ControlsSection;
