import classNames from 'classnames';
import type { FC } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Icon from '../icon';
import Loading from '../loading';
import Points from '../points';
import Popup from '../popup';
import Slider from '../slider';
import { Anchor, aesEncrypt, check, createNamespace, noop, picture, storage } from '../utils';
import useSetState from '../utils/hooks';
import type { CaptchaModel, CaptchaProps, CaptchaType } from './PropsType';
import './style/index.less';

const [bem] = createNamespace('captcha');

const Captcha: FC<CaptchaProps> = forwardRef((props, ref) => {
  const {
    type = 'auto',
    onCancel = noop,
    onSuccess,
    onFail = noop,
    path,
    className,
    style,
  } = props;
  const [visible, toggle] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [captcha, setCaptcha] = useState<CaptchaModel>({});
  const [state, setState] = useSetState<{
    count: number;
    captchaType: CaptchaType;
  }>({
    count: 0,
    captchaType: type,
  });
  const { count, captchaType } = state;
  const fetch = async () => {
    toggle(true);
    const vr = Anchor[captchaType];
    const { success, message, data } = await picture(path, {
      captchaType: vr.captchaType,
      clientUid: localStorage.getItem(vr.name),
      ts: Date.now(),
    });
    if (success && data) {
      setError('');
      setCaptcha(vr.data(data));
    } else {
      setError(message || '请刷新页面再试');
      onFail(message || '请刷新页面再试');
    }
  };

  useEffect(() => {
    if (count > 0) {
      fetch();
    }
  }, [count]);

  const fail = () => {
    setTimeout(() => {
      const c = count + 1;
      if (c > 2 && captchaType === 'auto') {
        setState({
          count: c,
          captchaType: 'point',
        });
      } else {
        setState({ count: c });
      }
    }, 600);
  };
  const success = (data: any) => {
    setTimeout(() => {
      onSuccess(data);
      toggle(false);
      setCaptcha({});
    }, 1000);
  };

  const valid = (param: string, second: any) => {
    return new Promise<boolean>((resolve) => {
      const vr = Anchor[captchaType];
      const data = {
        captchaType: vr.captchaType,
        pointJson: captcha.secretKey ? aesEncrypt(param, captcha.secretKey) : param,
        token: captcha.token,
        clientUid: localStorage.getItem(vr.name),
        ts: Date.now(),
      };
      check(path, data)
        .then(function (res) {
          if (res.success) {
            success(second);
          } else {
            setError(res.message);
            onFail(res.message);
            fail();
          }
          resolve(res.success);
        })
        .catch(function () {
          return resolve(false);
        });
    });
  };

  useImperativeHandle(ref, () => ({ verify: fetch }));
  const cancel = () => {
    toggle(false);
    onFail('用户取消');
    onCancel();
  };

  useEffect(() => {
    storage();
  }, []);

  const renderBody = () => {
    if (error.length > 0) {
      return (
        <div className={classNames(bem('error'))}>
          <div className={classNames(bem('icon'))}>
            <div className={classNames(bem('icon-wrap'))}>
              <Icon size={32} name="failure" color="#fff" />
            </div>
          </div>
          <div className={classNames(bem('text'))}>{error}</div>
        </div>
      );
    }
    if (!captcha.image) {
      return <Loading />;
    }
    if (['auto', 'slide'].includes(captchaType)) {
      return <Slider onValid={valid} onCancel={cancel} onReloadPic={fetch} captcha={captcha} />;
    }
    return <Points onValid={valid} captcha={captcha} />;
  };
  return (
    <div className={classNames(bem(), className)} style={style}>
      <Popup visible={visible} onCancel={cancel}>
        {renderBody()}
      </Popup>
      {props.children}
    </div>
  );
});

Captcha.defaultProps = {
  type: 'auto', // slider point auto
  onCancel: noop,
  onFail: noop,
  onSuccess: noop,
};

export default Captcha;
