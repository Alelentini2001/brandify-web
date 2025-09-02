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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
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
    customizations?: {
      name: string;
      description: string;
      price?: number;
      type: 'switch' | 'slider' | 'select';
      options?: { label: string; value: number }[];
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
      pricePerUnit?: number;
    }[];
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
  {
    title: 'Soluciones SAAS',
    description:
      'Desarrollamos software como servicio escalable y personalizado para automatizar y optimizar los procesos de tu empresa.',
    icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Plataformas web escalables',
      'Automatización de procesos',
      'Integración con sistemas existentes',
      'Soporte técnico 24/7',
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
    name: 'Desarrollo SAAS',
    description: 'Plataforma completa como servicio',
    features: [
      'Arquitectura escalable en la nube',
      'Base de datos y APIs robustas',
      'Panel de administración avanzado',
      'Sistema de usuarios y permisos',
      'Métricas y analytics integrados',
      'Soporte técnico prioritario',
    ],
    price: 5000,
    icon: <StorefrontIcon />,
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
        customizations: [
          {
            name: 'Páginas Adicionales',
            description: 'Añade páginas extra a tu landing page',
            type: 'slider',
            min: 0,
            max: 5,
            step: 1,
            unit: 'páginas',
            pricePerUnit: 150,
          },
          {
            name: 'E-commerce',
            description: 'Funcionalidad de tienda online',
            type: 'switch',
            price: 500,
          },
        ],
      },
      {
        name: 'Sitio Web Corporativo',
        description:
          'Sitio web completo con múltiples páginas y panel de administración',
        price: 1300,
        features: [
          'Hasta 5 páginas',
          'Panel de administración',
          'Blog integrado',
          'Optimización SEO avanzada',
        ],
        customizations: [
          {
            name: 'Páginas Adicionales',
            description: 'Añade más páginas a tu sitio web',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            unit: 'páginas',
            pricePerUnit: 100,
          },
          {
            name: 'E-commerce',
            description: 'Funcionalidad de tienda online',
            type: 'switch',
            price: 800,
          },
          {
            name: 'Diseño Personalizado',
            description: 'Diseño único y exclusivo',
            type: 'switch',
            price: 300,
          },
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
        customizations: [
          {
            name: 'Usuarios Simultáneos',
            description: 'Capacidad de usuarios concurrentes',
            type: 'slider',
            min: 100,
            max: 10000,
            step: 100,
            unit: 'usuarios',
            pricePerUnit: 0.5,
          },
          {
            name: 'Integración API Externa',
            description: 'Integración con servicios externos',
            type: 'switch',
            price: 500,
          },
          {
            name: 'Soporte 24/7',
            description: 'Soporte técnico prioritario',
            type: 'switch',
            price: 200,
          },
        ],
      },
      {
        name: 'E-commerce',
        description: 'Tienda online completa con carrito, pagos e inventario',
        price: 2200,
        features: [
          'Gestión de productos y categorías',
          'Carrito de compra y checkout seguro',
          'Integración de pasarelas de pago',
          'Gestión de envíos y stock',
        ],
        customizations: [
          {
            name: 'Productos',
            description: 'Cantidad aproximada de productos iniciales',
            type: 'slider',
            min: 10,
            max: 1000,
            step: 10,
            unit: 'productos',
            pricePerUnit: 5,
          },
          {
            name: 'Pasarelas de Pago',
            description: 'Integración de pasarelas (Stripe, PayPal, etc.)',
            type: 'switch',
            price: 200,
          },
          {
            name: 'Multiidioma',
            description: 'Sitio en más de un idioma',
            type: 'switch',
            price: 300,
          },
          {
            name: 'Integración ERP',
            description: 'Sincronización con ERP/Inventario',
            type: 'switch',
            price: 600,
          },
        ],
      },
      {
        name: 'Blog / Portfolio',
        description: 'Sitio para contenidos personales o de marca',
        price: 900,
        features: [
          'Listado y detalle de posts/proyectos',
          'Optimización SEO básica',
          'Cargas rápidas y diseño moderno',
        ],
        customizations: [
          {
            name: 'Importación de Entradas',
            description: 'Migración/creación inicial de contenidos',
            type: 'slider',
            min: 0,
            max: 100,
            step: 10,
            unit: 'posts',
            pricePerUnit: 8,
          },
          {
            name: 'Comentarios',
            description: 'Sistema de comentarios y moderación',
            type: 'switch',
            price: 100,
          },
          {
            name: 'Newsletter',
            description: 'Captación y envío básico de newsletter',
            type: 'switch',
            price: 150,
          },
        ],
      },
      {
        name: 'SaaS MVP',
        description: 'MVP funcional para un producto SaaS',
        price: 5000,
        features: [
          'Arquitectura escalable',
          'Autenticación y roles',
          'Panel de administración',
        ],
        customizations: [
          {
            name: 'Módulos',
            description: 'Cantidad de módulos/funcionalidades',
            type: 'slider',
            min: 1,
            max: 10,
            step: 1,
            unit: 'módulos',
            pricePerUnit: 400,
          },
          {
            name: 'Autenticación Social',
            description: 'Login con Google/Apple/Meta',
            type: 'switch',
            price: 250,
          },
          {
            name: 'Suscripciones',
            description: 'Planes de pago y facturación recurrente',
            type: 'switch',
            price: 400,
          },
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
        customizations: [
          {
            name: 'Creativos por mes',
            description: 'Cantidad de piezas creativas mensuales',
            type: 'slider',
            min: 2,
            max: 40,
            step: 2,
            unit: 'creativos',
            pricePerUnit: 20,
          },
          {
            name: 'Landing de campaña',
            description: 'Creación/optimización de landing',
            type: 'switch',
            price: 250,
          },
          {
            name: 'Pixel/Conversions API',
            description: 'Implementación y verificación de eventos',
            type: 'switch',
            price: 180,
          },
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
        customizations: [
          {
            name: 'Creativos por mes',
            description: 'Cantidad de banners/video ads',
            type: 'slider',
            min: 2,
            max: 40,
            step: 2,
            unit: 'creativos',
            pricePerUnit: 20,
          },
          {
            name: 'Etiquetado GA4',
            description: 'Eventos y conversiones en GA4',
            type: 'switch',
            price: 180,
          },
          {
            name: 'Landing de campaña',
            description: 'Creación/optimización de landing',
            type: 'switch',
            price: 250,
          },
        ],
      },
      {
        name: 'TikTok Ads',
        description: 'Gestión de campañas en TikTok',
        price: 650,
        features: [
          'Configuración y gestión de campañas',
          'Orientación por intereses',
          'Análisis y optimización',
        ],
        customizations: [
          {
            name: 'UGC / Creators',
            description: 'Gestión de piezas UGC con creadores',
            type: 'switch',
            price: 300,
          },
          {
            name: 'Creativos por mes',
            description: 'Cantidad de videos cortos',
            type: 'slider',
            min: 2,
            max: 40,
            step: 2,
            unit: 'videos',
            pricePerUnit: 25,
          },
        ],
      },
      {
        name: 'LinkedIn Ads',
        description: 'Gestión de campañas B2B en LinkedIn',
        price: 850,
        features: [
          'Segmentación por cargo/industria',
          'ABM básico',
          'Optimización continua',
        ],
        customizations: [
          {
            name: 'Creativos por mes',
            description: 'Piezas para feed y mensajes',
            type: 'slider',
            min: 2,
            max: 30,
            step: 2,
            unit: 'creativos',
            pricePerUnit: 25,
          },
          {
            name: 'Lead Gen Forms',
            description: 'Configuración de formularios nativos',
            type: 'switch',
            price: 120,
          },
        ],
      },
      {
        name: 'YouTube Ads',
        description: 'Campañas de video en YouTube',
        price: 700,
        features: ['TrueView, in‑stream, discovery', 'Segmentación avanzada'],
        customizations: [
          {
            name: 'Videos por mes',
            description: 'Cantidad de cortes/variantes',
            type: 'slider',
            min: 1,
            max: 20,
            step: 1,
            unit: 'videos',
            pricePerUnit: 30,
          },
          {
            name: 'Edición de Piezas',
            description: 'Edición ligera de material entregado',
            type: 'switch',
            price: 200,
          },
        ],
      },
      {
        name: 'SEO Mensual',
        description: 'Optimización SEO on‑page/off‑page',
        price: 600,
        features: ['SEO técnico', 'Contenido y link building básico'],
        customizations: [
          {
            name: 'Palabras clave',
            description: 'Cantidad de keywords objetivo',
            type: 'slider',
            min: 10,
            max: 100,
            step: 10,
            unit: 'keywords',
            pricePerUnit: 5,
          },
          {
            name: 'Link building',
            description: 'Backlinks mensuales gestionados',
            type: 'slider',
            min: 0,
            max: 20,
            step: 2,
            unit: 'links',
            pricePerUnit: 15,
          },
          {
            name: 'Auditoría técnica',
            description: 'Auditoría inicial del sitio',
            type: 'switch',
            price: 250,
          },
        ],
      },
      {
        name: 'Email Marketing',
        description: 'Diseño, envío y automatizaciones',
        price: 400,
        features: ['Campañas mensuales', 'Listas y segmentación básica'],
        customizations: [
          {
            name: 'Campañas/mes',
            description: 'Cantidad de campañas mensuales',
            type: 'slider',
            min: 1,
            max: 8,
            step: 1,
            unit: 'campañas',
            pricePerUnit: 40,
          },
          {
            name: 'Flujos automatizados',
            description: 'Automations (bienvenida, carrito, etc.)',
            type: 'switch',
            price: 300,
          },
          {
            name: 'Segmentación avanzada',
            description: 'Segmentos dinámicos por comportamiento',
            type: 'switch',
            price: 120,
          },
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
        customizations: [
          {
            name: 'Aplicaciones de marca',
            description: 'Tarjetas, papelería, firmas, etc.',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            unit: 'piezas',
            pricePerUnit: 25,
          },
          {
            name: 'Guía de estilo ampliada',
            description: 'Manual extendido con usos/casos',
            type: 'switch',
            price: 180,
          },
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
        customizations: [
          {
            name: 'Propuestas',
            description: 'Cantidad de propuestas iniciales',
            type: 'slider',
            min: 1,
            max: 5,
            step: 1,
            unit: 'propuestas',
            pricePerUnit: 30,
          },
          {
            name: 'Entrega urgente',
            description: 'Prioridad y tiempos reducidos',
            type: 'switch',
            price: 80,
          },
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
        customizations: [
          {
            name: 'Variantes',
            description: 'Tamaños/variantes adicionales',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            unit: 'variantes',
            pricePerUnit: 10,
          },
          {
            name: 'Animado (GIF/MP4)',
            description: 'Banner animado ligero',
            type: 'switch',
            price: 40,
          },
        ],
      },
      {
        name: 'Pack Redes Sociales',
        description: 'Plantillas y posts para redes',
        price: 120,
        features: ['Plantillas editables', 'Formatos para IG/FB/TT'],
        customizations: [
          {
            name: 'Piezas/mes',
            description: 'Cantidad de piezas mensuales',
            type: 'slider',
            min: 4,
            max: 60,
            step: 2,
            unit: 'piezas',
            pricePerUnit: 6,
          },
          {
            name: 'Stories interactivas',
            description: 'Stories con stickers/animaciones',
            type: 'switch',
            price: 40,
          },
        ],
      },
      {
        name: 'Miniaturas YouTube',
        description: 'Thumbnails optimizadas para CTR',
        price: 8,
        features: ['Diseño llamativo', 'Alineado a identidad'],
        customizations: [
          {
            name: 'Thumbnails/mes',
            description: 'Cantidad de miniaturas por mes',
            type: 'slider',
            min: 4,
            max: 60,
            step: 2,
            unit: 'thumbnails',
            pricePerUnit: 6,
          },
          {
            name: 'Edición de rostro/recorte',
            description: 'Recorte fino y colorización',
            type: 'switch',
            price: 30,
          },
        ],
      },
      {
        name: 'Presentación Comercial',
        description: 'Pitch deck/presentación ejecutiva',
        price: 10,
        features: ['Estructura clara', 'Gráficos personalizados'],
        customizations: [
          {
            name: 'Diapositivas',
            description: 'Número de diapositivas',
            type: 'slider',
            min: 5,
            max: 40,
            step: 5,
            unit: 'slides',
            pricePerUnit: 6,
          },
          {
            name: 'Formato de impresión',
            description: 'Versión para imprimir',
            type: 'switch',
            price: 20,
          },
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
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(serviceCalculators[0]);
  const [selectedOption, setSelectedOption] = useState(
    selectedService.options[0]
  );
  const [customizations, setCustomizations] = useState<Record<string, any>>({});
  const [isAnimating, setIsAnimating] = useState(false);

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
    // Start from selected option base price
    let price = selectedOption.price;

    // Merge option-level and service-level customizations for pricing lookup
    const optionCustoms = selectedOption.customizations || [];
    const serviceCustoms = selectedService.customizations || [];

    Object.entries(customizations).forEach(([key, value]) => {
      const customization =
        (optionCustoms.find((c: any) => c.name === key) as any) ||
        (serviceCustoms.find((c: any) => c.name === key) as any);

      if (customization) {
        if (customization.type === 'switch' && value) {
          price += customization.price || 0;
        } else if (customization.type === 'slider') {
          const min = customization.min ?? 0;
          const perUnit =
            (Object.prototype.hasOwnProperty.call(customization, 'pricePerUnit')
              ? customization.pricePerUnit
              : undefined) ??
            customization.price ??
            0;
          const units = Math.max(0, Number(value) - Number(min));
          price += units * perUnit;
        }
      }
    });

    return Math.max(0, Math.round(price));
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

  const nextStep = () => {
    if (currentStep < 3) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const resetWizard = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedService(serviceCalculators[0]);
      setSelectedOption(serviceCalculators[0].options[0]);
      setCustomizations({});
      setIsAnimating(false);
    }, 300);
  };

  const isCompact = currentStep > 1;

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 1200,
        mx: 'auto',
        mb: { xs: 4, md: 6 },
      }}
    >
      {/* Main Calculator Container */}
      <Box
        sx={{
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
          position: 'relative',
          maxWidth: '1100px',
          mx: 'auto',
          boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            p: { xs: isCompact ? 1.5 : 2.5, md: isCompact ? 2 : 3 },
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            borderBottom: 'none',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)',
          }}
        >
          <Box
            sx={{
              display: isCompact ? 'none' : 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
              mb: 1.5,
              boxShadow: '0 6px 16px rgba(0, 122, 255, 0.25)',
            }}
          >
            <Typography
              sx={{
                fontSize: '1.25rem',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              🚀
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              mb: isCompact ? 0.75 : 1.5,
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: {
                xs: isCompact ? '1.1rem' : '1.2rem',
                sm: isCompact ? '1.25rem' : '1.4rem',
                md: isCompact ? '1.4rem' : '1.6rem',
              },
              letterSpacing: '-0.02em',
              textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Calcula tu Inversión
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
              maxWidth: 420,
              mx: 'auto',
              display: isCompact ? 'none' : 'block',
            }}
          >
            Personaliza tu proyecto y obtén un presupuesto al instante
          </Typography>

          {/* Progress Indicator */}
          <Box sx={{ mt: isCompact ? 0.5 : 1.5, mb: isCompact ? 0.5 : 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {[1, 2, 3].map((step) => (
                <Box key={step} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background:
                        currentStep >= step
                          ? 'linear-gradient(135deg, #007AFF, #5AC8FA)'
                          : 'rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow:
                        currentStep >= step
                          ? '0 6px 16px rgba(0, 122, 255, 0.25)'
                          : 'none',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                      }}
                    >
                      {currentStep > step ? '✓' : step}
                    </Typography>
                  </Box>
                  {step < 3 && (
                    <Box
                      sx={{
                        width: 36,
                        height: 2,
                        background:
                          currentStep > step
                            ? 'linear-gradient(135deg, #007AFF, #5AC8FA)'
                            : 'rgba(255, 255, 255, 0.12)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                mt: 1,
                textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              Paso {currentStep} de 3
            </Typography>
          </Box>
        </Box>

        {/* Content Section */}
        <Box sx={{ p: { xs: 2, md: 3 }, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={8}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: isAnimating ? 50 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAnimating ? -50 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#FFFFFF',
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                          mb: 2,
                          fontWeight: 700,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                          letterSpacing: '-0.01em',
                        }}
                      >
                        🎯 ¿Qué tipo de proyecto necesitas?
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        Selecciona el servicio que mejor se adapte a tus
                        necesidades
                      </Typography>
                    </Box>

                    <Grid
                      container
                      spacing={{ xs: 2, sm: 3 }}
                      justifyContent="center"
                    >
                      {serviceCalculators.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={service.name}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Box
                              onClick={() => handleServiceChange(service)}
                              sx={{
                                p: { xs: 2.5, sm: 3 },
                                borderRadius: '20px',
                                background:
                                  selectedService.name === service.name
                                    ? 'linear-gradient(135deg, rgba(0, 122, 255, 0.15) 0%, rgba(90, 200, 250, 0.1) 100%)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                border:
                                  selectedService.name === service.name
                                    ? '2px solid rgba(0, 122, 255, 0.4)'
                                    : '2px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                transition:
                                  'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                position: 'relative',
                                overflow: 'hidden',
                                minHeight: { xs: '200px', sm: 'auto' },
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background:
                                    selectedService.name === service.name
                                      ? 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, transparent 50%)'
                                      : 'transparent',
                                  opacity:
                                    selectedService.name === service.name
                                      ? 1
                                      : 0,
                                  transition: 'opacity 0.3s ease',
                                },
                                '&:hover': {
                                  transform: {
                                    xs: 'none',
                                    sm: 'translateY(-8px)',
                                  },
                                  borderColor: 'rgba(0, 122, 255, 0.6)',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  boxShadow:
                                    '0px 8px 24px rgba(0, 122, 255, 0.15)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  position: 'relative',
                                  zIndex: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: { xs: 45, sm: 50 },
                                    height: { xs: 45, sm: 50 },
                                    borderRadius: '16px',
                                    background:
                                      selectedService.name === service.name
                                        ? 'linear-gradient(135deg, #007AFF, #5AC8FA)'
                                        : 'rgba(255, 255, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: { xs: 2, sm: 3 },
                                    transition: 'all 0.3s ease',
                                    boxShadow:
                                      selectedService.name === service.name
                                        ? '0px 4px 12px rgba(0, 122, 255, 0.2)'
                                        : '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                  }}
                                >
                                  {service.name === 'Desarrollo Web' ? (
                                    <CodeIcon
                                      sx={{
                                        fontSize: { xs: 20, sm: 24 },
                                        color: '#FFFFFF',
                                      }}
                                    />
                                  ) : service.name === 'Marketing Digital' ? (
                                    <TrendingUpIcon
                                      sx={{
                                        fontSize: { xs: 20, sm: 24 },
                                        color: '#FFFFFF',
                                      }}
                                    />
                                  ) : (
                                    <VideoLibraryIcon
                                      sx={{
                                        fontSize: { xs: 20, sm: 24 },
                                        color: '#FFFFFF',
                                      }}
                                    />
                                  )}
                                </Box>

                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: '#FFFFFF',
                                    fontWeight: 600,
                                    mb: 1,
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    textShadow:
                                      '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                  }}
                                >
                                  {service.name}
                                </Typography>

                                <Typography
                                  sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    textShadow:
                                      '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {service.name === 'Desarrollo Web'
                                    ? 'Sitios web y aplicaciones personalizadas'
                                    : service.name === 'Marketing Digital'
                                    ? 'Estrategias de marketing y publicidad'
                                    : 'Contenido visual y edición de video'}
                                </Typography>
                              </Box>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Step 2: Plan Selection */}
                {currentStep === 2 && (
                  <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#FFFFFF',
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                          mb: 2,
                          fontWeight: 700,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                          letterSpacing: '-0.01em',
                        }}
                      >
                        📋 Elige tu plan ideal
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        Selecciona el plan que mejor se adapte a tu presupuesto
                        y necesidades
                      </Typography>
                    </Box>

                    <Grid container spacing={3} justifyContent="center">
                      {selectedService.options.map((option, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Box
                              onClick={() => setSelectedOption(option)}
                              sx={{
                                p: 4,
                                borderRadius: '24px',
                                background:
                                  selectedOption.name === option.name
                                    ? 'linear-gradient(135deg, rgba(0, 122, 255, 0.15) 0%, rgba(90, 200, 250, 0.1) 100%)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                border:
                                  selectedOption.name === option.name
                                    ? '2px solid rgba(0, 122, 255, 0.4)'
                                    : '2px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                transition:
                                  'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                position: 'relative',
                                overflow: 'hidden',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background:
                                    selectedOption.name === option.name
                                      ? 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, transparent 50%)'
                                      : 'transparent',
                                  opacity:
                                    selectedOption.name === option.name ? 1 : 0,
                                  transition: 'opacity 0.3s ease',
                                },
                                '&:hover': {
                                  transform: 'translateY(-8px)',
                                  borderColor: 'rgba(0, 122, 255, 0.6)',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  boxShadow:
                                    '0px 8px 24px rgba(0, 122, 255, 0.15)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  position: 'relative',
                                  zIndex: 2,
                                  flexGrow: 1,
                                }}
                              >
                                {/* Header */}
                                <Box sx={{ textAlign: 'center', mb: 2 }}>
                                  <Box
                                    sx={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: '14px',
                                      background:
                                        selectedOption.name === option.name
                                          ? 'linear-gradient(135deg, #007AFF, #5AC8FA)'
                                          : 'rgba(255, 255, 255, 0.1)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      mx: 'auto',
                                      mb: 2,
                                      transition: 'all 0.3s ease',
                                      boxShadow:
                                        selectedOption.name === option.name
                                          ? '0px 8px 20px rgba(0, 122, 255, 0.3)'
                                          : '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                    }}
                                  >
                                    {selectedService.name ===
                                    'Desarrollo Web' ? (
                                      <CodeIcon
                                        sx={{ fontSize: 24, color: '#FFFFFF' }}
                                      />
                                    ) : selectedService.name ===
                                      'Marketing Digital' ? (
                                      <TrendingUpIcon
                                        sx={{ fontSize: 24, color: '#FFFFFF' }}
                                      />
                                    ) : (
                                      <VideoLibraryIcon
                                        sx={{ fontSize: 24, color: '#FFFFFF' }}
                                      />
                                    )}
                                  </Box>

                                  <Typography
                                    variant="h6"
                                    sx={{
                                      color: '#FFFFFF',
                                      fontWeight: 700,
                                      mb: 1,
                                      fontSize: {
                                        xs: '1.125rem',
                                        md: '1.25rem',
                                      },
                                      textShadow:
                                        '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                    }}
                                  >
                                    {option.name}
                                  </Typography>

                                  <Typography
                                    sx={{
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      fontSize: {
                                        xs: '0.75rem',
                                        md: '0.875rem',
                                      },
                                      textShadow:
                                        '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                      lineHeight: 1.4,
                                      mb: 3,
                                    }}
                                  >
                                    {option.description}
                                  </Typography>
                                </Box>

                                {/* Features */}
                                <Box sx={{ mb: 3 }}>
                                  {option.features
                                    .slice(0, 3)
                                    .map((feature, featureIndex) => (
                                      <Box
                                        key={featureIndex}
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          mb: 1.5,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 18,
                                            height: 18,
                                            borderRadius: '50%',
                                            background:
                                              'linear-gradient(135deg, #007AFF, #5AC8FA)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                            flexShrink: 0,
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: '10px',
                                              color: '#FFFFFF',
                                              fontWeight: 600,
                                            }}
                                          >
                                            ✓
                                          </Typography>
                                        </Box>
                                        <Typography
                                          sx={{
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            textShadow:
                                              '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                            fontSize: {
                                              xs: '0.75rem',
                                              md: '0.875rem',
                                            },
                                            lineHeight: 1.4,
                                          }}
                                        >
                                          {feature}
                                        </Typography>
                                      </Box>
                                    ))}
                                  {option.features.length > 3 && (
                                    <Typography
                                      sx={{
                                        color: '#5AC8FA',
                                        textShadow:
                                          '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                        fontSize: {
                                          xs: '0.75rem',
                                          md: '0.875rem',
                                        },
                                        fontWeight: 500,
                                        ml: 3,
                                        mt: 1,
                                      }}
                                    >
                                      +{option.features.length - 3}{' '}
                                      características más
                                    </Typography>
                                  )}
                                </Box>

                                {/* Price */}
                                <Box
                                  sx={{
                                    borderTop:
                                      '1px solid rgba(255, 255, 255, 0.1)',
                                    pt: 3,
                                    textAlign: 'center',
                                  }}
                                >
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      color: '#007AFF',
                                      textShadow:
                                        '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                      fontWeight: 800,
                                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                                      letterSpacing: '-0.01em',
                                    }}
                                  >
                                    {option.price}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Step 3: Customizations */}
                {currentStep === 3 && (
                  <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#FFFFFF',
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                          mb: 2,
                          fontWeight: 700,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                          letterSpacing: '-0.01em',
                        }}
                      >
                        ⚙️ Personaliza tu proyecto
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        Añade funcionalidades adicionales para personalizar tu
                        proyecto
                      </Typography>
                    </Box>

                    <Grid container spacing={3}>
                      {selectedOption.customizations?.map(
                        (customization: any, index: number) => (
                          <Grid item xs={12} md={6} key={index}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <Box
                                sx={{
                                  p: 4,
                                  borderRadius: '20px',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                  backdropFilter: 'blur(20px)',
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: '#FFFFFF',
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    textShadow:
                                      '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                  }}
                                >
                                  {customization.name}
                                </Typography>

                                <Typography
                                  sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    textShadow:
                                      '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                    mb: 3,
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {customization.description}
                                </Typography>

                                {customization.type === 'slider' ? (
                                  <Box>
                                    <Slider
                                      value={
                                        customizations[customization.name] ||
                                        customization.min
                                      }
                                      onChange={(_, value) =>
                                        handleCustomizationChange(
                                          customization.name,
                                          value
                                        )
                                      }
                                      min={customization.min}
                                      max={customization.max}
                                      step={customization.step}
                                      sx={{
                                        color: '#007AFF',
                                        '& .MuiSlider-thumb': {
                                          background:
                                            'linear-gradient(135deg, #007AFF, #5AC8FA)',
                                          boxShadow:
                                            '0px 4px 12px rgba(0, 122, 255, 0.3)',
                                        },
                                        '& .MuiSlider-track': {
                                          background:
                                            'linear-gradient(135deg, #007AFF, #5AC8FA)',
                                        },
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        color: '#5AC8FA',
                                        fontWeight: 600,
                                        mt: 1,
                                        textAlign: 'center',
                                        textShadow:
                                          '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                      }}
                                    >
                                      {customizations[customization.name] ||
                                        customization.min}{' '}
                                      {customization.unit}
                                    </Typography>
                                  </Box>
                                ) : (
                                  <FormControlLabel
                                    control={
                                      <IOSSwitch
                                        checked={
                                          customizations[customization.name] ||
                                          false
                                        }
                                        onChange={(e) =>
                                          handleCustomizationChange(
                                            customization.name,
                                            e.target.checked
                                          )
                                        }
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          color: customizations[
                                            customization.name
                                          ]
                                            ? '#5AC8FA'
                                            : 'rgba(255, 255, 255, 0.7)',
                                          fontWeight: customizations[
                                            customization.name
                                          ]
                                            ? 600
                                            : 400,
                                          textShadow:
                                            '0px 2px 8px rgba(0, 0, 0, 0.3)',
                                        }}
                                      >
                                        {customizations[customization.name]
                                          ? 'Incluido'
                                          : 'No incluido'}
                                      </Typography>
                                    }
                                  />
                                )}
                              </Box>
                            </motion.div>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>
                )}

                {/* Final Summary - Only show on step 3 */}
                {currentStep === 3 && (
                  <Box
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: '24px',
                      background:
                        'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(90, 200, 250, 0.05) 100%)',
                      border: '1px solid rgba(0, 122, 255, 0.2)',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      mt: 3,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                      radial-gradient(circle at 30% 30%, rgba(0, 122, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(90, 200, 250, 0.08) 0%, transparent 50%)
                    `,
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontWeight: 500,
                          mb: 2,
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        💰 Tu inversión estimada
                      </Typography>

                      <Typography
                        variant="h2"
                        sx={{
                          color: '#FFFFFF',
                          fontWeight: 800,
                          mb: 3,
                          fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                          letterSpacing: '-0.02em',
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                          background:
                            'linear-gradient(135deg, #FFFFFF 0%, #5AC8FA 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        desde €{calculatePrice()}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                          mb: 4,
                          maxWidth: 400,
                          mx: 'auto',
                          lineHeight: 1.5,
                        }}
                      >
                        Precio estimado base. Contacta con nosotros para un
                        presupuesto detallado y personalizado.
                      </Typography>

                      <AnimatedButton
                        variant="contained"
                        size="large"
                        href="/contacto"
                        animationVariant="scale"
                        sx={{
                          px: { xs: 6, md: 8 },
                          py: { xs: 2.5, md: 3 },
                          borderRadius: '20px',
                          background:
                            'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          fontWeight: 700,
                          boxShadow: '0px 6px 20px rgba(0, 122, 255, 0.25)',
                          textTransform: 'none',
                          letterSpacing: '-0.01em',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0px 8px 32px rgba(0, 122, 255, 0.3)',
                            background:
                              'linear-gradient(135deg, #0056CC 0%, #4A9EFF 100%)',
                          },
                        }}
                      >
                        🚀 Iniciar Proyecto
                      </AnimatedButton>
                    </Box>
                  </Box>
                )}
              </motion.div>
            </Grid>

            {/* Sticky Summary (Apple-like) */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  position: { xs: 'static', md: 'sticky' },
                  top: { md: 16 },
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(18px)',
                  p: { xs: 2.5, md: 3 },
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Resumen de inversión
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}
                  >
                    Servicio
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                    {selectedService.name}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}
                  >
                    Plan
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                    {selectedOption?.name}
                  </Typography>
                </Box>

                {/* Selected customizations summary */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, mb: 1 }}
                  >
                    Personalización
                  </Typography>
                  {(() => {
                    const items: Array<{
                      label: string;
                      value: string;
                    } | null> = [];
                    const optionCustoms = selectedOption.customizations || [];
                    const serviceCustoms = selectedService.customizations || [];
                    Object.entries(customizations).forEach(([key, value]) => {
                      const c: any =
                        optionCustoms.find((x: any) => x.name === key) ||
                        serviceCustoms.find((x: any) => x.name === key);
                      if (!c) return;
                      if (c.type === 'switch') {
                        if (value) items.push({ label: c.name, value: 'Sí' });
                      } else if (c.type === 'slider') {
                        items.push({
                          label: c.name,
                          value: `${value}${c.unit ? ' ' + c.unit : ''}`,
                        });
                      }
                    });
                    if (items.length === 0) {
                      return (
                        <Typography
                          sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}
                        >
                          Sin extras seleccionados
                        </Typography>
                      );
                    }
                    return (
                      <Box sx={{ display: 'grid', gap: 0.75 }}>
                        {items.map(
                          (it, i) =>
                            it && (
                              <Box
                                key={i}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  color: 'rgba(255,255,255,0.85)',
                                }}
                              >
                                <Typography sx={{ fontSize: 14 }}>
                                  {it.label}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 14, opacity: 0.85 }}
                                >
                                  {it.value}
                                </Typography>
                              </Box>
                            )
                        )}
                      </Box>
                    );
                  })()}
                </Box>

                {/* Total with subtle animation */}
                <Box
                  sx={{
                    mt: 1.5,
                    pt: 1.5,
                    borderTop: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.75)' }}>
                    Total estimado
                  </Typography>
                  <AnimatedPrice value={calculatePrice()} />
                </Box>

                <AnimatedButton
                  variant="contained"
                  size="large"
                  href="/contacto"
                  animationVariant="scale"
                  sx={{
                    mt: 2,
                    width: '100%',
                    borderRadius: '14px',
                    background:
                      'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                    fontWeight: 700,
                    textTransform: 'none',
                  }}
                >
                  Solicitar presupuesto
                </AnimatedButton>
              </Box>
            </Grid>
          </Grid>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
              pt: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              sx={{
                px: { xs: 3, sm: 4 },
                py: 1.5,
                borderRadius: '12px',
                background:
                  currentStep === 1
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.1)',
                color:
                  currentStep === 1 ? 'rgba(255, 255, 255, 0.3)' : '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  background:
                    currentStep === 1
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              ← Anterior
            </Button>

            <Button
              onClick={resetWizard}
              sx={{
                px: { xs: 3, sm: 3 },
                py: 1.5,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              🔄 Reiniciar
            </Button>

            <Button
              onClick={nextStep}
              disabled={currentStep === 3}
              sx={{
                px: { xs: 3, sm: 4 },
                py: 1.5,
                borderRadius: '12px',
                background:
                  currentStep === 3
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                width: { xs: '100%', sm: 'auto' },
                boxShadow:
                  currentStep === 3
                    ? 'none'
                    : '0px 2px 8px rgba(0, 122, 255, 0.2)',
                '&:hover': {
                  background:
                    currentStep === 3
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'linear-gradient(135deg, #0056CC, #4A9EFF)',
                  boxShadow:
                    currentStep === 3
                      ? 'none'
                      : '0px 4px 12px rgba(0, 122, 255, 0.25)',
                },
              }}
            >
              {currentStep === 3 ? 'Finalizado' : 'Siguiente →'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// iOS-like switch styling (subtle, rounded, Apple-inspired)
const IOSSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      '& + .MuiSwitch-track': {
        background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
    width: 18,
    height: 18,
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
}));

// Animated price component for smooth counting effect
const AnimatedPrice: React.FC<{ value: number }> = ({ value }) => {
  const [display, setDisplay] = React.useState(value);
  const prevRef = React.useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 400;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    prevRef.current = value;
  }, [value]);

  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 800,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #5AC8FA 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.01em',
      }}
    >
      €{display}
    </Typography>
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
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
          pt: { xs: 8, md: 0 }, // Add top padding on mobile to avoid navbar overlap
        }}
      >
        {/* Video Background */}
        <VideoBackground src={heroVideos.creative} opacity={0.4} />

        {/* Creative Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(90, 200, 250, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)
            `,
            zIndex: 1,
          }}
        />

        {/* Floating Particles */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(0, 122, 255, 0.6)',
            animation: 'float 6s ease-in-out infinite',
            zIndex: 1,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
              '25%': { transform: 'translateY(-20px) translateX(10px)' },
              '50%': { transform: 'translateY(-10px) translateX(-5px)' },
              '75%': { transform: 'translateY(-30px) translateX(15px)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            right: '15%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(90, 200, 250, 0.8)',
            animation: 'float 8s ease-in-out infinite reverse',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'rgba(124, 58, 237, 0.7)',
            animation: 'float 10s ease-in-out infinite',
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Creative Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 3,
                      py: 1.5,
                      mb: 4,
                      borderRadius: '25px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0px 4px 20px rgba(0, 122, 255, 0.2)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        letterSpacing: '0.5px',
                        textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      ✨ Agencia Creativa Digital
                    </Typography>
                  </Box>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: {
                        xs: '2.5rem',
                        sm: '3.5rem',
                        md: '4rem',
                        lg: '4.5rem',
                      },
                      lineHeight: 1.1,
                      mb: 3,
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                      fontFamily:
                        'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                      textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    Destaca en el
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        color: '#5AC8FA',
                        fontWeight: 900,
                      }}
                    >
                      mundo digital
                    </Box>
                  </Typography>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 400,
                      mb: 5,
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: {
                        xs: '1.125rem',
                        sm: '1.25rem',
                        md: '1.375rem',
                      },
                      lineHeight: 1.6,
                      maxWidth: '520px',
                      letterSpacing: '-0.01em',
                      textShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    Somos una agencia creativa especializada en impulsar la
                    presencia digital de empresas y marcas personales mediante
                    soluciones estratégicas y creativas.
                  </Typography>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 6 }}
                  >
                    <AnimatedButton
                      variant="contained"
                      size="large"
                      href="/servicios"
                      animationVariant="scale"
                      sx={{
                        px: 5,
                        py: 2.5,
                        borderRadius: '16px',
                        background:
                          'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        boxShadow: '0px 4px 16px rgba(0, 122, 255, 0.25)',
                        textTransform: 'none',
                        letterSpacing: '-0.01em',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0px 6px 20px rgba(0, 122, 255, 0.3)',
                          background:
                            'linear-gradient(135deg, #0056CC 0%, #4A9EFF 100%)',
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
                        px: 5,
                        py: 2.5,
                        borderRadius: '16px',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderWidth: '2px',
                        color: '#FFFFFF',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        textTransform: 'none',
                        letterSpacing: '-0.01em',
                        textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0px 8px 32px rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    >
                      Contactar
                    </AnimatedButton>
                  </Box>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontWeight: 500,
                          textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        ✓ 50+ Proyectos Completados
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontWeight: 500,
                          textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        ✓ 98% Satisfacción Cliente
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontWeight: 500,
                          textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        ✓ Entrega Rápida
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow:
                      '0px 20px 60px rgba(0, 0, 0, 0.3), 0px 8px 24px rgba(0, 122, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(90, 200, 250, 0.05) 100%)',
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={mockImages.digitalMarketing}
                    alt="Digital Marketing Solutions"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  />

                  {/* Glow Effect */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background:
                        'radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, transparent 70%)',
                      zIndex: 0,
                      animation: 'rotate 20s linear infinite',
                      '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Nuestros Servicios Section (minimal white) */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          '&::before': { content: '""', display: 'none' },
        }}
      >
        {/* Floating elements removed for minimal style */}

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: '#8E8E93',
                  fontWeight: 600,
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Nuestros servicios
              </Typography>

              <Typography
                variant="h2"
                component="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  color: '#1D1D1F',
                  letterSpacing: '-0.02em',
                }}
              >
                Soluciones digitales integrales
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(0,0,0,0.6)',
                  fontWeight: 400,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                Transformamos ideas en experiencias digitales claras, útiles y
                bellas.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
            {/* Video Editing Card */}
            <Grid item xs={6} sm={4} md={2.4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0px 10px 24px rgba(0,0,0,0.10)',
                      borderColor: 'rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 56, sm: 64, md: 72 },
                      height: { xs: 56, sm: 64, md: 72 },
                      borderRadius: '20px',
                      background: '#F2F2F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <VideoLibraryIcon
                      sx={{
                        fontSize: { xs: 28, sm: 32, md: 36 },
                        color: '#007AFF',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#1D1D1F',
                      fontSize: { xs: '1.125rem', md: '1.375rem' },
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Edición de Videos
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(0,0,0,0.6)',
                      mb: 2,
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    Contenido visual impactante que refleja la esencia de tu
                    marca.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Branding Card */}
            <Grid item xs={6} sm={4} md={2.4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0px 10px 24px rgba(0,0,0,0.10)',
                      borderColor: 'rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56, md: 64 },
                      height: { xs: 48, sm: 56, md: 64 },
                      borderRadius: '16px',
                      background: '#F2F2F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <DesignServicesIcon
                      sx={{
                        fontSize: { xs: 24, sm: 28, md: 32 },
                        color: '#007AFF',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#1D1D1F',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Branding e identidad visual
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(0,0,0,0.6)',
                      mb: 2,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    Identidad visual integral que refleja la esencia y valores
                    de tu marca.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Web Development Card */}
            <Grid item xs={6} sm={4} md={2.4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0px 10px 24px rgba(0,0,0,0.10)',
                      borderColor: 'rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56, md: 64 },
                      height: { xs: 48, sm: 56, md: 64 },
                      borderRadius: '16px',
                      background: '#F2F2F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <CodeIcon
                      sx={{
                        fontSize: { xs: 24, sm: 28, md: 32 },
                        color: '#007AFF',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#1D1D1F',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Desarrollo Web y Apps
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(0,0,0,0.6)',
                      mb: 2,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    Soluciones digitales a medida con tecnologías modernas para
                    tu negocio.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Marketing Card */}
            <Grid item xs={6} sm={4} md={2.4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0px 10px 24px rgba(0,0,0,0.10)',
                      borderColor: 'rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56, md: 64 },
                      height: { xs: 48, sm: 56, md: 64 },
                      borderRadius: '16px',
                      background: '#F2F2F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <TrendingUpIcon
                      sx={{
                        fontSize: { xs: 24, sm: 28, md: 32 },
                        color: '#007AFF',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#1D1D1F',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Marketing para empresas
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(0,0,0,0.6)',
                      mb: 2,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    Estrategias personalizadas para maximizar tu impacto en el
                    mercado.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* SAAS Card */}
            <Grid item xs={6} sm={4} md={2.4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0px 10px 24px rgba(0,0,0,0.10)',
                      borderColor: 'rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56, md: 64 },
                      height: { xs: 48, sm: 56, md: 64 },
                      borderRadius: '16px',
                      background: '#F2F2F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <StorefrontIcon
                      sx={{
                        fontSize: { xs: 24, sm: 28, md: 32 },
                        color: '#007AFF',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#1D1D1F',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Soluciones SAAS
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(0,0,0,0.6)',
                      mb: 2,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    Plataformas escalables que automatizan y optimizan los
                    procesos de tu empresa.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Calculator Section (white) */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            id="calcula-tu-inversion"
            sx={{ px: { xs: 1, md: 0 }, mt: { xs: 2, md: 4 } }}
          >
            <Box ref={calculatorRef}>
              <TypeformEstimator
                initialService={calculatorService || serviceCalculators[0]}
                initialOption={
                  calculatorOption || serviceCalculators[0].options[0]
                }
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section (white) */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: '#8E8E93',
                  fontWeight: 600,
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Nuestros precios
              </Typography>

              <Typography
                variant="h2"
                component="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  color: '#1D1D1F',
                  letterSpacing: '-0.02em',
                }}
              >
                Servicios premium a precios justos
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(0,0,0,0.6)',
                  fontWeight: 400,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                Inversión clara y honesta para impulsar tu marca.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={{ xs: 2, md: 4 }}>
            {pricingOptions.map((option) => (
              <Grid item xs={12} sm={6} md={4} key={option.name}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 2, md: 2.5 },
                    borderRadius: '16px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                    transition:
                      'transform .15s ease-out, box-shadow .15s ease-out, border-color .15s ease-out',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0px 10px 24px rgba(0,0,0,0.10)',
                      borderColor: 'rgba(0,0,0,0.12)',
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
                          color: '#007AFF',
                        }}
                      >
                        <CodeIcon sx={{ fontSize: 20 }} />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 1.5,
                            fontWeight: 700,
                            fontSize: { xs: '1rem', md: '1.2rem' },
                            color: '#1D1D1F',
                            letterSpacing: '0.2px',
                          }}
                        >
                          {option.name}
                        </Typography>
                      </Box>
                      <Typography
                        paragraph
                        sx={{
                          color: 'rgba(0,0,0,0.65)',
                          fontSize: { xs: '0.8rem', md: '0.9rem' },
                          mb: { xs: 1, md: 1.5 },
                          lineHeight: 1.5,
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
                            color: 'rgba(0,0,0,0.7)',
                            fontSize: { xs: '0.8rem', md: '0.85rem' },
                            lineHeight: 1.4,
                          }}
                        >
                          <ArrowForwardIcon
                            sx={{
                              mr: 0.75,
                              fontSize: { xs: 12, md: 14 },
                              color: '#007AFF',
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
                            color: '#007AFF',
                            fontSize: { xs: '0.8rem', md: '0.85rem' },
                            fontStyle: 'italic',
                          }}
                        >
                          +{option.features.length - 4} más
                        </Typography>
                      )}

                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 800,
                          color: '#007AFF',
                          fontSize: { xs: '1.2rem', md: '1.35rem' },
                          textAlign: 'right',
                          mt: 1.5,
                          pt: 1,
                          borderTop: '1px solid rgba(0,0,0,0.08)',
                          letterSpacing: '-0.01em',
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

// Typeform-style estimator (one question per screen)
const TypeformEstimator: React.FC<{
  initialService?: ServiceCalculator;
  initialOption?: any;
}> = ({ initialService, initialOption }) => {
  const [selectedService, setSelectedService] = useState<ServiceCalculator>(
    initialService || serviceCalculators[0]
  );
  const [selectedOption, setSelectedOption] = useState<any>(
    initialOption || (initialService || serviceCalculators[0]).options[0]
  );
  const [customizations, setCustomizations] = useState<Record<string, any>>({});
  const [qIndex, setQIndex] = useState(0); // 0: service, 1: plan, >=2: customizations

  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialOption) setSelectedOption(initialOption);
  }, [initialService, initialOption]);

  const optionCustoms = selectedOption?.customizations || [];
  const totalQuestions = 2 + optionCustoms.length;
  const progress = Math.min(
    100,
    Math.round(((qIndex + 1) / totalQuestions) * 100)
  );

  const setCustomization = (name: string, value: any) => {
    setCustomizations((prev) => ({ ...prev, [name]: value }));
  };

  const calcPrice = () => {
    let price = selectedOption?.price || 0;
    const serviceCustoms = selectedService.customizations || [];
    Object.entries(customizations).forEach(([key, value]) => {
      const c: any =
        optionCustoms.find((x: any) => x.name === key) ||
        serviceCustoms.find((x: any) => x.name === key);
      if (!c) return;
      if (c.type === 'switch' && value) {
        price += c.price || 0;
      } else if (c.type === 'slider') {
        const min = c.min ?? 0;
        const perUnit =
          (Object.prototype.hasOwnProperty.call(c, 'pricePerUnit')
            ? c.pricePerUnit
            : undefined) ??
          c.price ??
          0;
        const units = Math.max(0, Number(value) - Number(min));
        price += units * perUnit;
      }
    });
    return Math.max(0, Math.round(price));
  };

  const autoNext = () =>
    setTimeout(
      () => setQIndex((i) => Math.min(i + 1, totalQuestions - 1)),
      220
    );
  const handleServiceSelect = (svc: ServiceCalculator) => {
    setSelectedService(svc);
    setSelectedOption(svc.options[0]);
    setCustomizations({});
    setQIndex(1);
  };
  const handlePlanSelect = (opt: any) => {
    setSelectedOption(opt);
    setCustomizations({});
    if ((opt.customizations || []).length === 0) {
      setQIndex(totalQuestions - 1); // Jump to summary if no customizations
    } else {
      setQIndex(2);
    }
  };

  const onNext = () => setQIndex((i) => Math.min(i + 1, totalQuestions - 1));
  const onPrev = () => setQIndex((i) => Math.max(i - 1, 0));

  const renderQuestion = () => {
    if (qIndex === 0) {
      return (
        <Box>
          <Typography
            variant="h6"
            sx={{ color: '#1D1D1F', fontWeight: 700, mb: 1 }}
          >
            ¿Qué tipo de proyecto necesitas?
          </Typography>
          <Typography sx={{ color: 'rgba(0,0,0,0.6)', mb: 3 }}>
            Elige un servicio para comenzar
          </Typography>
          <Grid container spacing={2}>
            {serviceCalculators.map((svc) => (
              <Grid item xs={12} sm={6} md={4} key={svc.name}>
                <Box
                  onClick={() => handleServiceSelect(svc)}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background:
                      selectedService.name === svc.name
                        ? 'linear-gradient(135deg, rgba(0,122,255,0.08), rgba(90,200,250,0.06))'
                        : '#FFFFFF',
                    border:
                      selectedService.name === svc.name
                        ? '2px solid rgba(0,122,255,0.35)'
                        : '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all .25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(0,122,255,0.5)',
                    },
                  }}
                >
                  <Typography
                    sx={{ color: '#1D1D1F', fontWeight: 700, mb: 0.5 }}
                  >
                    {svc.name}
                  </Typography>
                  <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: 14 }}>
                    {svc.name === 'Desarrollo Web'
                      ? 'Sitios web y aplicaciones'
                      : svc.name === 'Marketing Digital'
                      ? 'Estrategias y campañas'
                      : 'Contenido visual y video'}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    if (qIndex === 1) {
      return (
        <Box>
          <Typography
            variant="h6"
            sx={{ color: '#1D1D1F', fontWeight: 700, mb: 1 }}
          >
            Elige tu plan ideal
          </Typography>
          <Typography sx={{ color: 'rgba(0,0,0,0.6)', mb: 3 }}>
            Selecciona el plan que mejor se adapte
          </Typography>
          <Grid container spacing={2}>
            {(selectedService.options || []).map((opt: any) => (
              <Grid item xs={12} sm={6} md={4} key={opt.name}>
                <Box
                  onClick={() => handlePlanSelect(opt)}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background:
                      selectedOption?.name === opt.name
                        ? 'linear-gradient(135deg, rgba(0,122,255,0.08), rgba(90,200,250,0.06))'
                        : '#FFFFFF',
                    border:
                      selectedOption?.name === opt.name
                        ? '2px solid rgba(0,122,255,0.35)'
                        : '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all .25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(0,122,255,0.5)',
                    },
                  }}
                >
                  <Typography
                    sx={{ color: '#1D1D1F', fontWeight: 700, mb: 0.5 }}
                  >
                    {opt.name}
                  </Typography>
                  <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: 14 }}>
                    {opt.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    const idx = qIndex - 2;
    const c = optionCustoms[idx];
    if (!c) return null;
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{ color: '#1D1D1F', fontWeight: 700, mb: 1 }}
        >
          {c.name}
        </Typography>
        <Typography sx={{ color: 'rgba(0,0,0,0.6)', mb: 3 }}>
          {c.description}
        </Typography>
        {c.type === 'slider' ? (
          <Box>
            <Slider
              value={customizations[c.name] ?? c.min ?? 0}
              onChange={(_, value) => setCustomization(c.name, value)}
              min={c.min}
              max={c.max}
              step={c.step}
              sx={{ color: '#007AFF' }}
            />
            <Typography
              sx={{
                color: '#5AC8FA',
                fontWeight: 600,
                textAlign: 'center',
                mt: 1,
              }}
            >
              {customizations[c.name] ?? c.min} {c.unit}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant={customizations[c.name] ? 'contained' : 'outlined'}
              onClick={() => {
                setCustomization(c.name, true);
                autoNext();
              }}
              sx={{
                textTransform: 'none',
                background: customizations[c.name]
                  ? 'linear-gradient(135deg, #007AFF, #5AC8FA)'
                  : '#FFFFFF',
                color: customizations[c.name] ? '#fff' : 'rgba(0,0,0,0.85)',
                borderColor: 'rgba(0,0,0,0.15)',
              }}
            >
              Sí
            </Button>
            <Button
              variant={!customizations[c.name] ? 'contained' : 'outlined'}
              onClick={() => {
                setCustomization(c.name, false);
                autoNext();
              }}
              sx={{
                textTransform: 'none',
                background: !customizations[c.name]
                  ? 'linear-gradient(135deg, #007AFF, #5AC8FA)'
                  : '#FFFFFF',
                color: !customizations[c.name] ? '#fff' : 'rgba(0,0,0,0.85)',
                borderColor: 'rgba(0,0,0,0.15)',
              }}
            >
              No
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  const isSummary =
    qIndex >= totalQuestions - 1 && optionCustoms.length === 0
      ? true
      : qIndex === totalQuestions - 1;

  // Request quote dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lead, setLead] = useState<{
    name: string;
    email: string;
    phone: string;
    notes: string;
  }>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [leadErrors, setLeadErrors] = useState<
    Partial<{ name: string; email: string }>
  >({});
  const [sending, setSending] = useState(false);
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const openRequestDialog = () => setDialogOpen(true);
  const closeRequestDialog = () => setDialogOpen(false);

  const buildSummary = () => {
    const lines: string[] = [];
    lines.push(`Servicio: ${selectedService.name}`);
    lines.push(`Plan: ${selectedOption?.name}`);
    const optionCustoms = selectedOption?.customizations || [];
    const serviceCustoms = selectedService.customizations || [];
    const extras: string[] = [];
    Object.entries(customizations).forEach(([key, value]) => {
      const c: any =
        optionCustoms.find((x: any) => x.name === key) ||
        serviceCustoms.find((x: any) => x.name === key);
      if (!c) return;
      if (c.type === 'switch') {
        if (value) extras.push(`${c.name}: Sí`);
      } else if (c.type === 'slider') {
        extras.push(`${c.name}: ${value}${c.unit ? ' ' + c.unit : ''}`);
      }
    });
    if (extras.length) {
      lines.push('Extras:');
      lines.push(...extras.map((e) => `- ${e}`));
    } else {
      lines.push('Extras: Ninguno');
    }
    lines.push(`Total estimado: €${calcPrice()}`);
    return lines.join('\n');
  };

  const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID as
    | string
    | undefined;
  const AIRTABLE_TABLE_NAME =
    (process.env.REACT_APP_AIRTABLE_TABLE_NAME as string | undefined) ||
    'Leads';
  const AIRTABLE_API_URL = AIRTABLE_BASE_ID
    ? `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`
    : undefined;

  const validateLead = () => {
    const errs: Partial<{ name: string; email: string }> = {};
    if (!lead.name.trim()) errs.name = 'Ingresa tu nombre';
    if (!lead.email.trim()) errs.email = 'Ingresa tu correo';
    setLeadErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitQuote = async () => {
    if (!validateLead()) return;
    if (!process.env.REACT_APP_AIRTABLE_PAT || !AIRTABLE_API_URL) {
      setSnack({
        open: true,
        message: 'Configuración de envío no disponible.',
        severity: 'error',
      });
      return;
    }

    setSending(true);
    try {
      const subject = `Solicitud de Presupuesto - ${selectedService.name} / ${selectedOption?.name}`;
      const message = `${buildSummary()}\n\nNotas del cliente:\n${
        lead.notes || '—'
      }`;

      const record = {
        records: [
          {
            fields: {
              Name: lead.name.trim(),
              Email: lead.email.trim(),
              Phone: lead.phone.trim(),
              Subject: subject,
              Message: message,
              'Submission Date': new Date().toISOString().split('T')[0],
            },
          },
        ],
      };

      const res = await fetch(AIRTABLE_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!res.ok) throw new Error('Error al enviar la solicitud.');

      setSnack({
        open: true,
        message: '¡Solicitud enviada! Te contactaremos pronto.',
        severity: 'success',
      });
      setDialogOpen(false);
    } catch (e: any) {
      setSnack({
        open: true,
        message: e.message || 'Error al enviar.',
        severity: 'error',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: '16px',
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        p: { xs: 2, md: 3 },
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      {/* Progress Bar */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{ height: 6, borderRadius: 999, background: 'rgba(0,0,0,0.08)' }}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: '100%',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
            }}
          />
        </Box>
      </Box>

      {/* Title */}
      <Box sx={{ textAlign: 'left', mb: 2 }}>
        <Typography
          sx={{
            color: '#1D1D1F',
            fontWeight: 800,
            fontSize: { xs: 18, md: 20 },
            letterSpacing: '-0.01em',
          }}
        >
          Calcula tu Inversión
        </Typography>
        <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: 14 }}>
          Pregunta {Math.min(qIndex + 1, totalQuestions)} de {totalQuestions}
        </Typography>
      </Box>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isSummary ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              Tu inversión estimada
            </Typography>
            <AnimatedPrice value={calcPrice()} />
          </Box>
        ) : (
          renderQuestion()
        )}
      </motion.div>

      {/* Controls (always show Back; mobile-friendly) */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1.5,
          mt: 3,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Button
          onClick={onPrev}
          disabled={qIndex === 0}
          sx={{
            textTransform: 'none',
            color: 'rgba(0,0,0,0.85)',
            border: '1px solid rgba(0,0,0,0.12)',
            background: '#F2F2F7',
            px: 3,
            borderRadius: '10px',
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          ← Atrás
        </Button>

        {isSummary ? (
          <Button
            onClick={openRequestDialog}
            sx={{
              textTransform: 'none',
              background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
              color: '#fff',
              px: 3,
              borderRadius: '10px',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Solicitar presupuesto
          </Button>
        ) : qIndex >= 2 && optionCustoms[qIndex - 2]?.type === 'slider' ? (
          <Button
            onClick={onNext}
            sx={{
              textTransform: 'none',
              background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
              color: '#fff',
              px: 3,
              borderRadius: '10px',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Continuar →
          </Button>
        ) : null}
      </Box>

      {/* Request Quote Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={closeRequestDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Solicitar presupuesto</DialogTitle>
        <DialogContent dividers>
          <Typography
            sx={{
              mb: 1.5,
              whiteSpace: 'pre-wrap',
              fontSize: 14,
              color: 'rgba(0,0,0,0.7)',
            }}
          >
            {buildSummary()}
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={lead.name}
            onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
            error={!!leadErrors.name}
            helperText={leadErrors.name}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={lead.email}
            onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
            error={!!leadErrors.email}
            helperText={leadErrors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Teléfono (opcional)"
            value={lead.phone}
            onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Notas adicionales (opcional)"
            multiline
            minRows={3}
            value={lead.notes}
            onChange={(e) => setLead((p) => ({ ...p, notes: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRequestDialog}>Cancelar</Button>
          <Button onClick={submitQuote} disabled={sending} variant="contained">
            {sending ? 'Enviando…' : 'Enviar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.message}
        </Alert>
      </Snackbar>

      {/* Footer estimate (sticky within card) */}
      <Box
        sx={{
          mt: 2,
          pt: 1.5,
          borderTop: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          bottom: 0,
          background: '#FFFFFF',
        }}
      >
        <Typography sx={{ color: 'rgba(0,0,0,0.65)' }}>
          Total estimado
        </Typography>
        <AnimatedPrice value={calcPrice()} />
      </Box>
    </Box>
  );
};
