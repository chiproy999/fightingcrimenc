import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Raleigh, NC",
    role: "Community Member",
    content: "This site has been incredibly helpful in staying informed about crime in my area. The real-time updates and clear information help me keep my family safe.",
    rating: 5
  },
  {
    id: 2,
    name: "James T.",
    location: "Charlotte, NC",
    role: "Neighborhood Watch",
    content: "As part of our neighborhood watch program, we rely on Fighting Crime NC for accurate and timely information. It's become an essential resource for our community.",
    rating: 5
  },
  {
    id: 3,
    name: "Maria R.",
    location: "Durham, NC",
    role: "Local Business Owner",
    content: "The anonymous tip feature is easy to use and gives me peace of mind. I can report suspicious activity without worrying about my safety. Great service!",
    rating: 5
  },
  {
    id: 4,
    name: "David K.",
    location: "Greensboro, NC",
    role: "Community Advocate",
    content: "I appreciate how transparent and informative this site is. The missing persons section especially helps spread awareness quickly. Thank you for this valuable resource.",
    rating: 5
  }
];

const TestimonialsSection = memo(() => {
  return (
    <section className="py-16 bg-card/50" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fighting Crime NC is trusted by thousands of North Carolinians who rely on us for accurate, 
            timely crime information and public safety updates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="border-police-blue/20 hover:shadow-evidence transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 fill-warning-yellow text-warning-yellow" 
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-police-blue/50 mb-3" aria-hidden="true" />
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Have feedback? <a href="/contact" className="text-police-blue hover:underline">Contact us</a> to share your experience.
          </p>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;

