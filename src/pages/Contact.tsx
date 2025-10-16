import { useState } from 'react';
import emailjs from '@emailjs/browser';
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Mail, MapPin, Clock, CheckCircle, Shield, AlertCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Initialize EmailJS with your public key
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');

      // Send email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: formData.inquiryType,
          to_email: 'info@fightingcrimenc.com'
        }
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', inquiryType: '' });
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again or email us directly at info@fightingcrimenc.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="Contact Fighting Crime NC - Public Safety Information"
        description="Contact Fighting Crime NC for media inquiries, partnership opportunities, or questions about our crime news and public safety services across North Carolina."
        keywords="contact fighting crime NC, media inquiries NC crime, law enforcement partnership, public safety contact NC"
        canonicalUrl="/contact"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Fighting Crime NC",
          "description": "Contact information for Fighting Crime NC",
          "provider": {
            "@type": "Organization",
            "name": "Fighting Crime NC",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "North Carolina",
              "addressCountry": "US"
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto container-mobile">
          <Breadcrumbs />
          
          {/* Hero Section */}
          <section className="py-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-police p-4 rounded-full shadow-evidence">
                  <Mail className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contact Fighting Crime NC
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get in touch with our team for media inquiries, partnership opportunities, 
                or questions about our crime news and public safety services.
              </p>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8 pb-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-police-blue/20">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    We'll respond to your inquiry within 24 hours during business days.
                  </p>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert className="border-emergency-red/50 mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-emergency-red">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {isSubmitted ? (
                    <Alert className="border-evidence-green/50">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-evidence-green">
                        <strong>Message sent successfully!</strong> We've received your inquiry and will respond within 24 hours during business days.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Type of Inquiry
                        </label>
                        <select 
                          className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                          required
                        >
                          <option value="">Select inquiry type...</option>
                          <option value="media">Media Inquiry</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="law-enforcement">Law Enforcement Collaboration</option>
                          <option value="technical">Technical Support</option>
                          <option value="feedback">Feedback/Suggestion</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Full Name
                          </label>
                          <Input
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-background border-police-blue/30 focus:border-police-blue"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-background border-police-blue/30 focus:border-police-blue"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Subject
                        </label>
                        <Input
                          type="text"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="bg-background border-police-blue/30 focus:border-police-blue"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Message
                        </label>
                        <Textarea
                          placeholder="Please provide details about your inquiry, question, or feedback..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="bg-background border-police-blue/30 focus:border-police-blue min-h-32"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-police text-white hover:shadow-evidence"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Emergency Notice */}
              <Card className="border-emergency-red/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emergency-red" />
                    Emergency?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For crime emergencies or to report crimes in progress, call 911 immediately.
                  </p>
                  <Button className="w-full bg-emergency-red text-white hover:bg-emergency-red/90">
                    <Phone className="h-4 w-4 mr-2" />
                    Call 911
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card className="border-police-blue/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-police-blue mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">info@fightingcrimenc.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-police-blue mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">General Inquiries</p>
                      <p className="text-sm text-muted-foreground">Use contact form above</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-police-blue mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Service Area</p>
                      <p className="text-sm text-muted-foreground">All 100 North Carolina Counties</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-police-blue mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Response Time</p>
                      <p className="text-sm text-muted-foreground">24 hours (business days)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Media & Partnerships */}
              <Card className="border-evidence-green/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Media & Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interested in collaborating or featuring our crime news coverage? 
                    We work with law enforcement agencies, media outlets, and community organizations.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Press releases & media kits</li>
                    <li>• Law enforcement partnerships</li>
                    <li>• Community safety initiatives</li>
                    <li>• Data sharing agreements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;