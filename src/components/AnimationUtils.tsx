import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, BoxProps } from '@mui/material';

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1], // cubic-bezier
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const rotate: Variants = {
  hidden: { opacity: 0, rotate: -20 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

// Component to wrap elements in scroll-triggered animations
interface AnimatedProps extends BoxProps {
  /**
   * Animation variant to use
   * @default 'fadeInUp'
   */
  variant?:
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'scaleIn'
    | 'rotate';

  /**
   * Whether to trigger the animation only once
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * Threshold for the intersection observer
   * @default 0.1
   */
  threshold?: number;

  /**
   * Delay in seconds before the animation starts
   * @default 0
   */
  delay?: number;

  /**
   * Optional child element if not using children
   */
  element?: React.ReactNode;

  /**
   * Custom element to render instead of a Box
   */
  as?: React.ElementType;

  /**
   * Margin around the element for the intersection observer
   */
  rootMargin?: string;
}

/**
 * Animated component that triggers animations when scrolled into view
 */
export const Animated: React.FC<AnimatedProps> = ({
  children,
  variant = 'fadeInUp',
  triggerOnce = true,
  threshold = 0.1,
  delay = 0,
  element,
  as,
  rootMargin = '0px',
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin,
  });

  // Map variant string to actual variant object
  const getVariant = (): Variants => {
    switch (variant) {
      case 'fadeInUp':
        return fadeInUp;
      case 'fadeInDown':
        return fadeInDown;
      case 'fadeInLeft':
        return fadeInLeft;
      case 'fadeInRight':
        return fadeInRight;
      case 'scaleIn':
        return scaleIn;
      case 'rotate':
        return rotate;
      default:
        return fadeInUp;
    }
  };

  // Start animation when element is in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  const Component = as || motion.div;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariant()}
      custom={delay}
      {...props}
    >
      {children || element}
    </Component>
  );
};

interface AnimatedTextProps {
  /**
   * Text to animate
   */
  text: string;

  /**
   * Type of text animation
   * @default 'words'
   */
  type?: 'letters' | 'words' | 'lines';

  /**
   * Delay between each element in seconds
   * @default 0.08
   */
  staggerDelay?: number;

  /**
   * Typography variant
   */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';

  /**
   * Additional CSS styles
   */
  sx?: React.CSSProperties | any;

  /**
   * Custom element to render instead of Typography
   */
  as?: React.ElementType;

  /**
   * Whether to trigger animation only once
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * Direction of the animation
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

/**
 * Component that animates text by splitting it into words, letters, or lines
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  type = 'words',
  staggerDelay = 0.08,
  variant = 'body1',
  sx = {},
  as,
  triggerOnce = true,
  direction = 'up',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce,
    threshold: 0.1,
  });

  // Get motion transition based on direction
  const getMotion = (): object => {
    switch (direction) {
      case 'up':
        return { y: 20 };
      case 'down':
        return { y: -20 };
      case 'left':
        return { x: 20 };
      case 'right':
        return { x: -20 };
      case 'none':
        return { scale: 0.9 };
      default:
        return { y: 20 };
    }
  };

  // Split text based on type
  const splitText = () => {
    if (type === 'letters') {
      return text.split('').map((char, index) => (
        <motion.span
          key={`char-${index}`}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          custom={index}
          variants={{
            hidden: {
              opacity: 0,
              ...getMotion(),
            },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              transition: {
                delay: staggerDelay * i,
                duration: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              },
            }),
          }}
        >
          {char}
        </motion.span>
      ));
    } else if (type === 'words') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={`word-${index}`}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          custom={index}
          variants={{
            hidden: {
              opacity: 0,
              ...getMotion(),
            },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              transition: {
                delay: staggerDelay * i,
                duration: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              },
            }),
          }}
        >
          {index < text.split(' ').length - 1 ? `${word} ` : word}
        </motion.span>
      ));
    } else if (type === 'lines') {
      return text.split('\n').map((line, index) => (
        <motion.div
          key={`line-${index}`}
          style={{ display: 'block' }}
          custom={index}
          variants={{
            hidden: {
              opacity: 0,
              ...getMotion(),
            },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              transition: {
                delay: staggerDelay * i,
                duration: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              },
            }),
          }}
        >
          {line}
        </motion.div>
      ));
    }
    return <span>{text}</span>;
  };

  // Start animation when element is in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  const Component = as || motion.div;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={controls}
      sx={{
        overflow: 'hidden',
        display: 'inline-block',
        ...sx,
      }}
    >
      {splitText()}
    </Component>
  );
};

export default { Animated, AnimatedText };
