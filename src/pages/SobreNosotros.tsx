import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { mockImages } from '../components/MockImages';
import VideoBackground from '../components/VideoBackground';
import { serviceVideos } from '../components/PremiumMedia';
import AnimatedButton from '../components/AnimatedButton';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Team members data
const teamMembers = [
  {
    name: 'Alejandro Méndez',
    role: 'CEO & Fundador',
    bio: 'Experto en marketing digital con más de 10 años de experiencia trabajando con marcas internacionales.',
    image: mockImages.team1,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Carmen Rodríguez',
    role: 'Directora de Diseño',
    bio: 'Diseñadora gráfica con pasión por crear identidades visuales que conectan con las audiencias.',
    image: mockImages.team2,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Manuel Torres',
    role: 'Director de Tecnología',
    bio: 'Desarrollador full-stack con experiencia en crear soluciones digitales innovadoras y escalables.',
    image: mockImages.team3,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Lucía Fernández',
    role: 'Especialista en Social Media',
    bio: 'Estratega de contenidos digitales enfocada en aumentar el engagement en redes sociales.',
    image: mockImages.team4,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
];

// Values data
const values = [
  {
    title: 'Creatividad',
    description:
      'Desarrollamos soluciones únicas y auténticas que reflejan la esencia de cada marca.',
    icon: '🚀',
    gradient: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  },
  {
    title: 'Compromiso',
    description:
      'Nos involucramos profundamente en cada proyecto, garantizando resultados alineados con los objetivos del cliente.',
    icon: '✨',
    gradient: 'linear-gradient(45deg, #4ECDC4, #45B7AF)',
  },
  {
    title: 'Colaboración',
    description:
      'Trabajamos codo a codo con nuestros clientes para crear estrategias que reflejen su visión y conecten con su audiencia.',
    icon: '🤝',
    gradient: 'linear-gradient(45deg, #45B7AF, #3B9E98)',
  },
  {
    title: 'Resultados',
    description:
      'Nos enfocamos en generar un impacto tangible y medible, maximizando el retorno de cada acción.',
    icon: '📈',
    gradient: 'linear-gradient(45deg, #3B9E98, #FF6B6B)',
  },
];

const SobreNosotros: React.FC = () => {
  const theme = useTheme();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <Box>
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

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
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
              Sobre Nosotros
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '800px',
                mx: 'auto',
                mb: 5,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Ayudamos a empresas y marcas personales a sobresalir en un entorno
              digital saturado mediante soluciones creativas y personalizadas.
            </Typography>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <Box
          component={motion.div}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
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
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
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

      {/* Our Story */}
      <Container
        maxWidth="xl"
        sx={{
          background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
          px: { xs: 2, md: 4 },
        }}
      >
        <Box ref={storyRef} sx={{ py: { xs: 8, md: 12 } }}>
          <motion.div
            initial="hidden"
            animate={storyInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      position: 'relative',
                      mb: 4,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '60px',
                        height: '4px',
                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                        bottom: -12,
                        left: 0,
                      },
                    }}
                  >
                    Nuestra Historia
                  </Typography>
                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.7)"
                    paragraph
                    sx={{
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    Brandify es una agencia creativa especializada en impulsar
                    la presencia digital de empresas y marcas personales.
                    Nuestra misión es ayudarte a destacar en un mercado digital
                    competitivo mediante soluciones estratégicas y creativas
                    adaptadas a las necesidades específicas de cada cliente.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.7)"
                    paragraph
                    sx={{
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.8,
                    }}
                  >
                    Nuestro equipo cuenta con una sólida experiencia en el
                    sector gracias a colaboraciones con otras agencias y
                    proyectos privados, lo que nos permite ofrecer una visión
                    estratégica y resultados reales. Nuestra visión es ser la
                    agencia de referencia para empresas y marcas personales que
                    buscan destacar y consolidarse en el mercado digital
                    mediante estrategias efectivas.
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        width: '100%',
                        height: '100%',
                        border: '3px solid',
                        borderImage:
                          'linear-gradient(45deg, #FF6B6B, #4ECDC4) 1',
                        borderRadius: 3,
                        zIndex: 0,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={mockImages.aboutUs}
                      alt="Nuestra historia"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 3,
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Box>

        {/* Our Values */}
        <Box
          ref={valuesRef}
          sx={{
            py: { xs: 8, md: 12 },
            borderRadius: { xs: 0, md: '20px' },
            position: 'relative',
            overflow: 'hidden',
            mb: 10,
          }}
        >
          <Container sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    bottom: -16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  },
                }}
              >
                Nuestros Valores
              </Typography>

              <Typography
                variant="body1"
                color="rgba(255,255,255,0.7)"
                align="center"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  mt: 5,
                  mb: 8,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                }}
              >
                Estos principios fundamentales guían todas nuestras acciones y
                definen cómo trabajamos con nuestros clientes.
              </Typography>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
            >
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {values.map((value) => (
                  <Grid item key={value.title} xs={12} sm={6} md={3}>
                    <motion.div variants={fadeInUp}>
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          textAlign: 'center',
                          p: 4,
                          borderRadius: 4,
                          transition: 'all 0.3s ease',
                          background: 'rgba(255,255,255,0.03)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          '&:hover': {
                            transform: 'translateY(-10px)',
                            boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                            borderColor: 'rgba(124, 58, 237, 0.3)',
                          },
                        }}
                      >
                        <Typography
                          variant="h1"
                          sx={{
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            mb: 3,
                          }}
                        >
                          {value.icon}
                        </Typography>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            background: value.gradient,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {value.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.7)"
                          sx={{
                            lineHeight: 1.7,
                            fontSize: { xs: '0.875rem', md: '1rem' },
                          }}
                        >
                          {value.description}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Público Objetivo */}
        <Box sx={{ py: { xs: 6, md: 8 }, mb: 10 }}>
          <Container>
            <motion.div
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    bottom: -16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  },
                }}
              >
                A Quién Servimos
              </Typography>

              <Typography
                variant="body1"
                color="rgba(255,255,255,0.7)"
                align="center"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  mt: 5,
                  mb: 6,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                }}
              >
                Nuestros servicios están diseñados para satisfacer las
                necesidades específicas de diferentes perfiles.
              </Typography>
            </motion.div>

            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                      borderColor: 'rgba(124, 58, 237, 0.3)',
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: '2rem',
                      mb: 2,
                      color: '#FF6B6B',
                    }}
                  >
                    💼
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'white',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                    }}
                  >
                    Empresas
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255,255,255,0.7)"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    Empresas de todos los tamaños que buscan aumentar su
                    presencia digital, mejorar la percepción de su marca y
                    generar más conversiones.
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                      borderColor: 'rgba(124, 58, 237, 0.3)',
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: '2rem',
                      mb: 2,
                      color: '#4ECDC4',
                    }}
                  >
                    👤
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'white',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                    }}
                  >
                    Emprendedores y Marcas Personales
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255,255,255,0.7)"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    Emprendedores y marcas personales que quieren construir una
                    identidad sólida, aumentar su alcance y conectar de manera
                    auténtica con su audiencia.
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                      borderColor: 'rgba(124, 58, 237, 0.3)',
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: '2rem',
                      mb: 2,
                      color: '#7C3AED',
                    }}
                  >
                    🏆
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'white',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                    }}
                  >
                    Marcas Consolidadas
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255,255,255,0.7)"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    Marcas consolidadas que buscan revitalizar su presencia
                    digital y adaptarse a las tendencias del mercado.
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Our Team */}
        <Box ref={teamRef} sx={{ mb: 10, py: { xs: 6, md: 8 } }}>
          <motion.div
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' },
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                },
              }}
            >
              Nuestro Equipo
            </Typography>

            <Typography
              variant="body1"
              color="rgba(255,255,255,0.7)"
              align="center"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                mt: 5,
                mb: 8,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
              }}
            >
              Profesionales apasionados por el marketing digital y la
              creatividad que hacen de Brandify una agencia única.
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
          >
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {teamMembers.map((member) => (
                <Grid item key={member.name} xs={12} sm={6} md={3}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                          borderColor: 'rgba(124, 58, 237, 0.3)',
                          '& .member-image': {
                            transform: 'scale(1.1)',
                          },
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          className="member-image"
                          component="img"
                          height="280"
                          image={member.image}
                          alt={member.name}
                          sx={{
                            transition: 'transform 0.5s ease',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            background:
                              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            '&:hover': {
                              opacity: 1,
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            sx={{ p: 2 }}
                          >
                            <IconButton
                              href={member.social.linkedin}
                              size="small"
                              sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <LinkedInIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              href={member.social.twitter}
                              size="small"
                              sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <TwitterIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              href={member.social.instagram}
                              size="small"
                              sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <InstagramIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Box>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 1,
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            display: 'inline-block',
                            pb: 1,
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            background:
                              'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {member.role}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.7)"
                          sx={{
                            lineHeight: 1.7,
                            fontSize: { xs: '0.875rem', md: '1rem' },
                          }}
                        >
                          {member.bio}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Diferenciador Clave */}
        <Box sx={{ py: { xs: 6, md: 8 }, mb: 0 }}>
          <Container>
            <motion.div
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    bottom: -16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  },
                }}
              >
                Lo Que Nos Hace Diferentes
              </Typography>
            </motion.div>

            <Box
              sx={{
                mt: 8,
                p: 5,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Creatividad + Estrategia + Tecnología
                  </Typography>

                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.9)"
                    sx={{
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                    }}
                  >
                    Brandify combina creatividad, estrategia y tecnología para
                    ofrecer soluciones personalizadas que no solo se ven bien,
                    sino que funcionan.
                  </Typography>

                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.8)"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                    }}
                  >
                    Nuestra experiencia trabajando con otras agencias y
                    proyectos privados nos permite adaptarnos a las necesidades
                    de cada cliente, brindando un servicio profesional,
                    eficiente y orientado a resultados.
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      background:
                        'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1))',
                      border: '1px solid rgba(124, 58, 237, 0.2)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 3,
                            textAlign: 'center',
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.03)',
                            height: '100%',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '2rem',
                              mb: 2,
                            }}
                          >
                            🎨
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ mb: 1, color: 'white' }}
                          >
                            Soluciones Creativas
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 3,
                            textAlign: 'center',
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.03)',
                            height: '100%',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '2rem',
                              mb: 2,
                            }}
                          >
                            📱
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ mb: 1, color: 'white' }}
                          >
                            Enfoque Digital
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 3,
                            textAlign: 'center',
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.03)',
                            height: '100%',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '2rem',
                              mb: 2,
                            }}
                          >
                            🔍
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ mb: 1, color: 'white' }}
                          >
                            Visión Estratégica
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 3,
                            textAlign: 'center',
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.03)',
                            height: '100%',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '2rem',
                              mb: 2,
                            }}
                          >
                            📊
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ mb: 1, color: 'white' }}
                          >
                            Resultados Medibles
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default SobreNosotros;
