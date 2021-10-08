import { Fragment, FC } from 'react';

export const Layout: FC = props => {
  return (
    <Fragment>
      <main style={{fontSize: '1.5rem'}} >
        {props.children}
      </main>
    </Fragment>
  )
};