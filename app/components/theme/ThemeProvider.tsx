'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ColorPalette = 'default' | 'ocean' | 'forest' | 'sunset' | 'royal' | 'rose';

interface ThemeContextType {
    theme: Theme;
    colorPalette: ColorPalette;
    setTheme: (theme: Theme) => void;
    setColorPalette: (palette: ColorPalette) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme muss innerhalb eines ThemeProvider verwendet werden');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [colorPalette, setColorPalette] = useState<ColorPalette>('default');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const savedPalette = localStorage.getItem('colorPalette') as ColorPalette;

        if (savedTheme) setTheme(savedTheme);
        if (savedPalette) setColorPalette(savedPalette);
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        root.removeAttribute('data-theme');

        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        }

        if (colorPalette !== 'default') {
            const currentTheme = root.getAttribute('data-theme') || '';
            const newTheme = currentTheme ? `${currentTheme} ${colorPalette}` : colorPalette;
            root.setAttribute('data-theme', newTheme);
        }

        localStorage.setItem('theme', theme);
        localStorage.setItem('colorPalette', colorPalette);
    }, [theme, colorPalette]);

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light';

            if (newTheme === 'dark') {
                setColorPalette('default');
            }
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colorPalette,
                setTheme,
                setColorPalette,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
