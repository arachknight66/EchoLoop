import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <Navigation />
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;