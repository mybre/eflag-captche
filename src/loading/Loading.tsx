import classNames from 'classnames';
import type { FC } from 'react';
import Icon from '../icon';
import { createNamespace } from '../utils';
import type { LoadingProps } from './PropsType';
import './style/index.less';

const [bem] = createNamespace('loading');

const Loading: FC<LoadingProps> = (props) => {
  const { className } = props;
  return (
    <div className={classNames(className, bem())}>
      <Icon name="loading" size={38} spin />
    </div>
  );
};

Loading.defaultProps = {};

export default Loading;
