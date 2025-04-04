import React from 'react';
import { useState } from 'react';
import { Twitter, Linkedin, Mail, ExternalLink, Star, X } from 'lucide-react';

const FooterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    try {
      const res = await fetch("https://formspree.io/f/xzzejkeg", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message: 'Subscribed to newsletter.' })
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 3000); // Hide message after 3s
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-blue-950 to-black min-h-[400px]">
      {/* Cosmic Background with Stars */}
      <div className="absolute inset-0">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
        
        {/* Moon System */}
        <div className="moon-system">
          <div className="orbit-ring"></div>
          <div className="moon moon-large"></div>
          <div className="moon moon-small"></div>
        </div>

        {/* Sci-fi Elements */}
        <div className="grid-overlay"></div>
        <div className="scanning-line"></div>
        
        {/* Floating Data Elements */}
        <div className="data-point data-1">
          <div className="data-circle"></div>
          <div className="data-line"></div>
        </div>
        <div className="data-point data-2">
          <div className="data-circle"></div>
          <div className="data-line"></div>
        </div>
        <div className="data-point data-3">
          <div className="data-circle"></div>
          <div className="data-line"></div>
        </div>

        {/* Nebula Effects */}
        <div className="nebula-1"></div>
        <div className="nebula-2"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 
                bg-clip-text text-transparent hover:scale-105 transform transition-transform">
                Cloud Garage
              </h3>
            </div>
            <p className="text-blue-200 mb-6 max-w-md leading-relaxed">
              Exploring the digital universe, one pixel at a time. Join us on a journey through 
              innovation and creativity in the vast expanse of technology.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, link: '#' },
                { icon: X, link: '#' },
                { icon: Mail, link: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="text-blue-400 hover:text-blue-300 transform hover:scale-110 
                    transition-all duration-300 hover:rotate-6"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-blue-400 font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a
                    href={'#'+item.toLocaleLowerCase}
                    className="text-blue-200 hover:text-blue-400 transition-colors flex items-center
                      group"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 
                      transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-blue-400 font-semibold mb-4 text-lg">Stay Updated</h4>
            <form className="space-y-4" onSubmit={handleNewsletterSubmit}>
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-blue-950/50 border border-blue-800 rounded-lg px-4 py-2
                    text-blue-200 placeholder-blue-400/50 focus:outline-none focus:ring-2 
                    focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400
                    hover:text-blue-300 transition-colors"
                >
                  <Star className="w-5 h-5" />
                </button>
              </div>
              {submitted && <p className="text-green-400 text-sm">Subscribed successfully!</p>}
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-blue-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-400/80 text-sm">
              © Cloud Garage. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(200px) translateY(200px) rotate(-45deg); opacity: 0; }
        }

        @keyframes nebula-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }

        .stars-small,
        .stars-medium,
        .stars-large {
          position: absolute;
          inset: 0;
          background-repeat: repeat;
        }

        .stars-small {
          background-image: radial-gradient(1px 1px at 50% 50%, white, transparent);
          background-size: 100px 100px;
          animation: twinkle 3s infinite;
        }

        .stars-medium {
          background-image: radial-gradient(2px 2px at 50% 50%, #4f9dff, transparent);
          background-size: 200px 200px;
          animation: twinkle 5s infinite;
          animation-delay: 1s;
        }

        .stars-large {
          background-image: radial-gradient(3px 3px at 50% 50%, #66b3ff, transparent);
          background-size: 300px 300px;
          animation: twinkle 7s infinite;
          animation-delay: 2s;
        }

        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, white, transparent);
          animation: shooting 3s infinite;
        }

        .delay-2 {
          animation-delay: 2s;
          top: 30%;
          left: 40%;
        }

        .delay-4 {
          animation-delay: 4s;
          top: 60%;
          left: 60%;
        }

        .nebula-1,
        .nebula-2 {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.2;
          animation: nebula-float 20s infinite;
        }

        .nebula-1 {
          background: radial-gradient(circle, #4f9dff, transparent);
          top: 20%;
          left: 20%;
        }

        .nebula-2 {
          background: radial-gradient(circle, #66b3ff, transparent);
          bottom: 20%;
          right: 20%;
          animation-delay: 10s;
        }
      `}</style>
    </footer>
  );
};

export default FooterSection;