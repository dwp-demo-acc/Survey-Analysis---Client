import React from 'react';
import PersistentDrawerLeftWrapper from '../shared/persistentDrawerLeftWrapper'; 

interface RootLayoutProps {
  children: React.ReactNode; 
  fileNames: string[];       
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, fileNames }) => {
  return (
    <>
      <PersistentDrawerLeftWrapper items={fileNames} />
      {children}
    </>
  );
}

export default RootLayout;
