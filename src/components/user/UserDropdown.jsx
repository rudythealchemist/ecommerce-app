import { ProfileOption } from './dropdown/ProfileOption';
import { OrdersOption } from './dropdown/OrdersOption';
import { SettingsOption } from './dropdown/SettingsOption';
import { LogoutOption } from './dropdown/LogoutOption';

export const UserDropdown = ({ onLogout }) => (
  <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
    <div className="py-1">
      <ProfileOption />
      <OrdersOption />
      <SettingsOption />
      <LogoutOption onLogout={onLogout} />
    </div>
  </div>
);
