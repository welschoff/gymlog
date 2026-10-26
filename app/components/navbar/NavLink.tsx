'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  icon: ReactNode;
  name: string;
};

function NavLink({ href, icon, name }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div>
      <Link
        href={href}
        className={`flex flex-col items-center ${isActive ? 'text-highlight' : ''}`}
      >
        {icon}
        <span>{name}</span>
      </Link>
    </div>
  );
}

export default NavLink;
