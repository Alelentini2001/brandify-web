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
  price: number;
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
    title: 'Desarrollo de Web y Apps',
    description:
      'Creamos soluciones digitales a medida con tecnologías modernas que impulsan la presencia online de tu negocio.',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Diseño responsive y moderno',
      'Experiencia de usuario optimizada',
      'Aplicaciones nativas y multiplataforma',
      'Escalabilidad y rendimiento',
    ],
  },
];

const pricingOptions: PricingOption[] = [
  {
    name: 'Desarrollo Web',
    description: 'Completalo vos directamente',
    features: [
      'Diseño responsive y moderno',
      'Optimización SEO',
      'Integración con CMS',
      'Panel de administración',
      'Soporte técnico',
    ],
    price: 1000,
    icon: <CodeIcon />,
  },
  {
    name: 'Desarrollo de Plataforma',
    description: 'Completalo vos directamente',
    features: [
      'Desarrollo a medida',
      'Base de datos',
      'API personalizada',
      'Panel de administración avanzado',
      'Soporte técnico prioritario',
    ],
    price: 3500,
    icon: <CodeIcon />,
  },
  {
    name: 'Desarrollo de App',
    description: 'Completalo vos directamente',
    features: [
      'Desarrollo iOS y Android',
      'Diseño de interfaz móvil',
      'Integración con APIs',
      'Pruebas de rendimiento',
      'Publicación en stores',
    ],
    price: 2200,
    icon: <DevicesIcon />,
  },
  {
    name: 'Marketing Digital',
    description:
      'Creación y Gestión de Campañas Publicitarias en Meta Ads y Google Ads',
    features: [
      'Creación y gestión de campañas en Meta Ads y Google Ads',
      'Segmentación avanzada basada en datos demográficos',
      'Estrategia de Remarketing',
      'Análisis en tiempo real',
      '2 reuniones mensuales de seguimiento',
      'Presupuesto mínimo de 500€ por plataforma',
    ],
    price: 750,
    icon: <TrendingUpIcon />,
  },
  {
    name: 'Diseño de Marca',
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
    price: 450,
    icon: <BrushIcon />,
  },
  {
    name: 'Diseño de Logotipo',
    description: 'Diseño de Logotipo Profesional',
    features: [
      'Logotipo principal + variantes',
      'Paleta de colores estratégica',
      'Tipografía personalizada',
      'Versiones en diferentes formatos',
      'Manual de uso básico',
    ],
    price: 100,
    icon: <BrushIcon />,
  },
  {
    name: 'Diseño de Banner',
    description: 'Diseño de Banner Profesional',
    features: [
      'Diseño 100% personalizado',
      'Formato optimizado por canal',
      'Tipografías impactantes',
      'Colores estratégicos',
      'CTAs efectivos',
    ],
    price: 50,
    icon: <BrushIcon />,
  },
  {
    name: 'Thumbnails',
    description:
      'Miniaturas diseñadas estratégicamente para captar la atención y aumentar el CTR',
    features: [
      'Diseño estratégico para marcas personales y empresas',
      'Estilo visual alineado a tu identidad',
      'Composición clara y jerárquica',
      'Colores contrastantes y elementos visuales impactantes',
      'Formato optimizado para cada plataforma',
    ],
    price: 8,
    icon: <BrushIcon />,
  },
  {
    name: 'Historias Instagram',
    description:
      'Historias visualmente impactantes, alineadas con la identidad de tu marca',
    features: [
      'Diseño para generar interacción',
      'Estilo adaptable para promociones y branding',
      'Tipografías y colores personalizados',
      'Elementos interactivos y llamados a la acción',
    ],
    price: 8,
    icon: <BrushIcon />,
  },
  {
    name: 'Publicación Instagram',
    description:
      'Diseño único y alineado a tu identidad visual para marcas y creadores',
    features: [
      'Gráfica para destacar en el feed',
      'Mensajes claros y tipografías atractivas',
      'Composición equilibrada y profesional',
      'Colores estratégicos y estilo coherente',
      'Formato optimizado para móvil',
    ],
    price: 10,
    icon: <BrushIcon />,
  },
  {
    name: 'Flyers',
    description: 'Diseño 100% a medida para marcas, emprendimientos o eventos',
    features: [
      'Estilo visual alineado con identidad',
      'Distribución clara de la información',
      'Tipografías y colores estratégicos',
      'Versión optimizada para redes o impresión',
      'Perfecto para eventos y promociones',
    ],
    price: 25,
    icon: <BrushIcon />,
  },
  {
    name: 'Creativos Publicitarios',
    description: 'Creatividades estratégicas para campañas de alto impacto',
    features: [
      'Adaptación visual por plataforma',
      'Diseño alineado con identidad de marca',
      'Textos publicitarios directos',
      'Visuales potentes para conversiones',
      'Flexibilidad total para diferentes objetivos',
    ],
    price: 20,
    icon: <BrushIcon />,
  },
  {
    name: 'Presentación Comercial',
    description: 'Diseño visualmente atractivo para comunicar tu propuesta',
    features: [
      'Estructura clara y estratégica',
      'Estilo adaptado a identidad de marca',
      'Pensado para digital e impreso',
      'Perfecto para startups y empresas',
      'Ideal para presentaciones y pitch decks',
    ],
    price: 10,
    icon: <BrushIcon />,
  },
  {
    name: 'Edición de Videos',
    description: 'Edición dinámica y atractiva para captar la atención',
    features: [
      'Adaptado a tu objetivo específico',
      'Transiciones y efectos personalizados',
      'Música libre de derechos',
      'Formato optimizado por plataforma',
      'Estilo alineado a identidad',
    ],
    price: 20,
    icon: <VideoLibraryIcon />,
  },
  {
    name: 'Intro/Outro',
    description: 'Soluciones audiovisuales de alto impacto para marcas',
    features: [
      'Desarrollo integral personalizado',
      'Animaciones y diseño gráfico profesional',
      'Integración de logotipo y música',
      'Entrega en alta calidad',
      'Formatos optimizados para todas plataformas',
    ],
    price: 50,
    icon: <VideoLibraryIcon />,
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
        price: 1000,
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
        price: 2200,
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
        price: 3500,
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
        name: 'Meta Ads',
        description: 'Gestión de campañas publicitarias en Meta Ads',
        price: 750,
        features: [
          'Creación y gestión de campañas',
          'Segmentación avanzada',
          'Estrategia de Remarketing',
          'Análisis en tiempo real',
          '2 reuniones mensuales',
          'Presupuesto mínimo de 500€',
        ],
      },
      {
        name: 'Google Ads',
        description: 'Gestión de campañas publicitarias en Google Ads',
        price: 750,
        features: [
          'Creación y gestión de campañas',
          'Segmentación avanzada',
          'Estrategia de Remarketing',
          'Análisis en tiempo real',
          '2 reuniones mensuales',
          'Presupuesto mínimo de 500€',
        ],
      },
    ],
    customizations: [
      {
        name: 'Presupuesto Mínimo',
        description: 'Presupuesto mínimo por plataforma',
        price: 500,
        type: 'switch',
      },
      {
        name: 'Reuniones Adicionales',
        description: 'Reuniones adicionales de seguimiento',
        price: 100,
        type: 'slider',
        min: 1,
        max: 4,
        step: 1,
      },
    ],
  },
  {
    name: 'Diseño Gráfico',
    options: [
      {
        name: 'Diseño de Marca',
        description: 'Identidad de marca y branding completo',
        price: 450,
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
        name: 'Diseño de Logotipo',
        description: 'Diseño de Logotipo Profesional',
        price: 100,
        features: [
          'Logotipo principal + variantes',
          'Paleta de colores estratégica',
          'Tipografía personalizada',
          'Versiones en diferentes formatos',
          'Manual de uso básico',
        ],
      },
      {
        name: 'Diseño de Banner',
        description: 'Diseño de Banner Profesional',
        price: 50,
        features: [
          'Diseño 100% personalizado',
          'Formato optimizado por canal',
          'Tipografías impactantes',
          'Colores estratégicos',
          'CTAs efectivos',
        ],
      },
    ],
    customizations: [
      {
        name: 'Revisiones Adicionales',
        description: 'Número de revisiones adicionales',
        price: 50,
        type: 'slider',
        min: 1,
        max: 5,
        step: 1,
      },
      {
        name: 'Formato Premium',
        description: 'Entrega en formato premium',
        price: 100,
        type: 'switch',
      },
    ],
  },
];

interface PricingCalculatorProps {
  initialService?: ServiceCalculator | null;
  initialOption?: any | null;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  initialService,
  initialOption,
}) => {
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState(serviceCalculators[0]);
  const [selectedOption, setSelectedOption] = useState(
    selectedService.options[0]
  );
  const [customizations, setCustomizations] = useState<Record<string, any>>({});

  // Effect to update state when props change
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);

      if (initialOption) {
        setSelectedOption(initialOption);
      } else {
        setSelectedOption(initialService.options[0]);
      }

      // Reset customizations when service changes
      setCustomizations({});
    }
  }, [initialService, initialOption]);

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
      id="pricing-calculator"
      elevation={3}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 2,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        maxWidth: 800,
        mx: 'auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        mb: { xs: 4, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 4, md: 5 },
          color: 'white',
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          letterSpacing: '0.5px',
        }}
      >
        Calcula el Precio de tu Proyecto
      </Typography>

      {/* Service Selection */}
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            mb: 3,
            fontWeight: 600,
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
            letterSpacing: '0.3px',
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
              transition:
                'transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out',
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
                    ? 'rgba(124, 58, 237, 1)'
                    : 'transparent',
                borderColor:
                  selectedService.name === service.name
                    ? 'transparent'
                    : 'rgba(255,255,255,0.2)',
                color:
                  selectedService.name === service.name
                    ? 'white'
                    : 'rgba(255,255,255,0.7)',
                '&:hover': {
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
                transition:
                  'transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out, background-color 0.15s ease-out, color 0.15s ease-out',
              }}
            >
              {service.name}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Service Options */}
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
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
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2, md: 2.5 },
                  borderRadius: '12px',
                  background: 'rgba(30, 30, 30, 0.95)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition:
                    'transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(124, 58, 237, 0.25)',
                    borderColor: 'rgba(124, 58, 237, 0.5)',
                    background: 'rgba(30, 30, 30, 1)',
                  },
                }}
                onClick={() => setSelectedOption(option)}
              >
                <CardContent
                  sx={{
                    p: { xs: 1, md: 1.5 },
                    '&:last-child': { pb: { xs: 1, md: 1.5 } },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1.5,
                        color: '#7C3AED',
                      }}
                    >
                      <CodeIcon sx={{ fontSize: 20 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          ml: 1.5,
                          fontWeight: 'bold',
                          fontSize: { xs: '1rem', md: '1.2rem' },
                          color: 'white',
                          letterSpacing: '0.2px',
                        }}
                      >
                        {option.name}
                      </Typography>
                    </Box>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      paragraph
                      sx={{
                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                        mb: { xs: 1, md: 1.5 },
                        lineHeight: 1.4,
                        letterSpacing: '0.1px',
                      }}
                    >
                      {option.description}
                    </Typography>
                  </Box>

                  <Box>
                    {option.features.slice(0, 4).map((feature) => (
                      <Typography
                        key={feature}
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: 0.75,
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: { xs: '0.7rem', md: '0.75rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        <ArrowForwardIcon
                          sx={{
                            mr: 0.75,
                            fontSize: { xs: 12, md: 14 },
                            color: '#7C3AED',
                            mt: '1px',
                          }}
                        />
                        {feature}
                      </Typography>
                    ))}
                    {option.features.length > 4 && (
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 0.75,
                          color: '#7C3AED',
                          fontSize: { xs: '0.7rem', md: '0.75rem' },
                          fontStyle: 'italic',
                        }}
                      >
                        +{option.features.length - 4} más
                      </Typography>
                    )}

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: '#7C3AED',
                        textShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        textAlign: 'right',
                        mt: 1.5,
                        pt: 1,
                        borderTop: '1px solid rgba(124, 58, 237, 0.2)',
                        letterSpacing: '0.2px',
                      }}
                    >
                      desde €{option.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Customizations */}
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
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
                  +€{customization.price}
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
          desde €{calculatePrice()}
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

      {/* CTA Button */}
      <Box
        sx={{
          textAlign: 'center',
          mt: { xs: 4, md: 5 },
        }}
      >
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
    </Paper>
  );
};

const Home: React.FC = () => {
  const theme = useTheme();
  const [calculatorService, setCalculatorService] =
    useState<ServiceCalculator | null>(null);
  const [calculatorOption, setCalculatorOption] = useState<any | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handlePricingCardClick = (option: PricingOption) => {
    // Find the matching service calculator
    const service = serviceCalculators.find((s) =>
      s.options.some((o) => o.name === option.name)
    );

    if (service) {
      // Store the selected service and option for the calculator
      setCalculatorService(service);

      const matchingOption = service.options.find(
        (o) => o.name === option.name
      );
      if (matchingOption) {
        setCalculatorOption(matchingOption);
      }

      // Scroll to calculator
      calculatorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '90vh', md: '100vh' },
          minHeight: { xs: '600px', md: '700px' },
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #000 0%, #090909 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background:
              'radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <VideoBackground src={heroVideos.creative} opacity={0.4} />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: {
                      xs: '2.5rem',
                      sm: '3.5rem',
                      md: '4rem',
                      lg: '5rem',
                    },
                    lineHeight: { xs: 1.2, md: 1.1 },
                    mb: { xs: 2, md: 3 },
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                  }}
                >
                  Destaca en el mundo digital
                </Typography>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 400,
                    mb: { xs: 4, md: 5 },
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                    lineHeight: 1.5,
                    maxWidth: '600px',
                  }}
                >
                  Somos una agencia creativa especializada en impulsar la
                  presencia digital de empresas y marcas personales mediante
                  soluciones estratégicas y creativas adaptadas a tus
                  necesidades.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <AnimatedButton
                    variant="contained"
                    size="large"
                    href="/servicios"
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
                    animationVariant="glow"
                    sx={{
                      px: { xs: 3, md: 4 },
                      py: { xs: 1.5, md: 2 },
                      borderRadius: '12px',
                      borderColor: 'rgba(124, 58, 237, 0.5)',
                      color: 'white',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#7C3AED',
                        background: 'rgba(124, 58, 237, 0.1)',
                      },
                    }}
                  >
                    Contactar
                  </AnimatedButton>
                </Box>
              </motion.div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ width: '100%', maxWidth: '500px' }}
              >
                <Box
                  component="img"
                  src={mockImages.digitalMarketing}
                  alt="Digital Marketing"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 20px 80px rgba(124, 58, 237, 0.3)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Nuestros Servicios Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #000000 0%, #090909 100%)',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              color: '#7C3AED',
              fontWeight: 600,
              mb: { xs: 6, md: 8 },
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            NUESTROS SERVICIOS
          </Typography>

          <Typography
            variant="h2"
            component="h3"
            align="center"
            sx={{
              fontWeight: 900,
              mb: { xs: 8, md: 10 },
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
            }}
          >
            Soluciones Digitales Integrales
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'rgba(15, 15, 15, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(30, 30, 30, 0.7)',
                  p: 4,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(124, 58, 237, 0.2)',
                    borderColor: 'rgba(124, 58, 237, 0.3)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(124, 58, 237, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <VideoLibraryIcon
                    sx={{
                      fontSize: 28,
                      color: '#7C3AED',
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'white',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Edición de videos
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: 1.6,
                  }}
                >
                  Contenido visual impactante que refleja la esencia de tu
                  marca.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'rgba(15, 15, 15, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(30, 30, 30, 0.7)',
                  p: 4,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(124, 58, 237, 0.2)',
                    borderColor: 'rgba(124, 58, 237, 0.3)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(236, 72, 153, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <DesignServicesIcon
                    sx={{
                      fontSize: 28,
                      color: '#EC4899',
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'white',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Branding e identidad visual
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: 1.6,
                  }}
                >
                  Identidad visual integral que refleja la esencia y valores de
                  tu marca.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'rgba(15, 15, 15, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(30, 30, 30, 0.7)',
                  p: 4,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(124, 58, 237, 0.2)',
                    borderColor: 'rgba(124, 58, 237, 0.3)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(52, 211, 153, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <CodeIcon
                    sx={{
                      fontSize: 28,
                      color: '#34D399',
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'white',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Desarrollo Web y Apps
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: 1.6,
                  }}
                >
                  Soluciones digitales a medida con tecnologías modernas para tu
                  negocio.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'rgba(15, 15, 15, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(30, 30, 30, 0.7)',
                  p: 4,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(124, 58, 237, 0.2)',
                    borderColor: 'rgba(124, 58, 237, 0.3)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <TrendingUpIcon
                    sx={{
                      fontSize: 28,
                      color: '#FBBF24',
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'white',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Marketing para empresas
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: 1.6,
                  }}
                >
                  Estrategias personalizadas para maximizar tu impacto en el
                  mercado.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
            <Box ref={calculatorRef}>
              <PricingCalculator
                initialService={calculatorService}
                initialOption={calculatorOption}
              />
            </Box>
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
                    p: { xs: 2, md: 2.5 },
                    borderRadius: '12px',
                    background: 'rgba(30, 30, 30, 0.95)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transition:
                      'transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 25px rgba(124, 58, 237, 0.25)',
                      borderColor: 'rgba(124, 58, 237, 0.5)',
                      background: 'rgba(30, 30, 30, 1)',
                    },
                  }}
                  onClick={() => handlePricingCardClick(option)}
                >
                  <CardContent
                    sx={{
                      p: { xs: 1, md: 1.5 },
                      '&:last-child': { pb: { xs: 1, md: 1.5 } },
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1.5,
                          color: '#7C3AED',
                        }}
                      >
                        <CodeIcon sx={{ fontSize: 20 }} />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 1.5,
                            fontWeight: 'bold',
                            fontSize: { xs: '1rem', md: '1.2rem' },
                            color: 'white',
                            letterSpacing: '0.2px',
                          }}
                        >
                          {option.name}
                        </Typography>
                      </Box>
                      <Typography
                        color="rgba(255,255,255,0.7)"
                        paragraph
                        sx={{
                          fontSize: { xs: '0.8rem', md: '0.875rem' },
                          mb: { xs: 1, md: 1.5 },
                          lineHeight: 1.4,
                          letterSpacing: '0.1px',
                        }}
                      >
                        {option.description}
                      </Typography>
                    </Box>

                    <Box>
                      {option.features.slice(0, 4).map((feature) => (
                        <Typography
                          key={feature}
                          variant="body2"
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 0.75,
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.7rem', md: '0.75rem' },
                            lineHeight: 1.3,
                          }}
                        >
                          <ArrowForwardIcon
                            sx={{
                              mr: 0.75,
                              fontSize: { xs: 12, md: 14 },
                              color: '#7C3AED',
                              mt: '1px',
                            }}
                          />
                          {feature}
                        </Typography>
                      ))}
                      {option.features.length > 4 && (
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 0.75,
                            color: '#7C3AED',
                            fontSize: { xs: '0.7rem', md: '0.75rem' },
                            fontStyle: 'italic',
                          }}
                        >
                          +{option.features.length - 4} más
                        </Typography>
                      )}

                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: '#7C3AED',
                          textShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          textAlign: 'right',
                          mt: 1.5,
                          pt: 1,
                          borderTop: '1px solid rgba(124, 58, 237, 0.2)',
                          letterSpacing: '0.2px',
                        }}
                      >
                        desde €{option.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
