import { Captcha, useCaptcha } from '@eflag/captcha';
import { useRef } from 'react';

export default () => {
  const ref = useRef();
  const [run] = useCaptcha({ path: '/dev-api/auth/captcha', type: 'slide' });
  const click = () => {
    ref.current?.verify();
  };

  return (
    <Captcha
      onSuccess={(data) => console.log(data)}
      path="/dev-api/auth/captcha"
      type="slide"
      baseURL="http://192.168.1.186:9008"
      ref={ref}
    >
      <button
        type="button"
        onClick={click}
        style={{
          border: 'none',
          color: '#fff',
          width: '100px',
          height: '50px',
          lineHeight: '50px',
          background: '#1890ff',
        }}
      >
        点击
      </button>

      <button
        type="button"
        onClick={async () => {
          try {
            const data = await run();
            console.log(data);
          } catch (e) {
            console.log(e);
          }
        }}
        style={{
          border: 'none',
          color: '#fff',
          width: '100px',
          height: '50px',
          marginLeft: '10px',
          lineHeight: '50px',
          background: '#1890ff',
        }}
      >
        hook
      </button>
    </Captcha>
  );
};
