const testimonials = [
  {
    quote: "LockInLearn transformed how I study. The AI mentors make complex topics feel approachable and the focus features keep me on track.",
    author: "Sarah K.",
    role: "Medical Student",
    avatar: "👩‍⚕️"
  },
  {
    quote: "As a self-learner, having an AI mentor available 24/7 is incredible. It's like having a study buddy who never gets tired!",
    author: "Marcus T.",
    role: "Software Developer",
    avatar: "👨‍💻"
  },
  {
    quote: "The progress tracking and smart study sessions helped me maintain consistency in my exam preparation. Highly recommended!",
    author: "Jennifer L.",
    role: "Law Student",
    avatar: "👩‍⚖️"
  }
];

export default function Testimonials() {
  return (
    <div className="py-24 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold mb-4">Loved by Learners</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students and professionals who've transformed their learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i}
              className="bg-background p-8 rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-200"
            >
              <div className="text-4xl mb-6">{testimonial.avatar}</div>
              <blockquote className="text-lg mb-6 text-muted-foreground leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="font-heading font-semibold text-foreground">{testimonial.author}</div>
              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}