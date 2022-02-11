import React, { useMemo, forwardRef } from "react";
import styles from "./star.module.scss";
import cn from "classnames";
export interface StarProps {
  disabled?: boolean;
  onHover?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => void;
  count: number;
  value: number;
  index: number;
  allowHalf?: boolean;
  focused?: boolean;
  character?: React.ReactNode;
}

const prefixCls = "rc-star";

const Star = forwardRef((props: StarProps, ref: any) => {
  const {
    focused,
    allowHalf,
    value,
    count,
    index,
    disabled,
    onHover,
    character,
    onClick,
  } = props;
  const getClassName = useMemo(() => {
    const starValue = index + 1;
    let className = "";
    if (value === 0 && index === 0 && focused) {
      className = `${prefixCls}-focused`;
    } else if (allowHalf && value + 0.5 >= starValue && value < starValue) {
      className = `${prefixCls}-half`;
      if (focused) {
        className = `${prefixCls}-focused`;
      }
    } else {
      className =
        starValue <= value ? `${prefixCls}-full` : `${prefixCls}-zero`;
      if (starValue === value && focused) {
        className = `${prefixCls}-focused`;
      }
    }
    return className;
  }, [value, index, focused, allowHalf]);

  return (
    <li ref={ref} className={cn(styles[getClassName], styles[prefixCls])}>
      <div
        onClick={disabled ? () => null : (e) => onClick && onClick(e, index)}
        onMouseMove={
          disabled ? () => null : (e) => onHover && onHover(e, index)
        }
      >
        <div className={styles[`${prefixCls}-first`]}>{character}</div>
        <div className={styles[`${prefixCls}-second`]}>{character}</div>
      </div>
    </li>
  );
});

export default Star;
