import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useState } from 'react';
import Styles from './DashboardCard.module.less';

interface DashboardCardProps {
  title?: string;
  numberPrefix?: string;
  number: string | number;
  numberSuffix?: string;
  icon?: ReactElement;
  footerDescription?: string;
  footerArrow?: 'up' | 'down';
  footerNumber?: string | number;
}

export const DashboardCard = ({
  title,
  numberPrefix,
  number,
  numberSuffix,
  icon,
  footerDescription,
  footerArrow,
  footerNumber,
}: DashboardCardProps) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  // 使用clsx来组合多个类名
  const footerNumberUp = clsx(Styles.footerNumber, Styles.footerArrowUp);
  const footerNumberDown = clsx(Styles.footerNumber, Styles.footerArrowDown);

  return (
    <Card className={Styles.card} loading={loading}>
      <div className={Styles.title}>{title}</div>
      <div className={Styles.content}>
        <div className={Styles.number}>
          {numberPrefix && (
            <span className={Styles.prefix}>{numberPrefix}</span>
          )}
          {number}
          {numberSuffix && (
            <span className={Styles.suffix}>{numberSuffix}</span>
          )}
        </div>
        <div className={Styles.icon}>{icon}</div>
      </div>

      <div className={Styles.footer}>
        <div className={Styles.footerDescription}>{footerDescription}</div>
        {footerArrow &&
          (footerArrow === 'up' ? (
            <>
              <ArrowUpOutlined className={Styles.footerArrowUp} />
              <div className={footerNumberUp}>{footerNumber}</div>
            </>
          ) : (
            <>
              <ArrowDownOutlined className={Styles.footerArrowDown} />
              <div className={footerNumberDown}>{footerNumber}</div>
            </>
          ))}
      </div>
    </Card>
  );
};
