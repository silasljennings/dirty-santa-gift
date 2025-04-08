import React, { useState } from "react";

const Navbar = () => {
  // State to control mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <nav className="fixed top-0 z-100 bg-white w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile Menu Icon (Hamburger) */}
            <div className="absolute inset-y-0 left-3 flex items-center sm:hidden">
              <button
                  className="text-black focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger Icon */}
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Navbar Content */}
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0 text-black text-xl font-bold ml-auto sm:ml-0">
                {/* Logo or Text */}
                <img src="/assets/dsg-hori-300x100-trans.png" alt="Dirty Santa Gift Logo" className="h-8 w-auto"/>
              </div>

              {/* Desktop Navbar Links */}
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a
                      href="#"
                      className="text-black hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
                  >
                    Home
                  </a>
                  <a
                      href="#"
                      className="text-black hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
                  >
                    Shop
                  </a>
                  <a
                      href="#"
                      className="text-black hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
                  >
                    Collections
                  </a>
                  <a
                      href="#"
                      className="text-black hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
                  >
                    About
                  </a>
                  <a
                      href="#"
                      className="text-black hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Show the mobile menu if the state is open */}
        {isMobileMenuOpen && (
            <div className="sm:hidden bg-white">
              <div className="space-y-1 px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                    href="#"
                    className="text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </a>
                <a
                    href="#"
                    className="text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Shop
                </a>

                <a
                    href="#"
                    className="text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Collections
                </a>
                <a
                    href="#"
                    className="text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  About
                </a>
                <a
                    href="#"
                    className="text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
        )}
      </nav>
  );
};

export default Navbar;
