import React from 'react';
import { STRINGS } from '../constants/strings';
import logoSvg from '../assets/icons/loopStudioIcon.svg';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = STRINGS.APP_TITLE,
  subtitle = STRINGS.APP_SUBTITLE,
}) => {
  return (
    <header className="px-[37px] py-6 flex items-center gap-4">
      {/* Logo */}
      <img src={logoSvg} alt="LoopStudio Logo" className="shrink-0 w-[70px] h-[42px]" />

      {/* Text Content */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-dark">
          {title.toLowerCase()}
        </span>
        <span className="text-gray-400 text-2xl">|</span>
        <span className="text-base font-medium text-dark">{subtitle}</span>
      </div>
    </header>
  );
};

export default Header;
