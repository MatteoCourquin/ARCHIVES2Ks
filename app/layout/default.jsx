'use client';

import { createContext, useState } from 'react';
import Background from '../components/background';

export const ColorsContext = createContext();

const Layout = ({ children }) => {
  const [colors, setColors] = useState({
    primary: '#3BFF4F',
    secondary: '#1E1E1E',
  });

  return (
    <ColorsContext.Provider value={{ colors, setColors }}>
      <div
        className='w-screen h-screen z-0 transition-colors-all fixed'
        style={{ backgroundColor: colors.secondary }}
      >
        <Background color={colors.primary} />
        <header
          className='h-16 w-full border-b-2 flex items-center px-6 z-10 transition-colors-all'
          style={{ borderColor: colors.primary }}
        >
          <h1
            className='good-timing transition-colors-all'
            style={{ color: colors.primary }}
          >
            ARCHIVES2Ks
          </h1>
        </header>
        <main className='h-[calc(100vh-64px)] z-10'>{children}</main>
      </div>
    </ColorsContext.Provider>
  );
};

export default Layout;
