import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Github, Linkedin } from 'lucide-react';
import { submitContact } from '../services/api';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) errors.subject = 'Subject is required';

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await submitContact(formData);
      if (response.success) {
        setSuccessMsg(response.message || 'Your message has been sent and stored successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(response.error || 'Failed to send message. Please try again.');
        if (response.details) {
          const apiErrors: Record<string, string> = {};
          response.details.forEach((err) => {
            apiErrors[err.field] = err.message;
          });
          setFieldErrors(apiErrors);
        }
      }
    } catch (err: any) {
      setErrorMsg('An error occurred. Please check your server connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <Container>
        <SectionHeading
          subtitle="GET IN TOUCH"
          title="Let's connect & discuss opportunities."
          description="Interested in collaborating, discussing developer roles, or exploring tech projects? Send me a message below."
        />

        <Row className="gy-4">
          <Col lg={5}>
            <div className="custom-card h-100 p-4">
              <h3 className="h5 fw-bold text-main mb-4">Contact Details</h3>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="h6 fw-semibold text-main mb-1">Email</h4>
                  <a href="mailto:deepika.dev@example.com" className="text-muted small">
                    deepika.dev@example.com
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="h6 fw-semibold text-main mb-1">Location</h4>
                  <p className="text-muted small mb-0">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="pt-4 border-top border-secondary border-opacity-25 mt-auto">
                <h4 className="h6 fw-semibold text-main mb-3">Online Profiles</h4>
                <div className="d-flex gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-custom p-2 rounded-circle"
                    title="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-custom p-2 rounded-circle"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <div className="custom-card p-4">
              {successMsg && (
                <Alert variant="success" className="d-flex align-items-center gap-2 mb-4">
                  <CheckCircle2 size={20} />
                  <div>{successMsg}</div>
                </Alert>
              )}

              {errorMsg && (
                <Alert variant="danger" className="d-flex align-items-center gap-2 mb-4">
                  <AlertCircle size={20} />
                  <div>{errorMsg}</div>
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactName">
                      <Form.Label className="small fw-semibold text-main">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="form-control-custom"
                        isInvalid={!!fieldErrors.name}
                      />
                      <Form.Control.Feedback type="invalid">{fieldErrors.name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label className="small fw-semibold text-main">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="form-control-custom"
                        isInvalid={!!fieldErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="contactSubject" className="mb-3">
                  <Form.Label className="small fw-semibold text-main">Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className="form-control-custom"
                    isInvalid={!!fieldErrors.subject}
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.subject}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="contactMessage" className="mb-4">
                  <Form.Label className="small fw-semibold text-main">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="form-control-custom"
                    isInvalid={!!fieldErrors.message}
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.message}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  icon={loading ? <Spinner animation="border" size="sm" /> : <Send size={18} />}
                  className="w-100 justify-content-center"
                >
                  {loading ? 'Submitting Message...' : 'Send Message'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
