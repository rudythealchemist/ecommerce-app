export const LogoutOption = ({ onLogout }) => (
  <button
    onClick={onLogout}
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    Logout
  </button>
);
