import { Link } from 'react-router-dom';

export const SettingsOption = () => (
  <Link
    to="/settings"
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    Settings
  </Link>
);
