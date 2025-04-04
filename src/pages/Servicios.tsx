import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WebIcon from '@mui/icons-material/Web';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CampaignIcon from '@mui/icons-material/Campaign';
import BrushIcon from '@mui/icons-material/Brush';
import VideocamIcon from '@mui/icons-material/Videocam';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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

const services = [
  {
    title: 'Desarrollo Web',
    icon: <WebIcon sx={{ fontSize: 40 }} />,
    price: 'desde 1000 €',
    description: 'Completalo vos directamente',
    features: [
      'Diseño responsive y moderno',
      'Optimización SEO',
      'Integración con CMS',
      'Panel de administración',
      'Soporte técnico',
    ],
  },
  {
    title: 'Desarrollo de Plataforma',
    icon: <WebIcon sx={{ fontSize: 40 }} />,
    price: 'desde 3500 €',
    description: 'Completalo vos directamente',
    features: [
      'Desarrollo a medida',
      'Base de datos',
      'API personalizada',
      'Panel de administración avanzado',
      'Soporte técnico prioritario',
    ],
  },
  {
    title: 'Desarrollo de App',
    icon: <PhoneIphoneIcon sx={{ fontSize: 40 }} />,
    price: 'desde 2200 €',
    description: 'Completalo vos directamente',
    features: [
      'Desarrollo iOS y Android',
      'Diseño de interfaz móvil',
      'Integración con APIs',
      'Pruebas de rendimiento',
      'Publicación en stores',
    ],
  },
  {
    title: 'Edición de Videos',
    icon: <VideocamIcon sx={{ fontSize: 40 }} />,
    price: '20 € (hasta 1:30 min)',
    description: 'Edición dinámica y atractiva para captar la atención',
    features: [
      'Adaptado a tu objetivo específico',
      'Transiciones y efectos personalizados',
      'Música libre de derechos',
      'Formato optimizado por plataforma',
      'Estilo alineado a identidad',
    ],
  },
  {
    title: 'Presentación Comercial',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '10 € por página',
    description: 'Diseño visualmente atractivo para comunicar tu propuesta',
    features: [
      'Estructura clara y estratégica',
      'Estilo adaptado a identidad de marca',
      'Pensado para digital e impreso',
      'Perfecto para startups y empresas',
      'Ideal para presentaciones y pitch decks',
    ],
  },
  {
    title: 'Intro/Outro',
    icon: <VideocamIcon sx={{ fontSize: 40 }} />,
    price: '50 € cada una',
    description: 'Soluciones audiovisuales de alto impacto para marcas',
    features: [
      'Desarrollo integral personalizado',
      'Animaciones y diseño gráfico profesional',
      'Integración de logotipo y música',
      'Entrega en alta calidad',
      'Formatos optimizados para todas plataformas',
    ],
  },
  {
    title: 'Thumbnails',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '8 €',
    description:
      'Miniaturas diseñadas estratégicamente para captar la atención y aumentar el CTR',
    features: [
      'Diseño estratégico para marcas personales y empresas',
      'Estilo visual alineado a tu identidad',
      'Composición clara y jerárquica',
      'Colores contrastantes y elementos visuales impactantes',
      'Formato optimizado para cada plataforma',
    ],
  },
  {
    title: 'Flyers',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '25 €',
    description: 'Diseño 100% a medida para marcas, emprendimientos o eventos',
    features: [
      'Estilo visual alineado con identidad',
      'Distribución clara de la información',
      'Tipografías y colores estratégicos',
      'Versión optimizada para redes o impresión',
      'Perfecto para eventos y promociones',
    ],
  },
  {
    title: 'Creativos Publicitarios',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '20 €',
    description: 'Creatividades estratégicas para campañas de alto impacto',
    features: [
      'Adaptación visual por plataforma',
      'Diseño alineado con identidad de marca',
      'Textos publicitarios directos',
      'Visuales potentes para conversiones',
      'Flexibilidad total para diferentes objetivos',
    ],
  },
  {
    title: 'Identidad de Marca',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '450 €',
    description: 'Identidad de marca y branding completo',
    features: [
      'Diseño de logotipo y variantes',
      'Paleta de colores estratégica',
      'Tipografías personalizadas',
      'Guías de estilo detalladas',
      'Iconografía y elementos gráficos',
      'Mockups profesionales',
      'Estrategia de branding',
    ],
  },
  {
    title: 'Diseño de Logotipo',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '100 €',
    description: 'Diseño de Logotipo Profesional',
    features: [
      'Logotipo principal + variantes',
      'Paleta de colores estratégica',
      'Tipografía personalizada',
      'Versiones en diferentes formatos',
      'Manual de uso básico',
    ],
  },
  {
    title: 'Marketing Digital',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    price: '750 € POR PLATAFORMA',
    description:
      'Creación y Gestión de Campañas Publicitarias en Meta Ads y Google Ads',
    features: [
      'Creación y gestión de campañas en Meta Ads y Google Ads',
      'Segmentación avanzada basada en datos demográficos',
      'Estrategia de Remarketing',
      'Análisis en tiempo real',
      '2 reuniones mensuales de seguimiento',
      'Presupuesto mínimo de inversión de 500€ por plataforma',
    ],
  },
  {
    title: 'Publicación Instagram',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '10 €',
    description:
      'Diseño único y alineado a tu identidad visual para marcas y creadores',
    features: [
      'Gráfica para destacar en el feed',
      'Mensajes claros y tipografías atractivas',
      'Composición equilibrada y profesional',
      'Colores estratégicos y estilo coherente',
      'Formato optimizado para móvil',
    ],
  },
  {
    title: 'Historias Instagram',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    price: '8 €',
    description:
      'Historias visualmente impactantes, alineadas con la identidad de tu marca',
    features: [
      'Diseño para generar interacción',
      'Estilo adaptable para promociones y branding',
      'Tipografías y colores personalizados',
      'Elementos interactivos y llamados a la acción',
    ],
  },
];

const Servicios: React.FC = () => {
  const theme = useTheme();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true,
  });

  return (
    <Box>
      {/* Hero Section */}
      <Box
        ref={headerRef}
        sx={{
          position: 'relative',
          height: '60vh',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'black',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            style={{ textAlign: 'center' }}
          >
            <Typography
              component="h1"
              variant="h1"
              sx={{
                color: 'white',
                mb: 3,
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
              }}
            >
              Nuestros Servicios
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.8,
              }}
            >
              Soluciones digitales completas para impulsar tu presencia online
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* A Quién Servimos Section */}
      <Box
        ref={servicesRef}
        sx={{
          py: { xs: 8, md: 12 },
          mb: 0,
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(180deg, #000000 0%, #090909 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Background animation elements */}
        <Box
          component={motion.div}
          initial={{ scale: 1, opacity: 0.1 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        <Box
          component={motion.div}
          initial={{ scale: 1, opacity: 0.1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            delay: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 60,
                    damping: 12,
                    delay: 0.2,
                  },
                },
              }}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  background: 'linear-gradient(45deg, #7C3AED, #EC4899)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  position: 'relative',
                }}
              >
                A Quién Servimos
              </Typography>
            </motion.div>

            <motion.div
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: {
                  width: '80px',
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.5,
                  },
                },
              }}
            >
              <Divider
                sx={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #7C3AED, #EC4899)',
                  borderRadius: '2px',
                  mb: 6,
                  mx: 'auto',
                }}
              />
            </motion.div>
          </motion.div>

          <Box>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {[
                {
                  icon: '💼',
                  color: '#7C3AED',
                  title: 'Empresas',
                  description:
                    'Aumenta tu presencia digital y genera más conversiones.',
                  gradient:
                    'linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(109, 40, 217, 0.2))',
                },
                {
                  icon: '👤',
                  color: '#EC4899',
                  title: 'Emprendedores',
                  description:
                    'Construye una identidad sólida y conecta con tu audiencia.',
                  gradient:
                    'linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(219, 39, 119, 0.2))',
                },
                {
                  icon: '🏆',
                  color: '#7C3AED',
                  title: 'Marcas Consolidadas',
                  description:
                    'Revitaliza tu presencia y adáptate a las nuevas tendencias.',
                  gradient:
                    'linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(109, 40, 217, 0.2))',
                },
              ].map((item, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 60,
                      damping: 12,
                      delay: 0.8 + index * 0.2,
                    }}
                    whileHover={{
                      y: -15,
                      scale: 1.02,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        p: 4,
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        transition:
                          'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        '&:hover': {
                          boxShadow: `0 30px 60px rgba(124, 58, 237, 0.3)`,
                          borderColor: `rgba(${
                            item.color === '#EC4899'
                              ? '236, 72, 153'
                              : '124, 58, 237'
                          }, 0.3)`,
                          '&::before': {
                            opacity: 0.6,
                          },
                          '& .icon-bg': {
                            transform: 'scale(1.3) rotate(10deg)',
                            opacity: 0.2,
                          },
                          '& .icon-main': {
                            transform: 'scale(1.1)',
                            filter: 'brightness(1.1)',
                          },
                          '& .underline': {
                            width: '100px',
                          },
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: item.gradient,
                          opacity: 0,
                          transition: 'opacity 0.5s ease',
                          zIndex: 0,
                        },
                      }}
                    >
                      {/* Animated background icon */}
                      <Box
                        className="icon-bg"
                        component={motion.div}
                        animate={{
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                        sx={{
                          position: 'absolute',
                          top: '-20px',
                          right: '-20px',
                          fontSize: '9rem',
                          opacity: 0.05,
                          transition:
                            'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                          color: item.color,
                          zIndex: 0,
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Typography
                            className="icon-main"
                            variant="h1"
                            sx={{
                              fontSize: '2.5rem',
                              mb: 2,
                              color: item.color,
                              display: 'inline-block',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {item.icon}
                          </Typography>
                        </motion.div>

                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            mb: 3,
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            color: 'white',
                            position: 'relative',
                            pb: 2,
                          }}
                        >
                          {item.title}
                          <Box
                            className="underline"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '60px',
                              height: '3px',
                              background: item.color,
                              borderRadius: '2px',
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </Typography>

                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.8)"
                          sx={{
                            lineHeight: 1.7,
                            fontSize: '1.05rem',
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="xl">
          <Box ref={servicesRef}>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial="hidden"
                    animate={servicesInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    style={{ height: '100%' }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(124, 58, 237, 0.2)',
                          borderColor: 'rgba(124, 58, 237, 0.3)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                        >
                          <Box sx={{ color: '#7C3AED' }}>{service.icon}</Box>
                          <Box sx={{ ml: 2 }}>
                            <Typography
                              variant="h5"
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: { xs: '1.1rem', md: '1.5rem' },
                              }}
                            >
                              {service.title}
                            </Typography>
                            <Typography
                              sx={{
                                color: '#7C3AED',
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                              }}
                            >
                              {service.price}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            color: 'rgba(255,255,255,0.7)',
                            mb: 2,
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            lineHeight: 1.6,
                          }}
                        >
                          {service.description}
                        </Typography>
                        <Divider
                          sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                        <List disablePadding>
                          {service.features.map((feature, idx) => (
                            <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckCircleIcon
                                  sx={{ color: '#7C3AED', fontSize: 20 }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                                    color: 'rgba(255,255,255,0.7)',
                                  },
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Servicios;
