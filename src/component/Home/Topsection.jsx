import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, Cloud, Users, MessageSquare, Lock, Zap, Shield, Cpu, Globe } from 'lucide-react';

const NAVIGATION = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  
];

const SERVICES = [
  { icon: Cloud, title: 'Azure Cloud', features: ['Auto-scaling', 'Distribution', 'HA'] },
  { icon: Shield, title: 'Security', features: ['AD', 'Protection', 'Compliance'] },
  { icon: Cpu, title: 'AI & ML', features: ['ML', 'Cognitive', 'Tools'] },
  { icon: Globe, title: 'Network', features: ['CDN', 'Route', 'Multi-region'] }
];

const STATS = [
  { icon: Users, value: '99.99%', label: 'Uptime' },
  { icon: MessageSquare, value: '24/7', label: 'Support' },
  { icon: Lock, value: 'Enterprise', label: 'Security' },
  { icon: Zap, value: '<5ms', label: 'Latency' }
];

const TopSection = () => {
  const [state, setState] = useState({
    isMenuOpen: false,
    scrollY: 0,
    visibleSections: new Set()
  });
  
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setState(prev => ({ ...prev, scrollY: window.scrollY }));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setState(prev => ({ ...prev, isMenuOpen: false }));
  };

  return (
    <div className="w-full overflow-hidden bg-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="relative">
                
              </div>
              <img src="/CloudGarage.svg" alt="Cloud Garage Logo" className="w-30 h-25" />            
              </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {NAVIGATION.map(item => (
                <a key={item.name} href={item.href}
                   onClick={(e) => handleNavClick(e, item.href)}
                   className="text-blue-300 hover:text-blue-400 transition-colors">
                  {item.name}
                </a>
              ))}
              <a href='#contact'>
              <button className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 
                text-blue-400 rounded-lg backdrop-blur-sm transition-all" >
                
                Contact Us
               
              </button> </a>
            </div>

            <Menu onClick={() => setState(prev => ({ ...prev, isMenuOpen: true }))} 
                  className="h-6 w-6 text-blue-400 md:hidden cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20" id="hero" ref={parallaxRef}>
      {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic Grid Pattern */}
          <div className="absolute inset-0" 
               style={{ 
                 transform: `translateY(${state.scrollY * 0.2}px)`,
                 backgroundImage: `
                   linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), 
                   linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                   radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 75%)
                 `,
                 backgroundSize: '40px 40px, 40px 40px, 100% 100%',
                 opacity: 0.4
               }} />

          {/* Nebula Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"
                 style={{ transform: `translateY(${state.scrollY * 0.15}px)` }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl"
                 style={{ transform: `translateY(${state.scrollY * 0.1}px)` }} />
          </div>

          {/* Particle Field */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} 
                 className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                   transform: `translateY(${state.scrollY * (0.1 + i * 0.02)}px)`,
                   animation: `pulse${i % 3} ${2 + i % 3}s ease-in-out infinite`
                 }} />
          ))}

          {/* Tech Circles */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64">
            <div className="absolute inset-0 border-2 border-blue-400/20 rounded-full"
                 style={{ transform: `translateY(${state.scrollY * 0.3}px) rotate(${state.scrollY * 0.1}deg)` }} />
            <div className="absolute inset-2 border border-blue-400/10 rounded-full"
                 style={{ transform: `translateY(${state.scrollY * 0.2}px) rotate(${-state.scrollY * 0.15}deg)` }} />
            <div className="absolute inset-4 border border-blue-400/5 rounded-full"
                 style={{ transform: `translateY(${state.scrollY * 0.1}px) rotate(${state.scrollY * 0.2}deg)` }} />
          </div>

          {/* Data Stream Lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}
                 className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                 style={{
                   width: '100%',
                   top: `${20 + i * 15}%`,
                   left: 0,
                   transform: `translateX(${Math.sin(state.scrollY * 0.01 + i) * 50}px)`,
                   opacity: 0.5 - (i * 0.1)
                 }} />
          ))}

          {/* Hexagon Grid */}
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0L30 8.66L45 0L60 8.66V25.98L45 34.64L60 43.3V60L45 51.34L30 60L15 51.34L0 60V43.3L15 34.64L0 25.98V8.66L15 0Z' fill='none' stroke='rgba(59, 130, 246, 0.1)' stroke-width='1'/%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px',
                 opacity: 0.3,
                 transform: `translateY(${state.scrollY * 0.1}px) rotate(${state.scrollY * 0.02}deg)`
               }} />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-white space-y-8 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 
                   backdrop-blur-sm rounded-lg border border-blue-400/20 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-shimmer" />
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">Microsoft Azure Partner</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  Future of Cloud
                </span>
                <br />
                <span className="text-blue-50">Computing</span>
              </h1>

              <p className="text-xl text-blue-200/80 relative">
                <span className="absolute -left-4 top-1/2 w-2 h-2 bg-blue-400/50 rounded-full" />
                Empower your business with next-gen cloud solutions
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-blue-500/20 hover:bg-blue-500/30 
                  text-blue-400 rounded-lg backdrop-blur-sm transition-all duration-300
                  border border-blue-400/20 hover:border-blue-400/40 relative group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-shimmer" />
                 <a href='#services'> <span className="relative">Explore Services</span></a>
                </button>
                <button className="px-8 py-3 bg-blue-400 hover:bg-blue-500 
                  text-slate-900 rounded-lg transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  <a href='#contact'><span className="relative">Get Started</span> </a>
                </button>
              </div>
            </div>

            {/* Stats with parallax */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <div key={stat.label} className="text-center p-4 bg-blue-500/5 backdrop-blur-sm 
                     rounded-lg border border-blue-400/10 hover:border-blue-400/30 transition-all"
                     style={{ transform: `translateY(${state.scrollY * (0.1 + index * 0.05)}px)` }}>
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Line Decorations */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r 
             from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute bottom-2 left-0 w-full h-px bg-gradient-to-r 
             from-transparent via-blue-400/10 to-transparent" />
      </section>

      {/* Mobile Menu */}
      {state.isMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg z-50 md:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-400">Cloud Garage</span>
              <X className="h-6 w-6 text-blue-400 cursor-pointer" 
                 onClick={() => setState(prev => ({ ...prev, isMenuOpen: false }))} />
            </div>
            <div className="mt-8">
              {NAVIGATION.map(item => (
                <a key={item.name} href={item.href}
                   onClick={(e) => handleNavClick(e, item.href)}
                   className="block py-3 text-lg text-blue-300 border-b border-blue-400/20 
                     hover:text-blue-400 hover:pl-4 transition-all">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse0 {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        @keyframes pulse1 {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.8); opacity: 0.7; }
        }
        @keyframes pulse2 {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(2); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default TopSection;