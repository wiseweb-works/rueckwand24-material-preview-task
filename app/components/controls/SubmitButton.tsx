interface SubmitButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="mt-6 w-full rounded-xl bg-blue-600 text-white text-lg py-3 font-semibold shadow-lg transition-all duration-150 hover:bg-blue-700 active:scale-98 disabled:opacity-50"
    >
        Absenden
    </button>
);

export default SubmitButton;
