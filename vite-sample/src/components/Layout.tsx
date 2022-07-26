import Body from './Body';
import Header from './Header';

const Layout: React.FunctionComponent = (props): React.ReactElement => {
  return (
    <>
      <Header />
      <Body>{props.children}</Body>
    </>
  );
};

export default Layout;
