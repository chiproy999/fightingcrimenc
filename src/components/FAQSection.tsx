import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I submit an anonymous crime tip in North Carolina?",
      answer: "You can submit anonymous crime tips through our secure online form at fightingcrimenc.com/submit-tips. Your identity will never be tracked or shared. Alternatively, call your local Crime Stoppers hotline: Wake County (919) 996-1193 or Mecklenburg County (704) 334-1600. For emergencies, always call 911."
    },
    {
      question: "What counties does Fighting Crime NC cover?",
      answer: "Fighting Crime NC provides comprehensive coverage of all 100 North Carolina counties, from the mountains to the coast. We aggregate real-time crime news, wanted persons alerts, and missing person information from law enforcement agencies across the entire state, giving you statewide visibility unlike regional-only crime sites."
    },
    {
      question: "How often is the wanted persons database updated?",
      answer: "Our wanted persons database is updated in real-time as law enforcement agencies across North Carolina report new cases. We pull from 15+ official RSS feeds from major police departments, sheriff offices, and state agencies including Charlotte-Mecklenburg PD, Raleigh PD, Durham PD, NC State Highway Patrol, and the NC Department of Public Safety."
    },
    {
      question: "Are the crime alerts and news reports verified?",
      answer: "Yes, all crime news and alerts on Fighting Crime NC come directly from official law enforcement sources. We aggregate RSS feeds from verified police departments, sheriff offices, and state agencies. We do not publish unverified information or rumors. Every alert includes the source agency for transparency."
    },
    {
      question: "How can I report a sighting of a wanted person or missing person?",
      answer: "If you see a wanted person or missing individual, DO NOT approach them. For wanted persons who may be dangerous, call 911 immediately. For non-emergency tips, use our anonymous tip submission form or contact the specific law enforcement agency listed on the alert. For missing persons, call the agency handling the case or 911 if it's urgent."
    },
    {
      question: "Is Fighting Crime NC affiliated with law enforcement?",
      answer: "Fighting Crime NC is an independent public safety information platform. We are not a law enforcement agency but work to support NC police departments, sheriff offices, and state agencies by providing a centralized platform for crime news and public safety alerts. We aggregate official information to help communities stay informed."
    },
    {
      question: "How do I sign up for crime alerts in my area?",
      answer: "Currently, we provide real-time crime news through our website covering all 100 NC counties. Visit our Crime News page for the latest updates, or bookmark fightingcrimenc.com to check daily. We're working on adding email and SMS alert subscriptions for specific counties and cities."
    },
    {
      question: "What makes Fighting Crime NC different from other crime websites?",
      answer: "Fighting Crime NC offers statewide coverage of all 100 NC counties, while competitors typically cover only 3-4 counties. We feature modern, mobile-optimized design, real-time RSS aggregation from 15+ official sources, comprehensive structured data for search engines, and anonymous tip submission. Our platform is faster, more comprehensive, and easier to use than dated regional crime sites."
    }
  ];

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-police p-3 rounded-full shadow-evidence">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Fighting Crime NC and how we help keep North Carolina communities safe
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 hover:border-police-blue/50 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-police-blue">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Have more questions? Need help reporting a crime?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-police text-white rounded-lg hover:shadow-evidence transition-all font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
