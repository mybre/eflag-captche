import type { CaptchaModel } from '../captcha/PropsType';
import type { BaseTypeProps } from '../utils';

export interface SliderProps extends BaseTypeProps {
  captcha: CaptchaModel;
  onValid: (data: string, second: any) => Promise<boolean>;
  onCancel: () => void;
  onReloadPic: () => Promise<any>;
}
