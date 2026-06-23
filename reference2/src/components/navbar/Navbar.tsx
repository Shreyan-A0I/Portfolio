import Link from "next/link";
import { useState } from "react";
import { twMerge } from 'tailwind-merge'
import HamburgerIcon from "./Hamburger";

interface navbarProps{
  className?: string;
  titleStyle?: string;
  hideTitle?: boolean;
}
const Navbar = ({className, titleStyle, hideTitle = false} : navbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleScrollLock = () => {
    document.body.classList.toggle('no-scroll');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toggleScrollLock();
  };

  return (
    <div className={twMerge("bg-opacity-80 bg-black backdrop-blur-lg fixed top-0 left-0 right-0 z-20", className)}>
      <div className="flex flex-row items-center justify-between px-5 py-4 md:px-6 md:pt-10 lg:px-12 lg:pt-10">
        {!hideTitle && (
          <span className="text-theme-text-primary text-2xl lg:text-3xl md:text-3xl sm:text-3xl font-bold">
            <div className="">
            <Link href={"/"}>
              <span className={twMerge("hidden lg:inline text-transparent bg-clip-text", titleStyle)} style={{
                backgroundImage: 'linear-gradient(to bottom right, var(--text-gradient-from), var(--text-gradient-via), var(--text-gradient-to))'
              }}>Sai Ravi Teja Gangavarapu</span>
              <span className="lg:hidden text-transparent bg-clip-text" style={{
                backgroundImage: 'linear-gradient(to bottom right, var(--text-gradient-from), var(--text-gradient-via), var(--text-gradient-to))'
              }}>Ravi</span>
              </Link>
            </div>
          </span>
        )}

        <div className="hidden lg:flex md:flex flex-row gap-5 md:gap-3 lg:gap-5 sm:gap-3 items-center">
            <Link href={"/"}><span className="text-theme-text-secondary text-sm lg:text-base md:text-base font-semibold hover:text-theme-text-primary">Home</span></Link>
            {/* <Link href={"/portfolio"}><span className="text-theme-text-secondary text-sm lg:text-base md:text-base font-semibold hover:text-theme-text-primary  ">Portfolio</span></Link> */}
            <Link href={"/left-brain"}><span className="text-theme-text-secondary text-sm lg:text-base md:text-base font-semibold hover:text-theme-text-primary  ">Left Brain</span></Link>
            <Link href={"/right-brain"}><span className="text-theme-text-secondary text-sm lg:text-base md:text-base font-semibold hover:text-theme-text-primary">Right Brain</span></Link>
            <Link href={"/socials"}><span className="text-theme-text-secondary text-sm lg:text-base md:text-base font-semibold hover:text-theme-text-primary">Socials</span></Link>
            <Link href={"/resume.pdf"}><span className="text-theme-text-secondary text-sm lg:text-base md:text-base font-semibold hover:text-theme-text-primary">Resume</span></Link>
        </div>
        {/* #005702 */}

        <div className="lg:hidden md:hidden">
          <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      {isOpen && (
        <div className="h-screen animate-in slide-in-from-right-full duration-300 gap-1 lg:hidden md:hidden px-5 py-4 flex flex-col items-end">
          <Link href={"/"}><span onClick={toggleScrollLock} className="block text-theme-text-primary text-base font-semibold mb-2 hover:text-theme-text-secondary">Home</span></Link>
          {/* <Link href={"/portfolio"}><span onClick={toggleScrollLock} className="block text-theme-text-primary text-base font-semibold mb-2 focus:text-theme-text-secondary">Portfolio</span></Link> */}
          <Link href={"/left-brain"}><span onClick={toggleScrollLock} className="block text-theme-text-primary text-base font-semibold mb-2 focus:text-theme-text-secondary">Left Brain</span></Link>
          <Link href={"/right-brain"}><span onClick={toggleScrollLock} className="block text-theme-text-primary text-base font-semibold mb-2 hover:text-theme-text-secondary">Right Brain</span></Link>
          <Link href={"/socials"}><span onClick={toggleScrollLock} className="block text-theme-text-primary text-base font-semibold mb-2 hover:text-theme-text-secondary">Socials</span></Link>
          <Link href={"/resume.pdf"}><span onClick={toggleScrollLock} className="block text-theme-text-primary text-base font-semibold hover:text-theme-text-secondary">Resume</span></Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;