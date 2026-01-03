import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const ThemeToggle = () => {
    const { theme, changeTheme, themes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute top-6 right-6 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${theme.card} ${theme.border} ${theme.text} hover:scale-105`}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <span className="text-sm font-medium hidden sm:block">Theme</span>
                </button>

                {isOpen && (
                    <div className={`absolute right-0 mt-3 w-48 rounded-xl border backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-200 ${theme.card} ${theme.border}`}>
                        <div className="py-2">
                            {Object.values(themes).map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        changeTheme(t.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${theme.text} hover:bg-black/10 dark:hover:bg-white/10 ${theme.id === t.id ? 'bg-black/5 dark:bg-white/5 font-bold' : ''}`}
                                >
                                    <span className={`w-3 h-3 rounded-full mr-3 bg-gradient-to-r ${t.accent}`}></span>
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            )}
        </div>
    );
};

export default ThemeToggle;
