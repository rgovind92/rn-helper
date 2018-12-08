import { View } from 'react-native';

import LikeCollapsible from './LikeCollapsible';
import LikeModal from './LikeModal';
import WithLoadingWheel from './WithLoadingWheel';
import WithPopover from './WithPopover';
import WithRipple from './WithRipple';

import IButton from '../component/IButton';

const Ripple = WithRipple(View),
  Collapsible = LikeCollapsible(View),
  ButtonWithPopover = WithPopover(IButton),
  IModal = LikeModal(View),
  Loading = WithLoadingWheel(View);

export { default as WithAutoDismissedKeyboard } from './WithAutoDismissedKeyboard';
export { default as WithLocale } from './WithLocale';
export { default as WithNotification } from './WithNotification';
export { default as WithOrientation } from './WithOrientation';
export { default as WithScreenLoadActions } from './WithScreenLoadActions';
export { default as WithTheme } from './WithTheme';
export { default as WithTimer } from './WithTimer';

export {
  LikeCollapsible,
  LikeModal,
  WithLoadingWheel,
  WithPopover,
  WithRipple,
  ButtonWithPopover,
  Collapsible,
  IModal,
  Loading,
  Ripple
};