'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden transition-transform duration-200 hover:scale-110"
          />
        </SheetTrigger>

        <SheetContent
          side="left"
          className={cn(
            "border-none bg-[#0B0F1A]/90 backdrop-blur-xl shadow-2xl rounded-r-xl p-4",
            "transition-all duration-300 ease-in-out"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-1 mb-4">
            <Image src="/icons/logo.svg" width={32} height={32} alt="IQchat logo" />
            <p className="text-[26px] font-extrabold bg-gradient-to-r from-[#1E90FF] via-[#FFD700] to-[#32CD32] text-transparent bg-clip-text">
              IQchat
            </p>
          </Link>

          {/* Sidebar Links */}
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col gap-4 pt-10 px-1 text-white">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          'flex items-center gap-4 px-4 py-3 rounded-xl group transition-all duration-300',
                          isActive
                            ? 'bg-gradient-to-r from-[#1E90FF] to-[#32CD32] text-black shadow-md'
                            : 'hover:bg-[#1e293b] hover:shadow-sm'
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="group-hover:scale-110 transition-transform"
                        />
                        <p className={cn("font-semibold", isActive ? "text-black" : "text-white")}>
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;

