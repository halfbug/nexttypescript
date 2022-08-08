import RegularCashoutStep1 from 'components/RegularCashoutPortal/RegularCashoutStep1';
import RegularCashoutStep2 from 'components/RegularCashoutPortal/RegularCashoutStep2';
import { NextPage } from 'next';
import React, { useState } from 'react';

const RegularCashout: NextPage = () => {
  const [showcashoutStep1, setshowcashoutStep1] = useState(true);
  const [showcashoutStep2, setshowcashoutStep2] = useState(false);

  return (
    <div>
      {showcashoutStep1 && (<RegularCashoutStep1 />)}
      {showcashoutStep2 && (<RegularCashoutStep2 />)}
    </div>
  );
};

export default RegularCashout;
