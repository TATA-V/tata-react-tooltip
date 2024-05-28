import { ReactNode } from 'react';
import WarnIcon from 'src/lib/Tooltip/icons/WarnIcon';
import 'src/lib/Tooltip/scss/tooltipDialog.scss';

interface Props {
  message?: string;
  icon?: ReactNode;
  btnText?: string;
  dialogOk?: () => void;
}

function TooltipDialog({ message, icon, btnText = 'YES', dialogOk }: Props) {
  return (
    <div className="tooltip-dialog">
      <div className="dialog-msg">
        <div className="warn-icon">
          {icon || <WarnIcon />}
        </div>
        {message}
      </div>
      <div className="dialog-btn-wrapper">
        <button onClick={dialogOk} className="dialog-ok">
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default TooltipDialog;
