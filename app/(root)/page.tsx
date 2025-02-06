import Header from '@/components/Header';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react';

const HomePage = () => {
  const loggedIn = {
    firstName: 'Elijah',
    lastName: 'James',
    email: 'elijah.james@gmail.com',
  };
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <Header
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'Guest'}
            subtext='Access and manage your account and transactions efficiently.'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 500 }]}
      />
    </section>
  );
};

export default HomePage;
