
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/**
 * A dropdown component that displays a user's profile information and
 * allows them to view their orders, change their settings, and log out.
 *
 * The component is initially closed and can be toggled open by clicking
 * on the user circle icon.
 *
 * @return {React.ReactElement} The component to be rendered.
 */
const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle the dropdown's visibility.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * The content of the dropdown.
   */
  const dropdownContent = (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <Link
        to="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Link>
      <Link
        to="/orders"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Orders
      </Link>
      <Link
        to="/settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </Link>
      <hr className="my-1" />
      <button
        onClick={() => {/* Add logout logic here */}}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <FaUserCircle className="w-6 h-6 text-gray-600 hover:text-gray-800" />
      </button>

      {isOpen && dropdownContent}
    </div>
  );
};

export default UserDropDown;
