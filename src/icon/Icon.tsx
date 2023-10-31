import classNames from 'classnames';
import type { FC } from 'react';
import { createNamespace } from '../utils';
import type { IconProps } from './PropsType';
import Arrow from './components/arrow';
import Failure from './components/failure';
import Loading from './components/loading';
import Success from './components/success';
import './style/index.less';

const [bem] = createNamespace('icon');

const Icon: FC<IconProps> = (props) => {
  const { className, name, size, color, spin } = props;
  return (
    <div className={classNames(className, bem({ spin }))}>
      {name === 'arrow' && <Arrow color={color} size={size} />}
      {name === 'failure' && <Failure color={color} size={size} />}
      {name === 'success' && <Success color={color} size={size} />}
      {name === 'loading' && <Loading color={color} size={size} />}
    </div>
  );
};

Icon.defaultProps = {};

export default Icon;
