import React from 'react';
import { Link } from 'react-router-dom';

export const TopNavi: React.FC = () => {
  return (
    <div>
      <h1>
        <Link to={'/'}>0+</Link>
      </h1>
      <div>
        <p>
          <Link to={'/login'}>login</Link>
        </p>
        <p>
          <Link to={'/setting'}>setting</Link>
        </p>
      </div>
    </div>
  );
};

React.memo(TopNavi);
