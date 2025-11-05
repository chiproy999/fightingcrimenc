import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import ComponentErrorBoundary from '@/components/ComponentErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - Fighting Crime NC"
        description="Fighting Crime NC's privacy policy explaining how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, cookie policy, user privacy, Fighting Crime NC"
        canonicalUrl="https://fightingcrimenc.com/privacy-policy"
      />
      
      <div className="min-h-screen bg-background flex flex-col">
        <ComponentErrorBoundary>
          <Header />
        </ComponentErrorBoundary>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-police py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Privacy Policy
                </h1>
                <p className="text-xl text-white/90">
                  Your privacy matters to us. Learn how we protect your information.
                </p>
                <p className="text-sm text-white/80 mt-2">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </section>

          {/* Breadcrumbs */}
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs />
          </div>

          {/* Privacy Policy Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                            <Lock className="mr-2 text-police-blue" size={24} />
                            1. Information We Collect
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              Fighting Crime NC ("we," "our," or "us") is committed to protecting your privacy. 
                              We collect information that you provide directly to us, including:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>Contact information (name, email address, phone number) when you submit tips or contact us</li>
                              <li>Information you provide in tip submissions or contact forms</li>
                              <li>Device and usage information automatically collected when you visit our website</li>
                              <li>Cookies and similar tracking technologies</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                            <Eye className="mr-2 text-police-blue" size={24} />
                            2. How We Use Your Information
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>Provide and maintain our crime news and public safety services</li>
                              <li>Process and forward anonymous crime tips to law enforcement agencies</li>
                              <li>Respond to your inquiries and provide customer support</li>
                              <li>Improve our website and user experience</li>
                              <li>Analyze usage patterns and trends (via analytics tools)</li>
                              <li>Send you updates about crime news and public safety (if you opt-in)</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                            <Shield className="mr-2 text-police-blue" size={24} />
                            3. Information Sharing and Disclosure
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              <strong className="text-foreground">We do not sell your personal information.</strong> We may share 
                              your information only in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li><strong>Crime Tips:</strong> Anonymous tips are forwarded to appropriate law enforcement agencies. Your identity remains anonymous unless you choose to provide contact information.</li>
                              <li><strong>Service Providers:</strong> We may share information with third-party service providers who assist us in operating our website and conducting our business.</li>
                              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety.</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">
                            4. Cookies and Tracking Technologies
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              We use cookies and similar tracking technologies to enhance your browsing experience, 
                              analyze site traffic, and personalize content. You can control cookie preferences through 
                              your browser settings or our cookie consent banner.
                            </p>
                            <p>
                              <strong className="text-foreground">Types of cookies we use:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website (Google Analytics, etc.)</li>
                              <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">
                            5. Your Rights and Choices
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>Access and receive a copy of your personal information</li>
                              <li>Correct inaccurate or incomplete information</li>
                              <li>Request deletion of your personal information</li>
                              <li>Opt-out of marketing communications</li>
                              <li>Disable cookies through your browser settings</li>
                            </ul>
                            <p>
                              To exercise these rights, please contact us at{' '}
                              <a href="mailto:privacy@fightingcrimenc.com" className="text-police-blue hover:underline">
                                privacy@fightingcrimenc.com
                              </a>.
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">
                            6. Data Security
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              We implement appropriate technical and organizational measures to protect your personal 
                              information. However, no method of transmission over the Internet is 100% secure, and 
                              we cannot guarantee absolute security.
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">
                            7. Children's Privacy
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              Our website is not intended for children under 13 years of age. We do not knowingly 
                              collect personal information from children under 13. If you believe we have collected 
                              information from a child under 13, please contact us immediately.
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">
                            8. Third-Party Links
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              Our website may contain links to third-party websites. We are not responsible for the 
                              privacy practices of these external sites. We encourage you to review the privacy 
                              policies of any third-party sites you visit.
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">
                            9. Changes to This Privacy Policy
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              We may update this Privacy Policy from time to time. We will notify you of any changes 
                              by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                              We encourage you to review this Privacy Policy periodically.
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                            <FileText className="mr-2 text-police-blue" size={24} />
                            10. Contact Us
                          </h2>
                          <div className="space-y-3 text-muted-foreground">
                            <p>
                              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                            </p>
                            <div className="bg-police-blue/10 p-4 rounded border border-police-blue/20">
                              <p className="font-semibold text-foreground mb-2">Fighting Crime NC</p>
                              <p>Email: <a href="mailto:privacy@fightingcrimenc.com" className="text-police-blue hover:underline">privacy@fightingcrimenc.com</a></p>
                              <p className="mt-2">Website: <a href="https://fightingcrimenc.com" className="text-police-blue hover:underline">fightingcrimenc.com</a></p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-warning-yellow/10 border border-warning-yellow/30 rounded-lg p-6 mt-8">
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            Important Disclaimer
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Fighting Crime NC is not affiliated with law enforcement. This website is for informational 
                            purposes only. For official matters, emergencies, or to report crimes in progress, please 
                            contact local authorities or call 911 immediately. We do not provide legal advice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <ComponentErrorBoundary>
          <Footer />
        </ComponentErrorBoundary>
      </div>
    </>
  );
};

export default PrivacyPolicy;

