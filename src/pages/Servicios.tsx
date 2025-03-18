import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { mockImages } from '../components/MockImages';
import AnimatedButton from '../components/AnimatedButton';
import VideoBackground from '../components/VideoBackground';
import { serviceVideos } from '../components/PremiumMedia';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  gradient: string;
}

// Services data
const servicesData: Service[] = [
  {
    id: 'video-editing',
    title: 'Edición de videos y branding',
    description:
      'Transformamos tu contenido visual para que destaque y conecte con tu audiencia objetivo. Nuestro equipo de profesionales combinará creatividad con estrategia para elevar tu presencia de marca.',
    image: mockImages.videoEditing,
    features: [
      'Edición profesional de videos para redes sociales',
      'Desarrollo de identity branding completo',
      'Creación de motion graphics personalizados',
      'Producción de videos corporativos y promocionales',
      'Optimización de contenido según plataforma',
    ],
    gradient: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  },
  {
    id: 'social-media',
    title: 'Gestión de redes sociales',
    description:
      'Mantén una presencia consistente y efectiva en todas las plataformas sociales relevantes para tu negocio. Creamos y gestionamos contenido que genera engagement y conversiones.',
    image: mockImages.socialMedia,
    features: [
      'Estrategia de contenido personalizada',
      'Publicaciones diarias en las principales plataformas',
      'Diseño gráfico para redes sociales',
      'Respuesta y gestión de comentarios',
      'Análisis y reportes mensuales de rendimiento',
    ],
    gradient: 'linear-gradient(45deg, #4ECDC4, #45B7AF)',
  },
  {
    id: 'marketing',
    title: 'Marketing para empresas',
    description:
      'Desarrollamos estrategias integrales de marketing digital adaptadas específicamente a los objetivos de tu empresa. Incrementa tu visibilidad online y alcanza a más clientes potenciales.',
    image: mockImages.marketing,
    features: [
      'Análisis de mercado y competencia',
      'Estrategias de SEO/SEM',
      'Email marketing y automatizaciones',
      'Campañas de publicidad digital',
      'Análisis de datos y optimización continua',
    ],
    gradient: 'linear-gradient(45deg, #45B7AF, #3B9E98)',
  },
  {
    id: 'web-dev',
    title: 'Desarrollo de Websites',
    description:
      'Creamos sitios web a medida, funcionales, responsivos y optimizados para SEO que representan perfectamente la identidad de tu marca y convierten visitantes en clientes.',
    image: mockImages.webDev,
    features: [
      'Diseño UX/UI personalizado',
      'Desarrollo frontend y backend',
      'Optimización para dispositivos móviles',
      'Integración con CMS y herramientas de análisis',
      'Mantenimiento y soporte técnico continuo',
    ],
    gradient: 'linear-gradient(45deg, #3B9E98, #FF6B6B)',
  },
];

const Servicios: React.FC = () => {
  const theme = useTheme();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Setup intersection observer for each service
  const serviceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [serviceVisibility, setServiceVisibility] = useState<boolean[]>(
    Array(servicesData.length).fill(false)
  );

  // Setup intersection observer for each service
  useEffect(() => {
    const observers = serviceRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setServiceVisibility((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            // Unobserve after it's visible once
            if (ref) observer.unobserve(ref);
          }
        },
        { threshold: 0.1, rootMargin: '0px' }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    // Cleanup
    return () => {
      observers.forEach((observer, index) => {
        const ref = serviceRefs.current[index];
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <Box sx={{ pt: 0, pb: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          minHeight: 600,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'black',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        }}
      >
        <VideoBackground
          src={serviceVideos.webDevelopment}
          overlayColor="rgba(0, 0, 0, 0.7)"
          opacity={0.5}
        />

        <Container
          maxWidth="xl"
          sx={{ position: 'relative', zIndex: 2, pt: { xs: 12, md: 0 } }}
        >
          <motion.div style={{ opacity, y }}>
            <Typography
              component="h1"
              variant="h1"
              align="center"
              sx={{
                color: 'white',
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Nuestros Servicios
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                maxWidth: '800px',
                mx: 'auto',
                mb: 8,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.8,
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              Soluciones integrales para potenciar tu marca en el mundo digital
            </Typography>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <Box
          component={motion.div}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 50,
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 15,
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0',
            }}
          >
            <Box
              component={motion.div}
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: 'easeInOut',
              }}
              sx={{
                width: 6,
                height: 6,
                backgroundColor: 'white',
                borderRadius: '50%',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Services */}
      <Container
        maxWidth="xl"
        sx={{
          background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
          px: { xs: 2, md: 4 },
        }}
      >
        {servicesData.map((service, index) => (
          <Box
            key={service.id}
            ref={(el) => {
              if (el && serviceRefs.current) {
                serviceRefs.current[index] = el as HTMLDivElement;
              }
            }}
            id={service.id}
            sx={{
              py: { xs: 8, md: 12 },
              scrollMarginTop: '100px',
            }}
          >
            <motion.div
              initial="hidden"
              animate={serviceVisibility[index] ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <Grid
                container
                spacing={{ xs: 4, md: 8 }}
                direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                alignItems="center"
              >
                <Grid item xs={12} md={6}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      elevation={24}
                      sx={{
                        overflow: 'hidden',
                        borderRadius: 6,
                        transform: 'perspective(1000px) rotateY(0deg)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        '&:hover': {
                          transform:
                            'perspective(1000px) rotateY(2deg) translateY(-5px)',
                          boxShadow: '0 25px 50px rgba(124, 58, 237, 0.2)',
                          borderColor: 'rgba(124, 58, 237, 0.3)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="400"
                        image={service.image}
                        alt={service.title}
                        sx={{
                          objectFit: 'cover',
                          transition:
                            'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                      />
                    </Card>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <motion.div variants={fadeInUp}>
                    <Box sx={{ position: 'relative', pb: 2, mb: 3 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: { xs: '2rem', md: '2.5rem' },
                          background: service.gradient,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: '-0.02em',
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: '50%',
                            height: '4px',
                            background: service.gradient,
                            bottom: -8,
                            left: 0,
                          },
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      color="rgba(255,255,255,0.9)"
                      paragraph
                      sx={{
                        mb: 4,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.8,
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Card
                      variant="outlined"
                      sx={{
                        mb: 4,
                        borderRadius: 4,
                        p: 3,
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                      }}
                    >
                      <List>
                        {service.features.map((feature) => (
                          <ListItem
                            key={feature}
                            disableGutters
                            sx={{
                              mb: 2,
                              '&:last-child': {
                                mb: 0,
                              },
                            }}
                          >
                            <ListItemIcon>
                              <CheckCircleOutlineIcon
                                sx={{
                                  color: 'primary.main',
                                  background: service.gradient,
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  fontSize: { xs: 24, md: 28 },
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                fontWeight: 500,
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                lineHeight: 1.6,
                                letterSpacing: '0.01em',
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Card>
                    <Box sx={{ mt: 4 }}>
                      <AnimatedButton
                        variant="outlined"
                        size="large"
                        href="/contacto"
                        endIcon={<ArrowForwardIcon />}
                        animationVariant="scale"
                        sx={{
                          px: 4,
                          py: 2,
                          borderRadius: 3,
                          background: service.gradient,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          border: 'none',
                          color: 'white',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            background: service.gradient,
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                          },
                          '&:active': {
                            transform: 'scale(0.98)',
                          },
                          '&.MuiButton-root': {
                            background: service.gradient,
                          },
                          '&.MuiButton-root:hover': {
                            background: service.gradient,
                          },
                        }}
                      >
                        Solicitar información
                      </AnimatedButton>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>

              {index < servicesData.length - 1 && (
                <Divider
                  sx={{
                    mt: 8,
                    opacity: 0.2,
                    width: '75%',
                    mx: 'auto',
                  }}
                />
              )}
            </motion.div>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Servicios;
