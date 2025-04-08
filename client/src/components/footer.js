import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-white text-white py-6">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center">
                {/* Brand Name & Copyright */}
                <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Dirty Santa Gift. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;