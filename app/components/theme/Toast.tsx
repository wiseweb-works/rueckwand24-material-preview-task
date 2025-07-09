interface ToastProps {
  show: boolean;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ show }) => {
  return (
    <div className="fixed top-8 left-0 right-0 mx-auto z-50 flex justify-center pointer-events-none transition-opacity duration-400">
      <div className="bg-card text-primary border border-primary/20 shadow-lg">
        Daten wurden erfolgreich gesendet!
      </div>
    </div>
  );
};

export default Toast;
