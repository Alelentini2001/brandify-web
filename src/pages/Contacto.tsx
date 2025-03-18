import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
  Card,
  CardContent,
  alpha,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contacto: React.FC = () => {
  const theme = useTheme();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const validate = (): boolean => {
    const errors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      errors.name = 'Por favor ingresa tu nombre';
    }

    if (!formData.email.trim()) {
      errors.email = 'Por favor ingresa tu correo electrónico';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Por favor ingresa un correo electrónico válido';
    }

    if (!formData.message.trim()) {
      errors.message = 'Por favor ingresa tu mensaje';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccessAlert(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }, 1500);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        ref={headerRef}
        sx={{
          position: 'relative',
          height: '100vh',
          minHeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          bgcolor: '#0A0A0A',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
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
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,
            pt: { xs: 12, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}
          >
            <Typography
              component="h1"
              variant="h1"
              align="center"
              sx={{
                color: 'white',
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              Contáctanos
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                maxWidth: '600px',
                mx: 'auto',
                mb: 8,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.8,
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              Estamos listos para ayudarte a impulsar tu presencia digital
            </Typography>
          </motion.div>
        </Container>

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
            cursor: 'pointer',
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
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.5)',
                transform: 'scale(1.05)',
              },
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

      <Container
        maxWidth="xl"
        sx={{
          mt: { xs: -4, md: -8 },
          position: 'relative',
          zIndex: 2,
          px: { xs: 2, md: 4 },
          pb: { xs: 8, md: 12 },
          bgcolor: '#0A0A0A',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
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
        <Grid
          container
          spacing={6}
          justifyContent="center"
          sx={{ position: 'relative', zIndex: 2 }}
        >
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              ref={formRef}
              component={Paper}
              elevation={24}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: { xs: 2, md: 3 },
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 25px 50px rgba(124, 58, 237, 0.15)',
                  borderColor: 'rgba(124, 58, 237, 0.2)',
                  background: 'rgba(255,255,255,0.03)',
                },
                maxWidth: '800px',
                mx: 'auto',
                width: '100%',
              }}
            >
              <motion.div
                initial="hidden"
                animate={formInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 3, md: 5 },
                    background:
                      'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    letterSpacing: '-0.02em',
                  }}
                >
                  Envíanos un mensaje
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={{ xs: 2.5, md: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: { xs: '48px', md: '56px' },
                            borderRadius: 1.5,
                            color: 'white',
                            backgroundColor: {
                              xs: 'rgba(10,10,10,0.9)',
                              md: 'rgba(10,10,10,0.6)',
                            },
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.1)',
                              borderWidth: '1px',
                              transition: 'all 0.2s ease',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(124, 58, 237, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#7C3AED',
                              borderWidth: '2px',
                            },
                            '& input': {
                              height: { xs: '48px', md: '56px' },
                              padding: '0 14px',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              '&::placeholder': {
                                color: 'rgba(255,255,255,0.5)',
                              },
                              '-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:hover': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:focus': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            transform: 'translate(14px, 14px) scale(1)',
                            '&.Mui-focused, &.MuiFormLabel-filled': {
                              transform: 'translate(14px, -9px) scale(0.75)',
                              color: '#7C3AED',
                            },
                            '&.Mui-error': {
                              color: '#FF6B6B',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FF6B6B',
                            marginLeft: 0,
                            marginTop: 0.5,
                            fontSize: { xs: '0.75rem', md: '0.8rem' },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: { xs: '48px', md: '56px' },
                            borderRadius: 1.5,
                            color: 'white',
                            backgroundColor: {
                              xs: 'rgba(10,10,10,0.9)',
                              md: 'rgba(10,10,10,0.6)',
                            },
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.1)',
                              borderWidth: '1px',
                              transition: 'all 0.2s ease',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(124, 58, 237, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#7C3AED',
                              borderWidth: '2px',
                            },
                            '& input': {
                              height: { xs: '48px', md: '56px' },
                              padding: '0 14px',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              '&::placeholder': {
                                color: 'rgba(255,255,255,0.5)',
                              },
                              '-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:hover': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:focus': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            transform: 'translate(14px, 14px) scale(1)',
                            '&.Mui-focused, &.MuiFormLabel-filled': {
                              transform: 'translate(14px, -9px) scale(0.75)',
                              color: '#7C3AED',
                            },
                            '&.Mui-error': {
                              color: '#FF6B6B',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FF6B6B',
                            marginLeft: 0,
                            marginTop: 0.5,
                            fontSize: { xs: '0.75rem', md: '0.8rem' },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        name="phone"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: { xs: '48px', md: '56px' },
                            borderRadius: 1.5,
                            color: 'white',
                            backgroundColor: {
                              xs: 'rgba(10,10,10,0.9)',
                              md: 'rgba(10,10,10,0.6)',
                            },
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.1)',
                              borderWidth: '1px',
                              transition: 'all 0.2s ease',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(124, 58, 237, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#7C3AED',
                              borderWidth: '2px',
                            },
                            '& input': {
                              height: { xs: '48px', md: '56px' },
                              padding: '0 14px',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              '&::placeholder': {
                                color: 'rgba(255,255,255,0.5)',
                              },
                              '-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:hover': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:focus': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            transform: 'translate(14px, 14px) scale(1)',
                            '&.Mui-focused, &.MuiFormLabel-filled': {
                              transform: 'translate(14px, -9px) scale(0.75)',
                              color: '#7C3AED',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Asunto"
                        name="subject"
                        variant="outlined"
                        value={formData.subject}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: { xs: '48px', md: '56px' },
                            borderRadius: 1.5,
                            color: 'white',
                            backgroundColor: {
                              xs: 'rgba(10,10,10,0.9)',
                              md: 'rgba(10,10,10,0.6)',
                            },
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.1)',
                              borderWidth: '1px',
                              transition: 'all 0.2s ease',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(124, 58, 237, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#7C3AED',
                              borderWidth: '2px',
                            },
                            '& input': {
                              height: { xs: '48px', md: '56px' },
                              padding: '0 14px',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              '&::placeholder': {
                                color: 'rgba(255,255,255,0.5)',
                              },
                              '-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:hover': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:focus': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            transform: 'translate(14px, 14px) scale(1)',
                            '&.Mui-focused, &.MuiFormLabel-filled': {
                              transform: 'translate(14px, -9px) scale(0.75)',
                              color: '#7C3AED',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Mensaje"
                        name="message"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!formErrors.message}
                        helperText={formErrors.message}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5,
                            color: 'white',
                            backgroundColor: {
                              xs: 'rgba(10,10,10,0.9)',
                              md: 'rgba(10,10,10,0.6)',
                            },
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.1)',
                              borderWidth: '1px',
                              transition: 'all 0.2s ease',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(124, 58, 237, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#7C3AED',
                              borderWidth: '2px',
                            },
                            '& textarea': {
                              padding: '14px',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              lineHeight: '1.5',
                              '&::placeholder': {
                                color: 'rgba(255,255,255,0.5)',
                              },
                              '-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:hover': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                              '&:-webkit-autofill:focus': {
                                WebkitBoxShadow: '0 0 0 1000px #0A0A0A inset',
                                WebkitTextFillColor: 'white',
                                caretColor: 'white',
                              },
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            transform: 'translate(14px, 14px) scale(1)',
                            '&.Mui-focused, &.MuiFormLabel-filled': {
                              transform: 'translate(14px, -9px) scale(0.75)',
                              color: '#7C3AED',
                            },
                            '&.Mui-error': {
                              color: '#FF6B6B',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FF6B6B',
                            marginLeft: 0,
                            marginTop: 0.5,
                            fontSize: { xs: '0.75rem', md: '0.8rem' },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AnimatedButton
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isSubmitting}
                        animationVariant="glow"
                        sx={{
                          height: { xs: '48px', md: '56px' },
                          borderRadius: 1.5,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          background:
                            'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
                          transition: 'all 0.2s ease',
                          mt: { xs: 1, md: 2 },
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)',
                          },
                          '&:active': {
                            transform: 'translateY(0)',
                          },
                          '&.Mui-disabled': {
                            background: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.3)',
                            boxShadow: 'none',
                          },
                        }}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                      </AnimatedButton>
                    </Grid>
                  </Grid>
                </form>
              </motion.div>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box ref={infoRef}>
              <motion.div
                initial="hidden"
                animate={infoInView ? 'visible' : 'hidden'}
                variants={staggerContainer}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 3, md: 4 },
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    background:
                      'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: { xs: 'center', md: 'left' },
                    letterSpacing: '-0.02em',
                  }}
                >
                  Información de contacto
                </Typography>

                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {[
                    {
                      icon: (
                        <LocationOnIcon
                          sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }}
                        />
                      ),
                      title: 'Dirección',
                      content: 'Calle Principal 123, Piso 4, Madrid, España',
                    },
                    {
                      icon: (
                        <EmailIcon
                          sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }}
                        />
                      ),
                      title: 'Email',
                      content: 'info@brandify.com',
                    },
                    {
                      icon: (
                        <PhoneIcon
                          sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }}
                        />
                      ),
                      title: 'Teléfono',
                      content: '+34 91 123 4567',
                    },
                    {
                      icon: (
                        <AccessTimeIcon
                          sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }}
                        />
                      ),
                      title: 'Horario',
                      content: 'Lunes - Viernes: 9:00 - 18:00',
                    },
                  ].map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <motion.div variants={fadeInUp}>
                        <Card
                          elevation={4}
                          sx={{
                            borderRadius: 1.5,
                            background: 'rgba(255,255,255,0.02)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            overflow: 'hidden',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)',
                              borderColor: 'rgba(124, 58, 237, 0.2)',
                              background: 'rgba(255,255,255,0.03)',
                              '& .icon-box': {
                                background:
                                  'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                              },
                            },
                          }}
                        >
                          <CardContent
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: { xs: 2, md: 3 },
                            }}
                          >
                            <Box
                              className="icon-box"
                              sx={{
                                mr: 2.5,
                                p: { xs: 1.5, md: 2 },
                                borderRadius: 1.5,
                                background:
                                  'linear-gradient(135deg, rgba(124, 58, 237, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%)',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Box>
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                  fontWeight: 600,
                                  color: 'white',
                                  fontSize: { xs: '0.9rem', md: '1.25rem' },
                                  mb: 0.5,
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'rgba(255,255,255,0.7)',
                                  fontSize: { xs: '0.8rem', md: '1rem' },
                                  lineHeight: 1.6,
                                }}
                              >
                                {item.content}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: 2,
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            boxShadow: '0 8px 20px rgba(124, 58, 237, 0.2)',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          ¡Mensaje enviado exitosamente! Te contactaremos pronto.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacto;
