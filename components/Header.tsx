
import React from 'react';
import { FilmIcon } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3">
                <FilmIcon className="w-10 h-10 text-indigo-400" />
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Pencari Klip Viral
                </h1>
            </div>
            <p className="mt-4 text-lg text-gray-400">
                Temukan momen viral secara instan dari video YouTube mana pun.
            </p>
        </header>
    );
};

export default Header;