import { FC } from "react";
import { Transition, config, animated } from "react-spring";

interface ITransitionSmoothly {
  toggleCondition: boolean;
  elementOne: any;
  elementTwo: any;
}

export const TransitionSmoothly: FC<ITransitionSmoothly> = ({
  toggleCondition,
  elementOne,
  elementTwo,
}: any) => {
  return (
    <Transition
      items={toggleCondition}
      from={{ opacity: 0, transform: "rotate(45deg)" }}
      enter={{ opacity: 1, transform: "rotate(0deg)" }}
      leave={{ opacity: 0, transform: "rotate(45deg)" }}
      delay={10}
      config={config.gentle}
    >
      {(styles, item) =>
        item ? (
          <animated.div
            style={{
              opacity: styles.opacity.to({
                range: [0.0, 1.0],
                output: [0, 1],
              }),
              transform: styles.transform,
              position: "absolute",
            }}
          >
            {elementOne}
          </animated.div>
        ) : (
          <animated.div
            style={{
              opacity: styles.opacity.to({
                range: [0.0, 1.0],
                output: [0, 1],
              }),
              transform: styles.transform,
              position: "absolute",
            }}
          >
            {elementTwo}
          </animated.div>
        )
      }
    </Transition>
  );
};
