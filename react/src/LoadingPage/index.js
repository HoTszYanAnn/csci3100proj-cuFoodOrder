import React from 'react';
import { WaveTopBottomLoading } from 'react-loadingg';
import './loadingPage.css'

function LoadingPage() {
  return (
    <div className="loading">
      <br/>
       <WaveTopBottomLoading color="green"/>
    </div>
  );
}

export default LoadingPage;
