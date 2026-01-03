import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    dark: {
        id: 'dark',
        name: 'Midnight',
        bg: 'bg-slate-950',
        text: 'text-slate-100',
        subtext: 'text-slate-400',
        card: 'bg-slate-900/50',
        border: 'border-slate-800/50',
        input: 'bg-slate-800/50 border-slate-700',
        accent: 'from-cyan-600 to-blue-600',
        accentText: 'text-cyan-400',
        ring: 'ring-cyan-500',
        gradient: 'from-slate-900 via-slate-950 to-black',
    },
    light: {
        id: 'light',
        name: 'Clean',
        bg: 'bg-gray-50',
        text: 'text-gray-900',
        subtext: 'text-gray-500',
        card: 'bg-white',
        border: 'border-gray-200',
        input: 'bg-white border-gray-300',
        accent: 'from-indigo-600 to-violet-600',
        accentText: 'text-indigo-600',
        ring: 'ring-indigo-500',
        gradient: 'from-gray-50 to-gray-100',
    },
    ocean: {
        id: 'ocean',
        name: 'Ocean',
        bg: 'bg-slate-900',
        text: 'text-sky-50',
        subtext: 'text-sky-300/80',
        card: 'bg-slate-800/40',
        border: 'border-sky-700/30',
        input: 'bg-slate-800/50 border-sky-700/50',
        accent: 'from-sky-500 to-teal-500',
        accentText: 'text-sky-400',
        ring: 'ring-sky-500',
        gradient: 'from-slate-900 via-sky-950 to-slate-900',
    },
    forest: {
        id: 'forest',
        name: 'Forest',
        bg: 'bg-neutral-900',
        text: 'text-emerald-50',
        subtext: 'text-emerald-400/60',
        card: 'bg-neutral-800/40',
        border: 'border-emerald-800/30',
        input: 'bg-neutral-800/50 border-emerald-800/40',
        accent: 'from-emerald-600 to-green-600',
        accentText: 'text-emerald-400',
        ring: 'ring-emerald-500',
        gradient: 'from-neutral-900 via-green-950 to-neutral-900',
    },
};

export const ThemeProvider = ({ children }) => {
    // Try to load saved theme from localStorage, default to dark
    const [currentTheme, setCurrentTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return themes[saved] || themes.dark;
    });

    const changeTheme = (themeId) => {
        const theme = themes[themeId];
        if (theme) {
            setCurrentTheme(theme);
            localStorage.setItem('theme', themeId);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, changeTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
