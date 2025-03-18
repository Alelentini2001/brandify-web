import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface LogoProps {
  /**
   * Size of the logo
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether to show the text part of the logo
   * @default true
   */
  showText?: boolean;

  /**
   * Color of the text part of the logo
   * @default undefined (uses theme)
   */
  textColor?: 'primary' | 'secondary' | 'white' | string;

  /**
   * Whether to display logo in vertical orientation
   * @default false
   */
  vertical?: boolean;

  /**
   * Custom inline styles
   */
  sx?: React.CSSProperties | any;

  /**
   * Primary color of the logo
   * @default '#C39B6A'
   */
  primaryColor?: string;

  /**
   * Secondary color of the logo
   * @default '#FFFFFF'
   */
  secondaryColor?: string;

  /**
   * Color of the logo
   * @default 'primary'
   */
  color?: 'primary' | 'white';
}

/**
 * Logo component for Brandify
 */
const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  showText = true,
  textColor,
  vertical = false,
  sx = {},
  primaryColor = '#C39B6A',
  secondaryColor = '#FFFFFF',
  color = 'primary',
}) => {
  const theme = useTheme();

  // Determine sizes based on the size prop
  const sizes = {
    small: {
      logoSize: 32,
      fontSize: '0.875rem',
      marginText: 1,
    },
    medium: {
      logoSize: 60,
      fontSize: '1.25rem',
      marginText: 1.5,
    },
    large: {
      logoSize: 100,
      fontSize: '1.75rem',
      marginText: 2,
    },
  };

  // Get the correct size config
  const sizeConfig = sizes[size];

  // Determine text color based on props or theme
  const getTextColor = () => {
    if (!textColor) return '#000000';
    if (textColor === 'primary') return theme.palette.primary.main;
    if (textColor === 'secondary') return theme.palette.secondary.main;
    if (textColor === 'white') return '#FFFFFF';
    return textColor;
  };

  const logoColor = color === 'white' ? '#FFFFFF' : '#C39B6A';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: vertical ? 'column' : 'row',
        ...sx,
      }}
    >
      <Box
        component="img"
        src={require('../assets/brandify1-removebg-preview.png')}
        alt="Brandify Logo"
        sx={{
          width: sizeConfig.logoSize,
          height: 'auto',
          mb: vertical ? 1 : 0,
          filter: color === 'white' ? 'none' : 'none',
        }}
      />

      {/* Text */}
      {/* {showText && (
        <Typography
          variant={size === 'small' ? 'body1' : size === 'medium' ? 'h6' : 'h5'}
          sx={{
            fontWeight: 800,
            ml: vertical ? 0 : sizeConfig.marginText,
            mt: vertical ? 1 : 0,
            color: getTextColor(),
            letterSpacing: '0.05em',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          BRANDIFY.
        </Typography>
      )} */}
    </Box>
  );
};

/**
 * Exports SVG string of the logo mark for use in favicons, etc.
 * @param size The size of the SVG in pixels
 * @param primaryColor The primary color for the logo
 * @returns An SVG string
 */
export const logoToSVG = (
  size = 64,
  primaryColor = '#C39B6A',
  secondaryColor = '#FFFFFF'
) => {
  const height = size * 0.75;
  const cutoutWidth = size * 0.12;
  const cutoutHeight = height * 0.5;
  const cutoutTop = height * 0.3;
  const cutoutSpacing = size * 0.33;
  const circleDiameter = height * 0.45;

  return `<svg width="${
    size + circleDiameter + 4
  }" height="${height}" viewBox="0 0 ${
    size + circleDiameter + 4
  } ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- W shape with cutouts -->
    <rect width="${size}" height="${height}" rx="4" fill="${primaryColor}"/>
    <!-- Left cutout -->
    <rect x="${
      cutoutSpacing - cutoutWidth / 2
    }" y="${cutoutTop}" width="${cutoutWidth}" height="${cutoutHeight}" rx="4" ry="4" fill="${secondaryColor}"/>
    <!-- Right cutout -->
    <rect x="${
      cutoutSpacing * 2 - cutoutWidth / 2
    }" y="${cutoutTop}" width="${cutoutWidth}" height="${cutoutHeight}" rx="4" ry="4" fill="${secondaryColor}"/>
    <!-- Circle dot -->
    <circle cx="${size + circleDiameter / 2}" cy="${height / 2}" r="${
    circleDiameter / 2
  }" fill="${primaryColor}"/>
  </svg>`;
};

export default Logo;
