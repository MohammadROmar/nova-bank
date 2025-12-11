import Link from 'next/link';
import Image from 'next/image';

import HamburgerMenuBtn from '../../../shared/components/hamburger-menu-btn';
import logoImg from '@/assets/images/logo.png';

async function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 bg-white px-4 lg:hidden">
      <Link
        href="/dashboard"
        className="flex h-min items-center gap-2 p-4 lg:opacity-0 lg:select-none"
      >
        <div className="relative size-7">
          <Image
            src={logoImg}
            alt=""
            aria-hidden
            fill
            sizes="28px"
            priority
            className="object-contain object-center"
          />
        </div>
        <h1 className="text-2xl font-black tracking-tighter">NovaBank</h1>
      </Link>

      <HamburgerMenuBtn />
    </header>
  );
}

export default Header;
