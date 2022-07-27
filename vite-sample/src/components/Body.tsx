import * as React from 'react';

const Body = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div >
      {children}
    </div>
  );
};

export default Body;
