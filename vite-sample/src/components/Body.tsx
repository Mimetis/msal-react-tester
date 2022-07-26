import * as React from 'react';

const Body: React.FunctionComponent = (props): React.ReactElement => {
  return (
    <>
      <div className="container-body" role="contentinfo">
        {props.children}
      </div>

    </>
  );
};

export default Body;
