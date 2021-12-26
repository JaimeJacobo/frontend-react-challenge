import { Frame1, Frame2, Frame3 } from './components';

import { LayoutStyle } from './styles';
import { useZenportEats } from './hooks/useZenportEats';

import Header from '@components/Header';

const ZenportEats = () => {
  const { page, setPage } = useZenportEats();

  return (
    <>
      <Header
        onIconClick={() => {
          setPage(1);
        }}
      />{' '}
      <LayoutStyle>
        {page === 1 && <Frame1 />}
        {page === 2 && <Frame2 />}
        {page === 3 && <Frame3 />}
      </LayoutStyle>
    </>
  );
};

export default ZenportEats;
