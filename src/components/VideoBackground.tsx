import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

interface VideoBackgroundProps {
  /**
   * URL to the video file or YouTube URL
   */
  src: string;

  /**
   * Optional overlay color (with opacity)
   */
  overlayColor?: string;

  /**
   * Optional poster image to show while video loads
   */
  poster?: string;

  /**
   * Container height
   * @default '100%'
   */
  height?: string | number;

  /**
   * Z-index of the video container
   * @default 0
   */
  zIndex?: number;

  /**
   * Whether to show the video controls
   * @default false
   */
  controls?: boolean;

  /**
   * Opacity of the video
   * @default 1
   */
  opacity?: number;

  /**
   * Whether to start playing automatically
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Whether to loop the video
   * @default true
   */
  loop?: boolean;

  /**
   * Whether to mute the video
   * @default true
   */
  muted?: boolean;

  /**
   * Object fit style for the video
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill';

  /**
   * Custom inline styles for the container
   */
  sx?: React.CSSProperties | any;
}

/**
 * Utility function to detect if a URL is a YouTube URL
 */
const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

/**
 * Utility function to extract YouTube video ID from URL
 */
const getYouTubeVideoId = (url: string): string => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

/**
 * VideoBackground component for adding video backgrounds to sections
 */
const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  poster,
  height = '100%',
  zIndex = 0,
  controls = false,
  opacity = 1,
  autoPlay = true,
  loop = true,
  muted = true,
  objectFit = 'cover',
  sx = {},
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const theme = useTheme();
  const isYouTube = isYouTubeUrl(src);
  const youtubeVideoId = isYouTube ? getYouTubeVideoId(src) : '';

  // Handle autoplay issues by trying to play once the component mounts
  useEffect(() => {
    if (videoRef.current && autoPlay && !isYouTube) {
      // Try to autoplay
      const playPromise = videoRef.current.play();

      // Catch and handle any autoplay issues
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay prevented. User interaction required.');
          // We could show a play button here if needed
        });
      }
    }
  }, [autoPlay, isYouTube]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height,
        overflow: 'hidden',
        zIndex,
        ...sx,
      }}
    >
      {/* YouTube iframe or Video element */}
      {isYouTube ? (
        <Box
          component="iframe"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=${
            autoPlay ? 1 : 0
          }&mute=${muted ? 1 : 0}&loop=${
            loop ? 1 : 0
          }&playlist=${youtubeVideoId}&controls=${
            controls ? 1 : 0
          }&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          sx={{
            width: '100%',
            height: '100%',
            border: 'none',
            opacity,
            transform: 'scale(1.2)', // Scale up to hide YouTube UI elements
            transformOrigin: 'center center',
            pointerEvents: 'none', // Disable user interaction
          }}
        />
      ) : (
        <Box
          component="video"
          ref={videoRef}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          poster={poster}
          controls={controls}
          sx={{
            width: '100%',
            height: '100%',
            objectFit,
            opacity,
          }}
        >
          <source src={src} type={`video/${src.split('.').pop()}`} />
          Your browser does not support the video tag.
        </Box>
      )}

      {/* Overlay */}
      {overlayColor && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: overlayColor,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default VideoBackground;
