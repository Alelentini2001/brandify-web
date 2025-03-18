import React from 'react';
import { Button, ButtonProps, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends Omit<ButtonProps, 'component'> {
  /**
   * Variant of the button animation
   * @default 'scale'
   */
  animationVariant?: 'scale' | 'slide' | 'gradient' | 'glow';

  /**
   * Duration of the animation in seconds
   * @default 0.3
   */
  duration?: number;

  /**
   * Whether to show the hover animation
   * @default true
   */
  enableHover?: boolean;
}

/**
 * AnimatedButton component with various animation effects
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  animationVariant = 'scale',
  duration = 0.3,
  enableHover = true,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  // Scale animation
  const scaleAnimation = {
    rest: {
      scale: 1,
      transition: { duration },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration },
    },
    tap: {
      scale: 0.95,
      transition: { duration: duration / 2 },
    },
  };

  // Slide animation
  const slideAnimation = {
    rest: {
      x: 0,
      transition: { duration },
    },
    hover: {
      x: 5,
      transition: { duration },
    },
    tap: {
      x: -2,
      transition: { duration: duration / 2 },
    },
  };

  // Gradient animation (changes background)
  const gradientAnimation = {
    rest: {
      background:
        props.variant === 'contained'
          ? theme.palette.primary.main
          : 'transparent',
      transition: { duration },
    },
    hover: {
      background:
        props.variant === 'contained'
          ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
          : alpha(theme.palette.primary.main, 0.1),
      transition: { duration },
    },
    tap: {
      background:
        props.variant === 'contained'
          ? theme.palette.primary.dark
          : alpha(theme.palette.primary.main, 0.2),
      transition: { duration: duration / 2 },
    },
  };

  // Glow animation
  const glowAnimation = {
    rest: {
      boxShadow:
        props.variant === 'contained'
          ? `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`
          : 'none',
      transition: { duration },
    },
    hover: {
      boxShadow:
        props.variant === 'contained'
          ? `0 8px 20px ${alpha(theme.palette.primary.main, 0.6)}`
          : `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
      transition: { duration },
    },
    tap: {
      boxShadow:
        props.variant === 'contained'
          ? `0 2px 5px ${alpha(theme.palette.primary.main, 0.3)}`
          : 'none',
      transition: { duration: duration / 2 },
    },
  };

  // Select the appropriate animation based on variant
  const getAnimation = () => {
    switch (animationVariant) {
      case 'scale':
        return scaleAnimation;
      case 'slide':
        return slideAnimation;
      case 'gradient':
        return gradientAnimation;
      case 'glow':
        return glowAnimation;
      default:
        return scaleAnimation;
    }
  };

  return (
    <motion.div
      initial="rest"
      whileHover={enableHover ? 'hover' : 'rest'}
      whileTap="tap"
      animate="rest"
      variants={getAnimation()}
      style={{ display: 'inline-block' }}
    >
      <Button
        {...props}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          ...sx,
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
