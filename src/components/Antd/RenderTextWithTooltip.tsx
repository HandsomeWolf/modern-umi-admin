import { Tooltip, Typography } from 'antd';
import React, { ReactNode } from 'react';

interface RenderTextWithTooltipProps {
  text: ReactNode;
}

export const RenderTextWithTooltip: React.FC<RenderTextWithTooltipProps> = ({
  text,
}) => {
  if (text === '-') return text;

  return (
    <Tooltip title={text}>
      <Typography.Paragraph
        className="no-margin-bottom"
        copyable={{ text: text as string, tooltips: false }}
        ellipsis={{ tooltip: text }}
      >
        {text}
      </Typography.Paragraph>
    </Tooltip>
  );
};
