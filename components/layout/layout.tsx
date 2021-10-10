import { Fragment, FC } from 'react';
// comp
import { Header } from './header';
import { Footer } from './footer';

export const Layout: FC = props => {
  return (
    <Fragment>
      <Header />
      <main style={{fontSize: '1.5rem'}} >
        {props.children}
      </main>
      {/* <Footer /> */}
    </Fragment>
  )
};