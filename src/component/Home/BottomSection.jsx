import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Send, MapPin, Phone, Mail, Users, Building, Award, Check, Sparkles, Star, CodeSquare, ArrowRight, Briefcase } from 'lucide-react';
//import ContactSection from './ContactSection';
import FooterSection from './Footer';

import ReCAPTCHA from 'react-google-recaptcha';


// Reusable animated gradient text
const GradientText = ({ children, className = '' }) => (
  <span className={`bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent bg-size-200 animate-gradient-x ${className}`}>
    {children}
  </span>
);

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${Math.random() * 100}%`,
            animation: `float ${particle.duration}s infinite ease-in-out ${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Interactive card component
const InteractiveCard = ({ children, className = '' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPosition({ x: x * 20, y: y * 20 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <div
        className="p-6 bg-white rounded-xl shadow-lg transition-all duration-200"
        style={{
          transform: `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg) scale(1.02)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Animated input with floating label
const AnimatedInput = ({ label, type = 'text', value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6 group">
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 bg-white rounded-lg outline-none transition-all duration-300
            border-2 ${error ? 'border-red-400' : isFocused ? 'border-blue-500' : 'border-blue-400/20'}
            text-gray-700 peer`}
          placeholder=" "
        />
        <label className={`absolute left-4 pointer-events-none transition-all duration-300 ${
          isFocused || value ? '-top-6 text-sm text-blue-500' : 'top-3 text-gray-500'
        }`}>
          {label}
        </label>
        {isFocused && (
          <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-pulse" />
        )}
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  const features = [
      { 
          icon: CodeSquare, 
          title: 'Innovation', 
          desc: 'Pushing boundaries with cutting-edge solutions',
          gradient: 'from-blue-600 to-cyan-500'
      },
      { 
          icon: Users, 
          title: 'Community', 
          desc: 'Building strong client relationships',
          gradient: 'from-violet-600 to-blue-500'
      },
      { 
          icon: Star, 
          title: 'Excellence', 
          desc: 'Delivering outstanding results consistently',
          gradient: 'from-blue-500 to-violet-500'
      }
  ];

  useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => setIsVisible(entry.isIntersecting),
          { threshold: 0.1 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);

      const handleScroll = () => {
          if (sectionRef.current) {
              const { height, top } = sectionRef.current.getBoundingClientRect();
              const progress = Math.max(0, Math.min(1, (window.innerHeight - top) / (height + window.innerHeight)));
              setScrollProgress(progress);
          }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
          observer.disconnect();
      };
  }, []);

  return (
      <section 
          ref={sectionRef} 
          className="relative py-24 overflow-hidden bg-white" 
          id="about"
      >
          <FloatingParticles />
          
          <div className="absolute inset-0">
              <div 
                  className="absolute inset-0 border-2 border-transparent"
                  style={{
                      background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, ${scrollProgress}) ${scrollProgress * 100}%, transparent)`,
                      maskImage: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'destination-out',
                      maskComposite: 'exclude'
                  }}
              />
          </div>

          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="max-w-7xl mx-auto px-4 relative">
              <div className={`text-center mb-16 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                  <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse rounded-full" />
                      <div className="relative inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20">
                          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                              Our Story
                          </span>
                      </div>
                  </div>
                  
                  <h2 className="text-5xl font-bold mb-6 relative">
                      <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-2xl" />
                      <GradientText>Building the Future Together</GradientText>
                  </h2>
                  
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto relative">
                      <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-violet-500/10 blur-xl" />
                      <span className="relative">
                          At CloudGarage, we don’t just follow trends; we set them. With a decade of expertise in devising cloud infrastructures from small-medium to enterprise customers, we’ve transformed from infrastructure providers to data and AI solution architects. Our mission? To empower your business with the tools that matter most.
                      </span>
                  </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                  <div className={`space-y-8 transition-all duration-1000 delay-300 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}>
                      {features.map((feature, i) => (
                          <div
                              key={i}
                              className="transform transition-all duration-300 hover:scale-105"
                          >
                              <InteractiveCard className="h-full">
                                  <div className="relative p-1">
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent 
                                          animate-border-scroll rounded-xl" />
                                      
                                      <div className="relative bg-white p-6 rounded-lg border-2 border-blue-500/20 
                                          hover:border-blue-500/50 hover:shadow-lg transition-all duration-300">
                                          <div className="flex items-start space-x-4">
                                              <div className="relative">
                                                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} 
                                                      p-[1px] transition-transform duration-300`}>
                                                      <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                                                          <feature.icon className="w-6 h-6 text-blue-600" />
                                                      </div>
                                                  </div>
                                              </div>
                                              <div>
                                                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                                  <p className="text-gray-600">{feature.desc}</p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </InteractiveCard>
                          </div>
                      ))}
                  </div>

                  <div className={`relative transition-all duration-1000 delay-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}>
                      <InteractiveCard className="relative">
                          <div className="relative p-1">
                              <div className="absolute inset-0 border-2 border-blue-500/20 rounded-xl" />
                              
                              <div className="relative bg-white p-8 rounded-lg border border-blue-500/20">
                                  <div className="space-y-8">
                                      <h3 className="text-3xl font-bold text-gray-800">
                                          What Makes Us Unique?
                                      </h3>
                                      
                                      <div className="space-y-6 text-gray-600">
                                          <div>
                                              <h4 className="font-semibold text-gray-800">Navigating the Cloud Landscape</h4>
                                              <p>We’re not just another cloud service provider. We’re your strategic partners in building a robust cloud infrastructure. Whether it’s Azure, AI, or data analytics, we’ve got you covered.</p>
                                          </div>
                                          <div>
                                              <h4 className="font-semibold text-gray-800">Tailored Solutions</h4>
                                              <p>One size doesn’t fit all. We understand that your business has unique needs. Our team crafts customized solutions that align with your vision and mission.</p>
                                          </div>
                                          <div>
                                              <h4 className="font-semibold text-gray-800">Value Beyond Cost</h4>
                                              <p>It’s not just about saving money; it’s about maximizing value. We optimize Azure pricing, implement cutting-edge technologies, and ensure your cloud journey is both efficient and effective.</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </InteractiveCard>
                  </div>
              </div>
          </div>
          <div
      className={`relative transition-all duration-1000 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden group">
          {/* Glowing animated border */}
          <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:animate-gradient-glow before:bg-[length:200%_200%] before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-cyan-400 blur-sm opacity-70"></div>

          {/* Grain texture */}
          <div className="absolute inset-0 z-0 bg-[url('/grain.png')] opacity-[0.06] mix-blend-overlay pointer-events-none"></div>

          {/* Card Content */}
          <div className="relative z-10 bg-white/90 dark:bg-black/80 backdrop-blur-2xl rounded-2xl p-10 shadow-2xl transition-transform group-hover:scale-[1.02] duration-300 ease-out border border-white/10 dark:border-white/5">
            {/* Animated Icon */}
            <div className="flex items-center mb-4">
              <Briefcase className="text-blue-600 dark:text-cyan-400 w-8 h-8 animate-pulse" />
              <h3 className="ml-3 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight animate-fade-slide">
                Success Stories
              </h3>
            </div>

            {/* Animated Text */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed animate-fade-delay">
              We’re not just partners; we’re <span className="font-semibold text-blue-600 dark:text-cyan-400">innovators</span>. Our stories span industries—from e-commerce to healthcare. Let’s build your story next.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fade-slide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-delay {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          60% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-glow {
          animation: gradient-glow 8s ease infinite;
        }

        .animate-fade-slide {
          animation: fade-slide 1s ease-out forwards;
        }

        .animate-fade-delay {
          animation: fade-delay 1.5s ease-out forwards;
        }
      `}</style>
    </div>

          <style jsx>{`
              .bg-grid-pattern {
                  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48L6 48M54 12L6 12M30 54L30 6' stroke='%234B5563' stroke-width='1' fill='none' /%3E%3C/svg%3E");
                  background-size: 30px 30px;
              }

              @keyframes border-scroll {
                  0% { background-position: -200% center; }
                  100% { background-position: 200% center; }
              }

              .animate-border-scroll {
                  background-size: 200% 100%;
                  animation: border-scroll 3s linear infinite;
              }
          `}</style>
      </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '', email: '', message: '', errors: {}, isSubmitting: false, isSubmitted: false
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const rocketRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.name) errors.name = 'Name is required';
    if (!formState.email) errors.email = 'Email is required';
    if (!formState.message) errors.message = 'Message is required';
    if (!captchaToken) errors.recaptcha = 'Please verify you are not a robot';
  
    if (Object.keys(errors).length === 0) {
      setFormState(prev => ({ ...prev, isSubmitting: true }));
  
      // Optional rocket animation
      if (rocketRef.current) {
        rocketRef.current.style.transform = 'translate(300px, -300px) rotate(-45deg) scale(0.5)';
        rocketRef.current.style.opacity = '0';
      }
  
      try {
        const response = await fetch("https://formspree.io/f/xzzejkeg", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message,
            'g-recaptcha-response': captchaToken,
          }),
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
  
        await new Promise(resolve => setTimeout(resolve, 1500));
  
        setFormState({
          name: '',
          email: '',
          message: '',
          errors: {},
          isSubmitting: false,
          isSubmitted: true,
        });
  
        setCaptchaToken('');
      } catch (err) {
        console.error("Submission error", err);
        setFormState(prev => ({ ...prev, isSubmitting: false }));
      }
    } else {
      setFormState(prev => ({ ...prev, errors }));
    }
  };
  

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden" id="contact">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 mb-4">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Contact Us</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <GradientText>Let's Build Something Amazing</GradientText>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business? Get in touch with our team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <InteractiveCard>
              <form onSubmit={handleSubmit} className="relative">
                <AnimatedInput
                  label="Name"
                  value={formState.name}
                  onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  error={formState.errors.name}
                />
                <AnimatedInput
                  label="Email"
                  type="email"
                  value={formState.email}
                  onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  error={formState.errors.email}
                />
                <div className="relative mb-6">
                  <textarea
                    value={formState.message}
                    onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className={`w-full px-4 py-3 h-32 bg-white rounded-lg outline-none transition-all duration-300
                      border-2 ${formState.errors.message ? 'border-red-400' : 'border-blue-400/20'}
                      focus:border-blue-500 text-gray-700`}
                    placeholder="Your message"
                  />
                  {formState.errors.message && (
                    <p className="text-red-400 text-sm mt-1">{formState.errors.message}</p>
                  )}
                </div>
                <div className='pb-4 justify-center items-center'>
                <ReCAPTCHA
                  sitekey="6Lf89AkrAAAAALiKO6bAmytzBzRNr6BBsFwOXN--"
                  onChange={(token) => setCaptchaToken(token)}
                />
                </div>
                
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="group w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg
                    transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative flex items-center justify-center space-x-2">
                    {formState.isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Rocket
                          ref={rocketRef}
                          className="w-5 h-5 transition-all duration-1000"
                        /></>
                    )}
                  </div>
                </button>

                {formState.isSubmitted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-lg animate-fade-in">
                    <div className="text-center p-6">
                      <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                        <div className="relative w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-8 h-8 text-green-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">We'll get back to you soon.</p>
                    </div>
                  </div>
                )}
              </form>
            </InteractiveCard>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {[
              { icon: MapPin, title: 'Visit Us', text: 'Wework Zenia mumbai' },
              { icon: Phone, title: 'Call Us', text: '+91 9971144155' },
              { icon: Mail, title: 'Email Us', text: 'support@cloudgarage.in' }
            ].map((item, i) => (
              <InteractiveCard
                key={i}
                className="transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-lg opacity-40 animate-pulse" />
                    <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
              </InteractiveCard>
            ))}

            {/* Social proof section */}
            
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

const BottomSection = () => (
  <>
    <AboutSection />
    <ContactSection />
    <FooterSection />
  </>
);

export default BottomSection