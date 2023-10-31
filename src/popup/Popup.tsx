import classNames from 'classnames';
import type { FC } from 'react';
import { createNamespace } from '../utils';
import type { PopupProps } from './PropsType';
import './style/index.less';

const [bem] = createNamespace('popup');

const Popup: FC<PopupProps> = (props) => {
  const { className, visible, onCancel } = props;
  return (
    <div className={classNames(className, bem({ visible }))}>
      <div className={classNames(bem('mask'))} onClick={onCancel} />
      <div className={classNames(bem('body'))}>{props.children}</div>
    </div>
  );
};

Popup.defaultProps = {};

export default Popup;
