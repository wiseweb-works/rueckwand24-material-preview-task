const BackgroundPattern: React.FC = () => {
    return (
        <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>
    );
};

export default BackgroundPattern;
