import CheckIfIsLoggedIn from '@/components/CheckIfIsLoggedIn';
import GoBackBtn from '@/components/GoBackBtn';
import React from 'react';

const TicketBuyLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <>
      <GoBackBtn />
      <CheckIfIsLoggedIn>
        {children}
      </CheckIfIsLoggedIn>
    </>
  );
};

export default TicketBuyLayout;