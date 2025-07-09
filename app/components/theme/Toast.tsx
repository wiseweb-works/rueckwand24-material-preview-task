interface ToastProps {
    show: boolean;
    message: string;
}

const Toast: React.FC<ToastProps> = ({ show }) => {
    return (
        <div
            className={`fixed left-0 right-0 mx-auto z-[9999] flex justify-center pointer-events-none transition-all duration-400 ${
                show ? 'top-8 opacity-100' : 'top-0 opacity-0'
            }`}
            role="status"
            aria-live="polite"
            aria-hidden={!show}
        >
            <div
                className="bg-card text-primary border border-primary/20 shadow-lg"
                style={{
                    borderRadius: 16,
                    padding: '14px 32px',
                    fontWeight: 600,
                    fontSize: 17,
                    minWidth: 220,
                    textAlign: 'center',
                }}
            >
                Daten wurden erfolgreich gesendet!
            </div>
        </div>
    );
};

export default Toast;
