import React, { useRef, useEffect, useState } from 'react';
import { Box, BoxProps, useMediaQuery, useTheme } from '@mui/material';

interface ParallaxSectionProps extends Omit<BoxProps, 'position'> {
  /**
   * Background image URL
   */
  backgroundImage?: string;

  /**
   * Video URL (optional)
   */
  videoUrl?: string;

  /**
   * Parallax strength (0-1), 0 = no parallax, 1 = maximum parallax
   * @default 0.3
   */
  strength?: number;

  /**
   * Background position
   * @default 'center'
   */
  position?: string;

  /**
   * Background size
   * @default 'cover'
   */
  size?: string;

  /**
   * Background overlay color (with opacity)
   */
  overlay?: string;

  /**
   * Whether to disable parallax on mobile devices
   * @default true
   */
  disableOnMobile?: boolean;

  /**
   * Maximum distance to translate (in px)
   * @default 100
   */
  maxTranslate?: number;
}

/**
 * ParallaxSection provides a component with parallax scrolling effect
 */
const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundImage,
  videoUrl,
  strength = 0.3,
  position = 'center',
  size = 'cover',
  overlay,
  disableOnMobile = true,
  maxTranslate = 100,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Only apply parallax if not on mobile or if mobile is allowed
  const applyParallax = !disableOnMobile || !isMobile;

  useEffect(() => {
    if (!applyParallax) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Get section position
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;

      // Calculate parallax offset
      // When section is in the middle of the viewport, parallax is 0
      // When section is at top or bottom edge, parallax is maxDistance
      const viewportCenter = windowHeight / 2;
      const sectionCenter = sectionTop + rect.height / 2;
      const distanceFromCenter =
        (sectionCenter - viewportCenter) / windowHeight;

      // Apply strength factor and limit to maxTranslate
      const parallaxOffset = distanceFromCenter * strength * maxTranslate;
      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [applyParallax, strength, maxTranslate]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
      {...props}
    >
      {/* Background layer with parallax effect */}
      {backgroundImage && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: position,
            backgroundSize: size,
            backgroundRepeat: 'no-repeat',
            transform: applyParallax ? `translateY(${offset}px)` : 'none',
            transition: 'transform 0.1s ease-out',
            zIndex: 0,
          }}
        />
      )}

      {/* Video background */}
      {videoUrl && (
        <Box
          sx={{
            position: 'absolute',
            top: applyParallax ? `-${maxTranslate}px` : 0,
            left: 0,
            right: 0,
            height: applyParallax
              ? `calc(100% + ${maxTranslate * 2}px)`
              : '100%',
            transform: applyParallax ? `translateY(${offset}px)` : 'none',
            transition: 'transform 0.1s ease-out',
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source
              src={videoUrl}
              type={`video/${videoUrl.split('.').pop()}`}
            />
          </Box>
        </Box>
      )}

      {/* Overlay */}
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlay,
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxSection;
