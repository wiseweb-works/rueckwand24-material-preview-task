interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="mt-6 w-full rounded-xl bg-blue-600 text-white text-lg py-3 font-semibold"
  >
    Absenden
  </button>
);

export default SubmitButton;
