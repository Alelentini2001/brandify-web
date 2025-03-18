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
    title: 'Innovación',
    description:
      'Exploramos constantemente nuevas tecnologías y enfoques para ofrecer soluciones creativas.',
    icon: '🚀',
    gradient: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  },
  {
    title: 'Calidad',
    description:
      'Nos comprometemos con la excelencia en cada proyecto que emprendemos.',
    icon: '✨',
    gradient: 'linear-gradient(45deg, #4ECDC4, #45B7AF)',
  },
  {
    title: 'Colaboración',
    description:
      'Trabajamos estrechamente con nuestros clientes para entender sus necesidades y superar sus expectativas.',
    icon: '🤝',
    gradient: 'linear-gradient(45deg, #45B7AF, #3B9E98)',
  },
  {
    title: 'Integridad',
    description:
      'Actuamos con honestidad y transparencia en todas nuestras interacciones profesionales.',
    icon: '🔍',
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
              Ayudamos a marcas y empresas a destacar en el mundo digital con
              estrategias personalizadas e innovadoras
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
                    Brandify nació en 2018 con la misión de ayudar a empresas y
                    profesionales a destacar en un entorno digital cada vez más
                    competitivo. Lo que comenzó como un pequeño equipo de
                    apasionados del marketing digital, se ha convertido en una
                    agencia integral que ofrece soluciones completas para
                    potenciar marcas.
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
                    A lo largo de los años, hemos trabajado con clientes de
                    todos los tamaños, desde startups hasta grandes
                    corporaciones, siempre manteniendo nuestro compromiso con la
                    excelencia y la innovación. Cada proyecto es una oportunidad
                    para crear algo excepcional que haga brillar a nuestros
                    clientes.
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
      </Container>
    </Box>
  );
};

export default SobreNosotros;
