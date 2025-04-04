import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Star, Check, Rocket, PencilLine } from 'lucide-react';

// Sketchy Input Component with animation
const SketchInput = ({ label, type = 'text', value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative mb-8 group">
      <div className={`sketch-container transform transition-transform duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-3 bg-transparent font-indie text-gray-700 border-none outline-none
            focus:ring-0 placeholder-gray-500 relative z-10 transition-all duration-300
            hover:placeholder-blue-400"
          placeholder={label}
        />
        <div className="sketch-underline animate-sketch"></div>
        {error && (
          <div className="sketch-error animate-wiggle">
            <span className="text-red-500 font-indie text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '', email: '', message: '', errors: {}, isSubmitting: false, isSubmitted: false
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const rocketRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animated rocket on hover
  useEffect(() => {
    const rocket = rocketRef.current;
    if (rocket) {
      rocket.addEventListener('mouseover', () => {
        rocket.style.transform = 'translateX(10px) rotate(10deg)';
      });
      rocket.addEventListener('mouseout', () => {
        rocket.style.transform = 'translateX(0) rotate(0)';
      });
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }));
      return;
    }

    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true,
      errors: {} 
    }));

    // Simulate submission with loading state
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        isSubmitted: true,
        name: '',
        email: '',
        message: ''
      }));
    } catch (error) {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        errors: { submit: 'Failed to send message. Please try again.' }
      }));
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden" id="contact">
      {/* Animated background doodles */}
      <div className="absolute inset-0 paper-bg">
        <div className="absolute left-[40px] top-0 bottom-0 w-[2px] bg-red-200/30 animate-pulse"></div>
        <div className="lined-paper"></div>
        <div className="floating-doodles">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`absolute sketch-doodle-float-${i + 1} opacity-20`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + i}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Animated header */}
        <div className="text-center mb-16 relative">
          <div className={`inline-block sketch-box mb-4 transform transition-all duration-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex items-center space-x-2 px-6 py-2 hover:scale-110 transition-transform duration-300">
              <PencilLine className="w-5 h-5 text-blue-600 hand-drawn animate-wiggle" />
              <span className="text-lg font-indie text-blue-600">Let's Chat!</span>
            </div>
          </div>
          <h2 className="text-4xl font-permanent-marker mb-4 hand-drawn-text animate-sketch">
            Get in Touch
          </h2>
          <p className="font-indie text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Drop us a line below, we'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Animated form container */}
          <div className="sketch-paper p-8 relative transform transition-all duration-500
            hover:scale-[1.02] hover:shadow-xl">
            <form onSubmit={handleSubmit}>
              <SketchInput 
                label="Your Name" 
                value={formState.name}
                onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                error={formState.errors.name} 
              />
              <SketchInput 
                label="Your Email" 
                type="email" 
                value={formState.email}
                onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                error={formState.errors.email} 
              />
              
              <div className="relative mb-8 group">
                <div className="sketch-container">
                  <textarea
                    value={formState.message}
                    onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 h-32 bg-transparent font-indie text-gray-700
                      border-none outline-none focus:ring-0 relative z-10 transition-all duration-300
                      hover:scale-[1.01]"
                    placeholder="Your Message"
                  ></textarea>
                  <div className="sketch-box-outline animate-sketch"></div>
                </div>
              </div>

              <button 
                className="sketch-button-container group relative w-full py-3 px-6 overflow-hidden"
                disabled={formState.isSubmitting}
              >
                <div className="sketch-button-bg group-hover:scale-105 group-active:scale-95 transition-all duration-300"></div>
                <div className="sketch-button-outline"></div>
                <span className="relative z-10 font-indie flex items-center justify-center text-white text-lg">
                  {formState.isSubmitting ? (
                    <div className="sketch-spinner mr-2" />
                  ) : (
                    <>
                      Send Message
                      <Rocket 
                        ref={rocketRef} 
                        className="ml-2 w-5 h-5 hand-drawn transition-transform duration-300" 
                      />
                    </>
                  )}
                </span>
                <div className="sketch-button-hover"></div>
              </button>
            </form>

            {/* Success message with animation */}
            {formState.isSubmitted && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 animate-fade-in">
                <div className="text-center sketch-success p-6 animate-pop-in">
                  <div className="sketch-circle mx-auto mb-4 animate-bounce">
                    <Check className="w-8 h-8 text-green-500 hand-drawn" />
                  </div>
                  <h3 className="font-permanent-marker text-xl mb-2">Message Sent!</h3>
                  <p className="font-indie">We'll get back to you soon!</p>
                </div>
              </div>
            )}
          </div>

          {/* Animated contact info cards */}
          <div className="space-y-8">
            {[
              { icon: MapPin, title: 'Visit Us', text: '123 Sketch Street' },
              { icon: Phone, title: 'Call Us', text: '(555) 123-4567' },
              { icon: Mail, title: 'Email Us', text: 'hello@sketch.com' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`sketch-card transform transition-all duration-500 hover:scale-105
                  ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="sketch-icon-container animate-bounce-slow">
                    <item.icon className="w-6 h-6 hand-drawn" />
                  </div>
                  <div>
                    <h3 className="font-permanent-marker text-lg mb-1">{item.title}</h3>
                    <p className="font-indie text-gray-600">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Permanent+Marker&display=swap');

        .paper-bg {
          background-color: #fff;
          background-image: 
            linear-gradient(90deg, transparent 79px, #ff928d 79px, #ff928d 81px, transparent 81px),
            linear-gradient(#e4e8f7 2px, transparent 2px);
          background-size: 100% 30px;
        }

        .sketch-container {
          position: relative;
          margin-bottom: 1rem;
        }

        .sketch-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: repeating-linear-gradient(
            45deg,
            #2563eb,
            #2563eb 2px,
            transparent 2px,
            transparent 4px
          );
          opacity: 0.5;
        }

        @keyframes sketch {
          0% { transform: scale(0.98) rotate(-1deg); }
          50% { transform: scale(1.02) rotate(1deg); }
          100% { transform: scale(1) rotate(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-sketch {
          animation: sketch 2s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        .animate-pop-in {
          animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Rest of the styles remain the same */
      `}</style>
    </section>
  );
};

export default ContactSection;