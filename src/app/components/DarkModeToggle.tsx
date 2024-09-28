"use client";

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl focus:shadow-xl z-50 outline-none hover:scale-105 focus:scale-105"
      aria-label="Toggle dark mode"
      style={{ zIndex: 9999 }}
    >
      {darkMode ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
};

export default DarkModeToggle;