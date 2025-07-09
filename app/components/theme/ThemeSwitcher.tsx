'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export type ColorPalette = 'default' | 'ocean' | 'forest' | 'sunset' | 'royal' | 'rose';

const ThemeSwitcher: React.FC = () => {
    const { theme, colorPalette, setColorPalette, toggleTheme } = useTheme();
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const paletteRef = useRef<HTMLDivElement>(null);

    const colorPalettes: { id: ColorPalette; name: string; color: string }[] = [
        { id: 'default', name: 'Default', color: '#3b82f6' },
        { id: 'ocean', name: 'Ocean', color: '#0ea5e9' },
        { id: 'forest', name: 'Forest', color: '#10b981' },
        { id: 'sunset', name: 'Sunset', color: '#f97316' },
        { id: 'royal', name: 'Royal', color: '#8b5cf6' },
        { id: 'rose', name: 'Rose', color: '#ec4899' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
                setIsPaletteOpen(false);
            }
        };

        if (isPaletteOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPaletteOpen]);

    const handlePaletteClick = () => {
        setIsPaletteOpen(!isPaletteOpen);
    };

    const handlePaletteSelect = (paletteId: ColorPalette) => {
        setColorPalette(paletteId);
        setIsPaletteOpen(false);
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={`Wechsle zum ${theme === 'light' ? 'dunklen' : 'hellen'} Modus`}
                title={`Wechsle zum ${theme === 'light' ? 'dunklen' : 'hellen'} Modus`}
            >
                {theme === 'light' ? (
                    <svg
                        className="w-5 h-5 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                )}
            </button>

            {theme === 'light' && (
                <div className="relative" ref={paletteRef}>
                    <button
                        onClick={handlePaletteClick}
                        className="p-3 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Farbpalette auswählen"
                        aria-expanded={isPaletteOpen}
                        aria-haspopup="listbox"
                        title="Farbpalette auswählen"
                    >
                        <div
                            className="w-5 h-5 rounded-full border-2 border-border"
                            style={{
                                backgroundColor: colorPalettes.find(p => p.id === colorPalette)
                                    ?.color,
                            }}
                        />
                    </button>

                    <div
                        className={`absolute right-0 top-full mt-2 transition-all duration-200 transform ${
                            isPaletteOpen
                                ? 'opacity-100 visible scale-100'
                                : 'opacity-0 invisible scale-95'
                        }`}
                        role="listbox"
                        aria-label="Farbpaletten-Optionen"
                        aria-hidden={!isPaletteOpen}
                    >
                        <div className="bg-card border border-border rounded-xl shadow-xl p-3 min-w-[220px]">
                            <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-2 border-b border-border">
                                Color Palette
                            </div>
                            <div
                                className="space-y-1"
                                role="group"
                                aria-label="Verfügbare Farbpaletten"
                            >
                                {colorPalettes.map(palette => (
                                    <button
                                        key={palette.id}
                                        onClick={() => handlePaletteSelect(palette.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 ${
                                            colorPalette === palette.id
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'hover:bg-accent text-foreground hover:scale-[1.02]'
                                        }`}
                                        role="option"
                                        aria-selected={colorPalette === palette.id}
                                        aria-label={`${palette.name} Farbpalette auswählen`}
                                    >
                                        <div
                                            className="w-4 h-4 rounded-full border border-border shadow-sm"
                                            style={{ backgroundColor: palette.color }}
                                            aria-hidden="true"
                                        />
                                        <span className="font-medium">{palette.name}</span>
                                        {colorPalette === palette.id && (
                                            <svg
                                                className="w-4 h-4 ml-auto"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;
