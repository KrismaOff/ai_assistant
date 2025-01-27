import React from 'react';
import './Loading.css';

import loadingIcon from '@/assets/icons/loading.svg'

const Loading = ({ size = 100 }: { size?: number }) => {
  return (
    <div className="loading">
      <img width={size} className="loading-icon" src={loadingIcon} alt="loading"/>
    </div>
  );
};

export default Loading;