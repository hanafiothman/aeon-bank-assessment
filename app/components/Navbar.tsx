'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GrClose, GrSearch, GrMenu } from 'react-icons/gr';
import NavbarSearch from './NavbarSearch';
import AppTitle from './AppTitle';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { useAuth } from '../providers/AuthProvider';

export default function Navbar() {
	const [isMobileMenuDisplayed, setMobileMenuDisplayed] = useState<boolean>(false);
	const [isSearchbarDisplayed, setSearchbarDisplayed] = useState<boolean>(false);

  const pathname = usePathname();

	const mobileMenuRef = useRef<HTMLDivElement>(null);

	const { isLoggedIn } = useAuth();

	const navbarLinks: { title: string; href: string; }[] = [
		{
			title: 'Showcase',
			href: '/showcase'
		},
		{
			title: 'Docs',
			href: '/docs'
		},
		{
			title: 'Blog',
			href: '/blog'
		},
		{
			title: 'Analytics',
			href: '/analytics'
		},
		{
			title: 'Templates',
			href: '/templates'
		},
		{
			title: 'Enterprise',
			href: '/enterprise'
		},
	];

	const handleClickOutside = (e: MouseEvent) => {
		if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node) && isMobileMenuDisplayed) {
			setMobileMenuDisplayed(false);
		}
	}

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }

	useEffect(() => {
		if (isMobileMenuDisplayed) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobileMenuDisplayed]);

  return (
		<nav className="flex h-[64px]">
			<div className="flex items-center h-full border-b w-full px-xl py-md">
				<div className="hidden md:flex">
					<AppTitle />
				</div>

        { !isLoggedIn ?
        <>
          <div className="hidden md:flex ml-2xl mr-xl">
            {navbarLinks.map((link, idx) => 
              <Link key={idx} href={link.href} className="mr-lg">
                {link.title}
              </Link>
            )}
          </div>

          <div className="hidden md:flex ml-auto w-[300px]">
            <NavbarSearch />
          </div>

          <button
            className="text-xl md:hidden"
            onClick={() => setMobileMenuDisplayed(!isMobileMenuDisplayed)}
          >
            <GrMenu />
          </button>
        </>
        :
        null }

        { pathname !== '/login' ?
          !isLoggedIn ?
				  <a
            className="ml-auto md:ml-lg bg-primary rounded-md text-white px-md py-2xs text-sm md:text-base"
            href={'/login'}
          >
            Login
          </a>
          :
          <Button
            className="ml-auto"
            onClick={() => logout()}
          >
            Logout
          </Button>
        : null }
			</div>

			<div
				ref={mobileMenuRef}
				className={`md:hidden absolute left-0 z-50 h-full bg-white border shadow-lg transition-transform duration-300 ${isMobileMenuDisplayed ? 'translate-x-0' : '-translate-x-full'} w-[300px]`}
			>
				<div className="py-lg px-lg border-b">
					<div className="flex items-center">
						<AppTitle />

						<button
							className="text-xl mr-xs ml-auto"
							onClick={() => setSearchbarDisplayed(!isSearchbarDisplayed)}
						>
							<GrSearch />
						</button>
						<button
							className="text-xl"
							onClick={() => setMobileMenuDisplayed(!isMobileMenuDisplayed)}
						>
							<GrClose />
						</button>
					</div>

					{ isSearchbarDisplayed ?
					<div className="mt-md">
						<NavbarSearch />
					</div>
					: null }
				</div>

				<div className="py-md flex flex-col">
					{navbarLinks.map((link, idx) => 
						<Link key={idx} href={link.href} className="py-xs px-lg" onClick={() => setMobileMenuDisplayed(!isMobileMenuDisplayed)}>
							{link.title}
						</Link>
					)}
				</div>
			</div>
		</nav>
  );
}
