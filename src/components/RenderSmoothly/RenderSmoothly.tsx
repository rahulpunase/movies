import { FC } from "react";
import { animated, useSpring } from "react-spring";

const RenderSmoothly: FC<{
  children: any;
  delay?: number;
}> = ({ children, delay }) => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: delay || 300,
  });

  return <animated.div style={props}>{children}</animated.div>;
};

export default RenderSmoothly;
