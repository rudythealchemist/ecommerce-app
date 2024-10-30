import { Link } from 'react-router-dom';

export const ProfileOption = () => (
  <Link
    to="/profile"
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    Profile
  </Link>
);