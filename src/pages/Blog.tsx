import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const MotionCard = motion(Card);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'El Futuro del Desarrollo Web: Tendencias 2024',
    excerpt:
      'Descubre las últimas tendencias en desarrollo web que dominarán el próximo año.',
    image: '/blog/web-dev-trends.jpg',
    category: 'Desarrollo Web',
    author: {
      name: 'Ana Martínez',
      avatar: '/team/ana.jpg',
    },
    date: '15 Mar 2024',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Inteligencia Artificial en el Desarrollo de Software',
    excerpt:
      'Cómo la IA está transformando la manera en que desarrollamos software.',
    image: '/blog/ai-software.jpg',
    category: 'Tecnología',
    author: {
      name: 'Carlos Ruiz',
      avatar: '/team/carlos.jpg',
    },
    date: '12 Mar 2024',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Optimización de Rendimiento en React',
    excerpt:
      'Guía completa para mejorar el rendimiento de tus aplicaciones React.',
    image: '/blog/react-performance.jpg',
    category: 'React',
    author: {
      name: 'Laura Sánchez',
      avatar: '/team/laura.jpg',
    },
    date: '10 Mar 2024',
    readTime: '10 min',
  },
  {
    id: 4,
    title: 'Diseño UX para Aplicaciones Móviles',
    excerpt:
      'Mejores prácticas de diseño UX para crear aplicaciones móviles exitosas.',
    image: '/blog/ux-mobile.jpg',
    category: 'Diseño UX',
    author: {
      name: 'Miguel Torres',
      avatar: '/team/miguel.jpg',
    },
    date: '8 Mar 2024',
    readTime: '6 min',
  },
  {
    id: 5,
    title: 'Seguridad en Aplicaciones Web Modernas',
    excerpt:
      'Protege tus aplicaciones web con las últimas prácticas de seguridad.',
    image: '/blog/web-security.jpg',
    category: 'Seguridad',
    author: {
      name: 'Elena Gómez',
      avatar: '/team/elena.jpg',
    },
    date: '5 Mar 2024',
    readTime: '8 min',
  },
  {
    id: 6,
    title: 'TypeScript: Más Allá de los Tipos Básicos',
    excerpt: 'Aprende técnicas avanzadas de TypeScript para mejorar tu código.',
    image: '/blog/typescript.jpg',
    category: 'TypeScript',
    author: {
      name: 'David López',
      avatar: '/team/david.jpg',
    },
    date: '3 Mar 2024',
    readTime: '9 min',
  },
];

const Blog: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 12, md: 15 },
        pb: { xs: 8, md: 12 },
        background: `linear-gradient(to bottom, ${alpha(
          theme.palette.primary.main,
          0.05
        )}, transparent)`,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            variant="h2"
            fontWeight="bold"
            mb={2}
          >
            Blog
          </Typography>
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variant="h5"
            color="text.secondary"
            mb={4}
          >
            Últimas noticias y artículos sobre tecnología y desarrollo
          </Typography>

          {/* Search Bar */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            sx={{ maxWidth: 600, mx: 'auto', mb: 8 }}
          >
            <TextField
              fullWidth
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                },
              }}
            />
          </Box>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {filteredPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Box sx={{ mt: 'auto' }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          src={post.author.avatar}
                          alt={post.author.name}
                          sx={{ width: 24, height: 24 }}
                        >
                          <PersonIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="caption" color="text.secondary">
                          {post.author.name}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
