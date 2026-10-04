import { LayoutGridCircles, Plus, List } from 'lucide-react';
import NavLink from './NavLink';

function Navbar() {
  return (
    <div className="fixed bottom-0 border-t border-gray-50 w-full flex justify-between p-3 text-xs text-gray-400">
      <NavLink href="/dashboard" icon={<LayoutGridCircles />} name="HOME" />
      <NavLink href="/log" icon={<Plus />} name="LOG" />
      <NavLink href="/history" icon={<List />} name="HISTORY" />
    </div>
  );
}

export default Navbar;
