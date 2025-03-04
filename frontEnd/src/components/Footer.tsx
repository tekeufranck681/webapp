import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 TravCalc. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-green-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-green-400 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
