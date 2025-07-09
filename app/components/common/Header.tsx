const Header = () => {
    return (
        <header className="relative z-10 pt-8 pb-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                    Material Design Studio
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto">
                    Interaktives Tool zur Materialauswahl und Platzierung von Markierungen für
                    Designprojekte
                </p>
            </div>
        </header>
    );
};

export default Header;
