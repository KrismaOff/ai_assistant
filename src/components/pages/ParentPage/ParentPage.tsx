import React from 'react';

import './ParentPage.css';
import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/layout/Sidebar/Sidebar';

const ParentPage = () => {
  return (
    <div className="ParentPage">
        <div className="parent-sidebar"><Sidebar/></div>
        <div className="parent-outlet"><Outlet/></div>
    </div>
  );
};

export default ParentPage;