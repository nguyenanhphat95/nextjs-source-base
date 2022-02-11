import React, { useMemo, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { getOffsetLeft } from "./util";
import Star from "./Star";
import styles from "./styles.module.scss";

function noop(value?: any) {}

export interface RateProps {
  count?: number;
  onHoverChange?: (value: number) => void;
  allowHalf?: boolean;
  direction?: string;
  defaultValue: number;
  disabled?: boolean;
  onFocus?: () => void;
  character?: React.ReactNode;
  onChange?: (value: number) => void;
}

const defaultProps: RateProps = {
  count: 5,
  onHoverChange: noop,
  onChange: noop,
  allowHalf: false,
  direction: "ltr",
  defaultValue: 0,
  disabled: false,
  character: "★",
};

const Rating = (props: RateProps) => {
  const {
    count,
    direction,
    allowHalf,
    onHoverChange,
    onFocus,
    onChange,
    defaultValue,
    disabled,
    character,
  } = {
    ...defaultProps,
    ...props,
  };
  const stars: any[] = [];
  const [cleanedValue, setCleanedValue] = useState(null);
  const [hoverValue, setHoverValue] = useState(0);
  const [value, setValue] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const getStarDOM = (index: number) => {
    if (!stars[index]) {
      return;
    }

    const starEl = stars[index].querySelector("div");
    return starEl;
  };

  const getStarValue = (index: number, x: number): number => {
    const reverse = direction === "rtl";
    let value = index + 1;
    if (allowHalf) {
      // TO DO
      const starEle = getStarDOM(index);
      const leftDis = getOffsetLeft(starEle);
      const width = starEle.clientWidth;
      if (reverse && x - leftDis > width / 2) {
        value -= 0.5;
      } else if (!reverse && x - leftDis < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  };

  const onHover = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const hoverValue = getStarValue(index, event.pageX);
    if (hoverValue !== cleanedValue) {
      setHoverValue(hoverValue);
      setCleanedValue(null);
    }
    onHoverChange && onHoverChange(hoverValue);
  };

  const onClick = (
    event: React.MouseEvent | React.KeyboardEvent,
    index: number
  ) => {
    const newValue = getStarValue(index, (event as React.MouseEvent).pageX);
    onMouseLeave();
    changeValue(newValue);
  };

  const focus = () => {
    setFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const changeValue = (value: number) => {
    if (!("defaultValue" in props)) {
      setValue(value);
    }
    onChange && onChange(value);
  };

  const saveRef = (index: number) => (node: any) => {
    stars[index] = node;
  };

  const onMouseLeave = () => {
    setHoverValue(0);
    setCleanedValue(null);

    onHoverChange && onHoverChange(0);
  };

  const _renderStar = useMemo(() => {
    const stars = [];
    for (let index = 0; index < (count || 5); index += 1) {
      stars.push(
        <span key={index} className={styles["star-item"]}>
          <Star
            ref={saveRef(index)}
            value={value}
            // value={hoverValue === null ? value : hoverValue}
            count={count || 5}
            onHover={onHover}
            onClick={onClick}
            focused={focused}
            index={index}
            character={character}
            allowHalf
          />
        </span>
      );
    }
    return stars;
  }, [count, value, hoverValue, focused]);
  return (
    <div className={styles.root}>{_renderStar}</div>
    // <ul
    //   // onMouseLeave={onMouseLeave}
    //   onFocus={onFocus}
    //   style={{ margin: 0, padding: 0 }}
    //   // onMouseLeave={disabled ? null : onMouseLeave}
    //   // onFocus={disabled ? null : onFocus}
    // >
    //   {_renderStar}
    // </ul>
  );
};

export default Rating;
