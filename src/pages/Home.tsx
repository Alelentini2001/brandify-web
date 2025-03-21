import React, { memo, useRef, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  IconButton,
  Stack,
  Slider,
  FormControlLabel,
  Switch,
  Paper,
  Tooltip,
  Button,
  alpha,
  CardMedia,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DevicesIcon from '@mui/icons-material/Devices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Logo from '../components/Logo';
import VideoBackground from '../components/VideoBackground';
import {
  heroVideos,
  serviceVideos,
  businessImages,
} from '../components/PremiumMedia';
import AnimatedButton from '../components/AnimatedButton';
import { Animated, AnimatedText } from '../components/AnimationUtils';
import { useInView } from 'react-intersection-observer';
import { mockImages } from '../components/MockImages';

interface PricingOption {
  name: string;
  description: string;
  features: string[];
  basePrice: number;
  icon: React.ReactNode;
}

interface ProductFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

interface ServiceCalculator {
  name: string;
  options: {
    name: string;
    description: string;
    price: number;
    features: string[];
  }[];
  customizations: {
    name: string;
    description: string;
    price: number;
    type: 'switch' | 'slider' | 'select';
    options?: { label: string; value: number }[];
    min?: number;
    max?: number;
    step?: number;
  }[];
}

const products: ProductFeature[] = [
  {
    title: 'Edición de videos',
    description:
      'Creamos contenido visual impactante que refleja la esencia de tu marca y conecta emocionalmente con tu audiencia.',
    icon: <VideoLibraryIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Piezas creativas auténticas',
      'Storytelling estratégico',
      'Conexión emocional con la audiencia',
    ],
  },
  {
    title: 'Branding e identidad visual',
    description:
      'Desarrollamos una identidad visual integral que refleja la esencia y los valores de tu marca en todos los puntos de contacto.',
    icon: <DesignServicesIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Logotipo y variantes',
      'Paleta de colores estratégica',
      'Tipografías y elementos gráficos',
      'Guías de estilo detalladas',
    ],
  },
  {
    title: 'Gestión de redes sociales',
    description:
      'Nos encargamos de tu presencia digital para mantener una comunicación coherente y constante con estrategias específicas por plataforma.',
    icon: <DevicesIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Comunicación coherente',
      'Mayor alcance e interacción',
      'Contenido adaptado por plataforma',
    ],
  },
];

const pricingOptions: PricingOption[] = [
  {
    name: 'Desarrollo Web',
    description: 'Sitios web profesionales y aplicaciones web',
    features: [
      'Diseño responsive y moderno',
      'Optimización SEO',
      'Integración con CMS',
      'Panel de administración',
      'Soporte técnico',
    ],
    basePrice: 1499,
    icon: <CodeIcon />,
  },
  {
    name: 'Diseño UI/UX',
    description:
      'Interfaces intuitivas y experiencias de usuario excepcionales',
    features: [
      'Diseño de wireframes',
      'Prototipos interactivos',
      'Sistema de diseño',
      'Pruebas de usabilidad',
      'Documentación de diseño',
    ],
    basePrice: 999,
    icon: <BrushIcon />,
  },
  {
    name: 'Marketing Digital',
    description: 'Estrategias completas de marketing digital',
    features: [
      'SEO y SEM',
      'Gestión de redes sociales',
      'Email marketing',
      'Análisis de datos',
      'Reportes mensuales',
    ],
    basePrice: 799,
    icon: <TrendingUpIcon />,
  },
  {
    name: 'Creación de Video',
    description: 'Contenido visual profesional para tu marca',
    features: [
      'Videos promocionales',
      'Motion graphics',
      'Edición de videos',
      'Animaciones 2D/3D',
      'Optimización para redes sociales',
    ],
    basePrice: 1299,
    icon: <VideoLibraryIcon />,
  },
  {
    name: 'Apps Móviles',
    description: 'Aplicaciones móviles nativas y multiplataforma',
    features: [
      'Desarrollo iOS y Android',
      'Diseño de interfaz móvil',
      'Integración con APIs',
      'Pruebas de rendimiento',
      'Publicación en stores',
    ],
    basePrice: 1999,
    icon: <DevicesIcon />,
  },
  {
    name: 'E-commerce',
    description: 'Tiendas online completas y funcionales',
    features: [
      'Catálogo de productos',
      'Carrito de compras',
      'Pasarela de pagos',
      'Panel de administración',
      'Gestión de inventario',
    ],
    basePrice: 1799,
    icon: <ShoppingCartIcon />,
  },
];

const serviceCalculators: ServiceCalculator[] = [
  {
    name: 'Desarrollo Web',
    options: [
      {
        name: 'Landing Page',
        description:
          'Sitio web de una página con diseño moderno y optimizado para conversión',
        price: 1499,
        features: [
          'Diseño responsive',
          'Optimización SEO',
          'Formulario de contacto',
          'Integración con redes sociales',
        ],
      },
      {
        name: 'Sitio Web Corporativo',
        description:
          'Sitio web completo con múltiples páginas y panel de administración',
        price: 2499,
        features: [
          'Hasta 5 páginas',
          'Panel de administración',
          'Blog integrado',
          'Optimización SEO avanzada',
        ],
      },
      {
        name: 'Aplicación Web',
        description:
          'Aplicación web personalizada con funcionalidades específicas',
        price: 3999,
        features: [
          'Desarrollo a medida',
          'Base de datos',
          'API personalizada',
          'Panel de administración avanzado',
        ],
      },
    ],
    customizations: [
      {
        name: 'Número de Páginas',
        description: 'Cantidad de páginas adicionales',
        price: 100,
        type: 'slider',
        min: 1,
        max: 20,
        step: 1,
      },
      {
        name: 'E-commerce',
        description: 'Funcionalidad de tienda online',
        price: 500,
        type: 'switch',
      },
      {
        name: 'Diseño Personalizado',
        description: 'Diseño único y exclusivo',
        price: 300,
        type: 'switch',
      },
    ],
  },
  {
    name: 'Marketing Digital',
    options: [
      {
        name: 'Básico',
        description: 'Estrategia básica de marketing digital',
        price: 799,
        features: [
          'SEO básico',
          'Gestión de redes sociales',
          'Reportes mensuales',
        ],
      },
      {
        name: 'Profesional',
        description: 'Estrategia completa de marketing digital',
        price: 1499,
        features: [
          'SEO avanzado',
          'Publicidad en redes sociales',
          'Email marketing',
          'Análisis de datos',
        ],
      },
      {
        name: 'Premium',
        description: 'Estrategia premium con todas las funcionalidades',
        price: 2499,
        features: [
          'SEO técnico',
          'Campañas publicitarias',
          'Marketing de contenidos',
          'Analytics avanzado',
        ],
      },
    ],
    customizations: [
      {
        name: 'Número de Redes Sociales',
        description: 'Cantidad de redes sociales a gestionar',
        price: 100,
        type: 'slider',
        min: 1,
        max: 5,
        step: 1,
      },
      {
        name: 'Publicidad',
        description: 'Incluir gestión de publicidad',
        price: 500,
        type: 'switch',
      },
      {
        name: 'Contenido Premium',
        description: 'Creación de contenido profesional',
        price: 300,
        type: 'switch',
      },
    ],
  },
  {
    name: 'Creación de Video',
    options: [
      {
        name: 'Video Promocional',
        description: 'Video promocional básico para redes sociales',
        price: 1299,
        features: [
          'Edición básica',
          'Música de fondo',
          'Subtítulos',
          'Optimización para redes',
        ],
      },
      {
        name: 'Video Corporativo',
        description: 'Video corporativo profesional con motion graphics',
        price: 2499,
        features: [
          'Motion graphics',
          'Voz en off',
          'Animaciones 2D',
          'Múltiples formatos',
        ],
      },
      {
        name: 'Serie de Videos',
        description: 'Serie de videos para campaña o contenido regular',
        price: 3999,
        features: [
          'Planificación de contenido',
          'Estilo consistente',
          'Optimización SEO',
          'Analytics',
        ],
      },
    ],
    customizations: [
      {
        name: 'Duración del Video',
        description: 'Duración en minutos',
        price: 100,
        type: 'slider',
        min: 1,
        max: 10,
        step: 1,
      },
      {
        name: 'Motion Graphics',
        description: 'Incluir animaciones avanzadas',
        price: 500,
        type: 'switch',
      },
      {
        name: 'Voz en Off',
        description: 'Incluir locución profesional',
        price: 300,
        type: 'switch',
      },
    ],
  },
];

const PricingCalculator: React.FC = () => {
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState(serviceCalculators[0]);
  const [selectedOption, setSelectedOption] = useState(
    selectedService.options[0]
  );
  const [customizations, setCustomizations] = useState<Record<string, any>>({});

  const calculatePrice = () => {
    let price = selectedOption.price;

    Object.entries(customizations).forEach(([key, value]) => {
      const customization = selectedService.customizations.find(
        (c) => c.name === key
      );
      if (customization) {
        if (customization.type === 'switch' && value) {
          price += customization.price;
        } else if (customization.type === 'slider') {
          price += (value - 1) * customization.price;
        }
      }
    });

    return price;
  };

  const handleServiceChange = (service: ServiceCalculator) => {
    setSelectedService(service);
    setSelectedOption(service.options[0]);
    setCustomizations({});
  };

  const handleCustomizationChange = (name: string, value: any) => {
    setCustomizations((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        maxWidth: 800,
        mx: 'auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 4 },
          color: 'white',
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Calcula el Precio de tu Proyecto
      </Typography>

      {/* Service Selection */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            mb: 2,
            fontWeight: 600,
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
          }}
        >
          Selecciona el Servicio
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 2 }}
          sx={{
            mb: 2,
            flexWrap: { xs: 'no-wrap', md: 'wrap' },
            justifyContent: { xs: 'center', sm: 'flex-start' },
            '& .MuiButton-root': {
              flex: { xs: '1 1 100%', sm: '1 1 calc(33.33% - 16px)' },
              maxWidth: { xs: '100%', sm: 'none' },
              minWidth: { xs: '100%', sm: 'auto' },
              height: { xs: '48px', md: '56px' },
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:active': {
                transform: 'scale(0.98)',
              },
            },
          }}
        >
          {serviceCalculators.map((service) => (
            <Button
              key={service.name}
              variant={
                selectedService.name === service.name ? 'contained' : 'outlined'
              }
              onClick={() => handleServiceChange(service)}
              startIcon={
                service.name === 'Desarrollo Web' ? (
                  <CodeIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                ) : service.name === 'Marketing Digital' ? (
                  <TrendingUpIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                ) : (
                  <VideoLibraryIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                )
              }
              sx={{
                background:
                  selectedService.name === service.name
                    ? 'linear-gradient(135deg, #7C3AED, #EC4899)'
                    : 'transparent',
                borderColor:
                  selectedService.name === service.name
                    ? 'transparent'
                    : 'rgba(255,255,255,0.2)',
                color:
                  selectedService.name === service.name
                    ? 'white'
                    : 'rgba(255,255,255,0.7)',
                '&:hover:md': {
                  borderColor: '#7C3AED',
                  color: '#7C3AED',
                  background: 'rgba(124, 58, 237, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.2)',
                },
                boxShadow:
                  selectedService.name === service.name
                    ? '0 4px 20px rgba(124, 58, 237, 0.3)'
                    : 'none',
                fontSize: { xs: '0.875rem', md: '1rem' },
                px: { xs: 2, md: 3 },
                marginBottom: { xs: 5, md: 0 },
                textAlign: 'center',
                justifyContent: { xs: 'center', sm: 'center' },
              }}
            >
              {service.name}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Service Options */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            mb: 2,
            fontWeight: 600,
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
          }}
        >
          Selecciona el Plan
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {selectedService.options.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.name}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    selectedOption.name === option.name
                      ? 'rgba(124, 58, 237, 0.1)'
                      : 'rgba(255,255,255,0.03)',
                  border:
                    selectedOption.name === option.name
                      ? '2px solid #7C3AED'
                      : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow:
                    selectedOption.name === option.name
                      ? '0 4px 20px rgba(124, 58, 237, 0.2)'
                      : 'none',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: '#7C3AED',
                    boxShadow: '0 8px 30px rgba(124, 58, 237, 0.2)',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                  p: { xs: 2, md: 3 },
                }}
                onClick={() => setSelectedOption(option)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                  }}
                >
                  {option.name}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    mb: 2,
                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                  }}
                >
                  {option.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {option.features.map((feature) => (
                    <Typography
                      key={feature}
                      variant="body2"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      }}
                    >
                      <ArrowForwardIcon
                        sx={{
                          mr: 1,
                          fontSize: { xs: 14, sm: 16, md: 18 },
                          color: '#7C3AED',
                        }}
                      />
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#7C3AED',
                    fontWeight: 700,
                    textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  }}
                >
                  ${option.price}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Customizations */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            mb: 2,
            fontWeight: 600,
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
          }}
        >
          Personaliza tu Plan
        </Typography>
        <Stack spacing={{ xs: 2, md: 3 }}>
          {selectedService.customizations.map((customization) => (
            <Box
              key={customization.name}
              sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: 1,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(124, 58, 237, 0.2)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  }}
                >
                  {customization.name}
                </Typography>
                <Typography
                  sx={{
                    color: '#7C3AED',
                    fontWeight: 600,
                    textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  }}
                >
                  +${customization.price}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  mb: 2,
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                }}
              >
                {customization.description}
              </Typography>
              {customization.type === 'switch' && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={customizations[customization.name] || false}
                      onChange={(e) =>
                        handleCustomizationChange(
                          customization.name,
                          e.target.checked
                        )
                      }
                      sx={{
                        '& .MuiSwitch-thumb': {
                          backgroundColor: '#7C3AED',
                          boxShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                          width: { xs: 24, md: 28 },
                          height: { xs: 24, md: 28 },
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          height: { xs: 14, md: 16 },
                        },
                        '&.Mui-checked': {
                          '& .MuiSwitch-thumb': {
                            backgroundColor: '#7C3AED',
                          },
                          '& + .MuiSwitch-track': {
                            backgroundColor: 'rgba(124, 58, 237, 0.3)',
                          },
                        },
                      }}
                    />
                  }
                  label={
                    customizations[customization.name]
                      ? 'Incluido'
                      : 'No incluido'
                  }
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '& .MuiTypography-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                    },
                    '& .MuiFormControlLabel-label': {
                      paddingLeft: { xs: 1, md: 1.5 },
                    },
                  }}
                />
              )}
              {customization.type === 'slider' && (
                <Slider
                  value={
                    customizations[customization.name] || customization.min
                  }
                  onChange={(_, value) =>
                    handleCustomizationChange(customization.name, value)
                  }
                  min={customization.min}
                  max={customization.max}
                  step={customization.step}
                  marks
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}`}
                  sx={{
                    color: '#7C3AED',
                    '& .MuiSlider-markLabel': {
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: '#7C3AED',
                      boxShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                    },
                    '& .MuiSlider-track': {
                      background: 'rgba(124, 58, 237, 0.3)',
                      height: { xs: 6, md: 8 },
                    },
                    '& .MuiSlider-rail': {
                      background: 'rgba(255,255,255,0.1)',
                      height: { xs: 6, md: 8 },
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#7C3AED',
                      boxShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                      width: { xs: 24, md: 28 },
                      height: { xs: 24, md: 28 },
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
                      },
                    },
                  }}
                />
              )}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Total Price */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          background: 'rgba(124, 58, 237, 0.1)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#7C3AED',
            fontWeight: 700,
            mb: 1,
            textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          ${calculatePrice()}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
          }}
        >
          Precio estimado base. Contacta con nosotros para un presupuesto
          detallado.
        </Typography>
      </Box>
    </Paper>
  );
};

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

const Home: React.FC = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const services = [
    {
      icon: <VideoLibraryIcon sx={{ fontSize: 40 }} />,
      title: 'Edición de videos',
      description:
        'Contenido visual impactante que refleja la esencia de tu marca.',
      color: '#7C3AED', // Purple
    },
    {
      icon: <DesignServicesIcon sx={{ fontSize: 40 }} />,
      title: 'Branding e identidad visual',
      description:
        'Identidad visual integral que refleja la esencia y valores de tu marca.',
      color: '#EC4899', // Pink
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40 }} />,
      title: 'Gestión de redes sociales',
      description:
        'Comunicación coherente y constante para aumentar tu alcance.',
      color: '#10B981', // Emerald
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Marketing para empresas',
      description:
        'Estrategias personalizadas para maximizar tu impacto en el mercado.',
      color: '#F59E0B', // Amber
    },
  ];

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box ref={containerRef}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 'auto', md: '100vh' },
          minHeight: { xs: '100vh', md: 600 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'black',
          py: { xs: 8, md: 0 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0.8) 100%)',
            zIndex: 1,
          },
        }}
      >
        <VideoBackground
          src={heroVideos.creative}
          overlayColor="rgba(0, 0, 0, 0.7)"
          opacity={0.4}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            px: { xs: 2, md: 0 },
            py: { xs: 4, md: 0 },
          }}
        >
          <motion.div style={{ y, opacity }}>
            <Grid container spacing={{ xs: 4, md: 4 }} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={{ xs: 3, md: 4 }}>
                  <AnimatedText
                    text="Destaca en el mundo digital"
                    type="words"
                    staggerDelay={0.05}
                    as={Typography}
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                      lineHeight: { xs: 1.2, md: 1.1 },
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      maxWidth: { xs: '100%', md: 600 },
                      lineHeight: 1.8,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    Somos una agencia creativa especializada en impulsar la
                    presencia digital de empresas y marcas personales mediante
                    soluciones estratégicas y creativas adaptadas a tus
                    necesidades.
                  </Typography>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                      width: '100%',
                      '& .MuiButton-root': {
                        width: { xs: '100%', sm: 'auto' },
                        minWidth: { xs: '100%', sm: '200px' },
                      },
                    }}
                  >
                    <AnimatedButton
                      variant="contained"
                      size="large"
                      href="#servicios"
                      animationVariant="glow"
                      sx={{
                        px: { xs: 3, md: 4 },
                        py: { xs: 1.5, md: 2 },
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        fontWeight: 600,
                        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)',
                        },
                      }}
                    >
                      Explorar Servicios
                    </AnimatedButton>

                    <AnimatedButton
                      variant="outlined"
                      size="large"
                      href="/contacto"
                      animationVariant="slide"
                      sx={{
                        px: { xs: 3, md: 4 },
                        py: { xs: 1.5, md: 2 },
                        borderRadius: '12px',
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          borderColor: '#7C3AED',
                          color: '#7C3AED',
                          transform: 'translateY(-2px)',
                          background: 'rgba(124, 58, 237, 0.1)',
                        },
                      }}
                    >
                      Contactar
                    </AnimatedButton>
                  </Stack>
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  display: { xs: 'none', md: 'block' },
                  mt: { xs: 4, md: 0 },
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        right: 20,
                        bottom: 20,
                        border: '2px solid rgba(124, 58, 237, 0.3)',
                        borderRadius: '20px',
                        animation: 'pulse 2s infinite',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={businessImages.creative}
                      alt="Creative Process"
                      sx={{
                        width: '100%',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        transition:
                          'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
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
        </Container>

        {/* Scroll Indicator */}
        <Box
          component={motion.div}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: { xs: 'none', md: 'block' },
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

      {/* Services Section */}
      <Box
        sx={{
          py: { xs: 6, md: 15 },
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
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid
              item
              xs={12}
              sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: '#7C3AED',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  fontWeight: 600,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                }}
              >
                NUESTROS SERVICIOS
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mt: 2,
                  mb: 4,
                  fontSize: { xs: '1.75rem', md: '3rem' },
                  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Soluciones Digitales Integrales
              </Typography>
            </Grid>

            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={service.title}>
                <Animated variant="fadeInUp" delay={index * 0.2}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      p: { xs: 2, md: 4 },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${service.color}15`,
                        '& .service-icon': {
                          background: service.color,
                          color: 'white',
                          boxShadow: `0 8px 20px ${service.color}40`,
                        },
                      },
                    }}
                  >
                    <IconButton
                      className="service-icon"
                      sx={{
                        width: { xs: 48, md: 60 },
                        height: { xs: 48, md: 60 },
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: service.color,
                        mb: { xs: 2, md: 3 },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {service.icon}
                    </IconButton>
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mb: 2,
                        fontSize: { xs: '1.1rem', md: '1.5rem' },
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.6,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      {service.description}
                    </Typography>
                  </Card>
                </Animated>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Products Section */}
      {/* <Box maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
                    <Typography
            variant="h3"
            align="center"
                      sx={{
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              fontSize: { xs: '1.75rem', md: '2.5rem' },
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
            Nuestros Productos
                    </Typography>

          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={product.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card
          sx={{
            height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                      borderRadius: 2,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
            display: 'flex',
            alignItems: 'center',
                        mb: 2,
                        color: 'primary.main',
          }}
        >
                      {product.icon}
              <Typography
                        variant="h5"
                sx={{
                          ml: 2,
                          fontWeight: 'bold',
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                        }}
                      >
                        {product.title}
              </Typography>
                    </Box>
              <Typography
                      color="text.secondary"
                      paragraph
                      sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                    >
                      {product.description}
              </Typography>
                    <Box sx={{ mt: 2 }}>
                      {product.benefits.map((benefit) => (
                        <Typography
                          key={benefit}
                          variant="body2"
                sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'text.secondary',
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                          }}
                        >
                          <ArrowForwardIcon
                            sx={{ mr: 1, fontSize: 16, color: 'primary.main' }}
                          />
                          {benefit}
                        </Typography>
                      ))}
            </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box> */}

      {/* Pricing Calculator Section */}
      <Box
        sx={{
          py: { xs: 6, md: 12 },
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
        <Container maxWidth="lg">
          <Box textAlign="center" mb={{ xs: 4, md: 8 }}>
            <Typography
              variant="h2"
              component={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '3rem' },
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
              }}
            >
              Calcula tu Inversión
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                color: 'rgba(255,255,255,0.7)',
                px: { xs: 2, md: 0 },
              }}
            >
              Personaliza tu proyecto y obtén un presupuesto estimado al
              instante
            </Typography>
          </Box>

          <Box sx={{ px: { xs: 1, md: 0 } }}>
            <PricingCalculator />
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box
        sx={{
          py: { xs: 6, md: 12 },
          background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
            }}
          >
            Precios de Nuestros Servicios
          </Typography>

          <Grid container spacing={{ xs: 2, md: 4 }}>
            {pricingOptions.map((option) => (
              <Grid item xs={12} sm={6} md={4} key={option.name}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 2, md: 3 },
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(124, 58, 237, 0.2)',
                      borderColor: 'rgba(124, 58, 237, 0.3)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        color: '#7C3AED',
                      }}
                    >
                      {option.icon}
                      <Typography
                        variant="h5"
                        sx={{
                          ml: 2,
                          fontWeight: 'bold',
                          fontSize: { xs: '1.1rem', md: '1.5rem' },
                          color: 'white',
                        }}
                      >
                        {option.name}
                      </Typography>
                    </Box>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      paragraph
                      sx={{
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        mb: { xs: 2, md: 3 },
                      }}
                    >
                      {option.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {option.features.map((feature) => (
                        <Typography
                          key={feature}
                          variant="body2"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                          }}
                        >
                          <ArrowForwardIcon
                            sx={{
                              mr: 1,
                              fontSize: { xs: 14, md: 16 },
                              color: '#7C3AED',
                            }}
                          />
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: { xs: 2, md: 3 },
                        fontWeight: 'bold',
                        color: '#7C3AED',
                        textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      Desde ${option.basePrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: { xs: 8, md: 15 },
          background: 'linear-gradient(135deg, #000000, #1a1a1a)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
              }}
            >
              ¿Listo para Innovar?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: { xs: 4, md: 6 },
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Transformemos juntos tu visión en una realidad digital
              extraordinaria.
            </Typography>
            <AnimatedButton
              variant="contained"
              size="large"
              href="/contacto"
              animationVariant="glow"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)',
                },
              }}
            >
              Iniciar Proyecto
            </AnimatedButton>
          </Box>

          {/* Background Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200%',
              height: '200%',
              background:
                'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(0,0,0,0) 50%)',
              pointerEvents: 'none',
            }}
          />
        </Container>
      </Box>
    </Box>
  );
});

export default Home;
