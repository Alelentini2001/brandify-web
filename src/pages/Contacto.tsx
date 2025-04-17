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
  CircularProgress,
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

interface AirtableRecord {
  fields: {
    Name: string;
    Email: string;
    Phone: string;
    Subject: string;
    Message: string;
    'Submission Date': string;
  };
}

const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME =
  process.env.REACT_APP_AIRTABLE_TABLE_NAME || 'Leads';
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

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
  const [alertState, setAlertState] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setAlertState({
        open: true,
        message:
          'Por favor completa todos los campos requeridos correctamente.',
        severity: 'error',
      });
      return;
    }

    // Check for required environment variables
    if (!process.env.REACT_APP_AIRTABLE_PAT) {
      console.error('Missing Airtable Personal Access Token');
      setAlertState({
        open: true,
        message: 'Error: Token de acceso no configurado.',
        severity: 'error',
      });
      return;
    }

    if (!AIRTABLE_BASE_ID) {
      console.error('Missing Airtable Base ID');
      setAlertState({
        open: true,
        message: 'Error: ID de base de datos no configurado.',
        severity: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Log configuration for debugging
      console.log('Airtable Configuration:', {
        baseId: AIRTABLE_BASE_ID,
        tableName: AIRTABLE_TABLE_NAME,
        apiUrl: AIRTABLE_API_URL,
        tokenStart:
          process.env.REACT_APP_AIRTABLE_PAT?.substring(0, 10) + '...',
      });

      const record = {
        records: [
          {
            fields: {
              Name: formData.name.trim(),
              Email: formData.email.trim(),
              Phone: formData.phone.trim(),
              Subject: formData.subject.trim(),
              Message: formData.message.trim(),
              'Submission Date': new Date().toISOString().split('T')[0],
            },
          },
        ],
      };

      // Log the request payload
      console.log('Request Payload:', JSON.stringify(record, null, 2));

      const response = await fetch(AIRTABLE_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      const data = await response.json();

      // Log the complete response
      console.log('Airtable Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data,
      });

      if (!response.ok) {
        let errorMessage = 'Error al enviar el formulario.';
        let debugInfo = '';

        if (response.status === 401 || response.status === 403) {
          errorMessage =
            'Error de autenticación. Por favor contacta al administrador.';
          debugInfo = 'Token inválido o sin permisos suficientes';
        } else if (response.status === 404) {
          errorMessage =
            'Base de datos o tabla no encontrada. Por favor contacta al administrador.';
          debugInfo = 'Verifica el Base ID y nombre de la tabla';
        } else if (
          response.status === 422 &&
          data.error?.type === 'INVALID_VALUE_FOR_COLUMN'
        ) {
          const fieldMatch = data.error.message.match(/Field "([^"]+)"/);
          const fieldName = fieldMatch ? fieldMatch[1] : 'Unknown';
          errorMessage = `Error en el formato del campo "${fieldName}". Por favor contacta al administrador.`;
          debugInfo = `Formato inválido para el campo: ${fieldName}`;
        } else if (response.status === 422) {
          errorMessage =
            'Error en el formato de los datos. Por favor contacta al administrador.';
          debugInfo = 'Verifica el formato de los campos';
        }

        console.error('Airtable Error:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          debugInfo,
        });

        throw new Error(errorMessage);
      }

      console.log('Airtable submission successful:', data);

      setAlertState({
        open: true,
        message: '¡Gracias por contactarnos! Te responderemos pronto.',
        severity: 'success',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Error submitting to Airtable:', error);
      setAlertState({
        open: true,
        message:
          error.message ||
          'Hubo un error al enviar el formulario. Por favor intenta nuevamente.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertState((prev) => ({ ...prev, open: false }));
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
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&.Mui-focused': {
                              color: '#7C3AED',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FF6B6B',
                            marginLeft: 0,
                            marginTop: 0.5,
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
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&.Mui-focused': {
                              color: '#7C3AED',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FF6B6B',
                            marginLeft: 0,
                            marginTop: 0.5,
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
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&.Mui-focused': {
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
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&.Mui-focused': {
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
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&.Mui-focused': {
                              color: '#7C3AED',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FF6B6B',
                            marginLeft: 0,
                            marginTop: 0.5,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isSubmitting}
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
                        {isSubmitting ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Enviar Mensaje'
                        )}
                      </Button>
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
                        <EmailIcon
                          sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }}
                        />
                      ),
                      title: 'Email',
                      content: 'brandifyok@gmail.com',
                    },
                    {
                      icon: (
                        <PhoneIcon
                          sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }}
                        />
                      ),
                      title: 'Teléfono',
                      content: '+54 9 221 454 04 30',
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

      {/* Alert Snackbar */}
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertState.severity}
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
          {alertState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacto;
