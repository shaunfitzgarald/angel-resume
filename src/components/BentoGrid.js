import React from 'react';

export const BentoGrid = ({ className, children, isMasonry = false }) => {
  if (isMasonry) {
    return (
      <div className={`columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 xl:gap-6 w-full ${className || ''}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6 auto-rows-[250px] w-full ${className || ''}`}>
      {children}
    </div>
  );
};
