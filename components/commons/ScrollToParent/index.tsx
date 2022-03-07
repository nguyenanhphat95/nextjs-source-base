import React, { useRef, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ScrollToParent = (props: Props) => {
  const { children } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }
    rootRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return <div ref={rootRef}>{children}</div>;
};

export default ScrollToParent;
