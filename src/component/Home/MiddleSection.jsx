import React, { useState, useEffect, useRef } from "react";
import { Brain, Shield, Cloud, Sparkles, ArrowRight } from "lucide-react";

const AISection = () => {
  const [state, setState] = useState({ 
    isVisible: false, 
    activeService: null, 
    scrollProgress: 0,
    visibleDetails: {} // Track visibility of each detail card
  });
  const sectionRef = useRef(null);
  const detailRefs = useRef({}); // Store refs for each detail card

  const services = [
    {
      icon: Cloud,
      title: "Azure Consulting and Implementation",
      desc: "Architecting scalable Azure environments",
      details: [
        { title: "Architecting Excellence", desc: "Let us design an Azure environment that scales with your ambitions. From virtual networks to containers, we've got the blueprint." },
        { title: "Cost Optimization", desc: "Azure pricing can be complex. We simplify it for you, ensuring you get the most out of your investment." },
      ],
    },
    {
      icon: Brain,
      title: "Data Analytics Solutions",
      desc: "Turning data into actionable insights",
      details: [
        { title: "Big Data Insights", desc: "Data isn't just numbers; it's your competitive edge. Our analytics solutions turn raw data into actionable insights." },
        { title: "Machine Learning Magic", desc: "Predictive models, anomaly detection, and AI-driven decision-making—our ML wizards have it covered." },
      ],
    },
    {
      icon: Shield,
      title: "AI Solutions",
      desc: "Custom AI models for your business",
      details: [
        { title: "Custom AI Models", desc: "We build AI models that understand your business context. From chatbots to sentiment analysis, we're fluent in NLP." },
        { title: "Empowering Conversations", desc: "Let's make your customer interactions smarter. Our AI solutions enhance user experiences." },
      ],
    },
  ];

  const stats = [
    { label: "Certified", value: "10+", gradient: "from-blue-600 to-blue-400" },
    { label: "Years", value: "8+", gradient: "from-blue-500 to-violet-500" },
    { label: "Hours", value: "500+", gradient: "from-violet-500 to-blue-500" },
    { label: "Projects", value: "5", gradient: "from-blue-400 to-violet-400" },
  ];

  useEffect(() => {
    // Section visibility observer
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setState(prev => ({ ...prev, isVisible: entry.isIntersecting }));
        if (entry.isIntersecting) {
          const { height, top } = sectionRef.current.getBoundingClientRect();
          const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - top) / (height + window.innerHeight)));
          setState(prev => ({ ...prev, scrollProgress }));
        }
      },
      { threshold: 0.1 }
    );

    // Detail cards observer
    const detailObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const [serviceIdx, detailIdx] = entry.target.dataset.key.split('-');
            setState(prev => ({
              ...prev,
              visibleDetails: {
                ...prev.visibleDetails,
                [`${serviceIdx}-${detailIdx}`]: true
              }
            }));
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the card is visible
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    
    // Observe each detail card
    Object.values(detailRefs.current).forEach(ref => {
      if (ref) detailObserver.observe(ref);
    });

    return () => {
      sectionObserver.disconnect();
      detailObserver.disconnect();
    };
  }, []);

  const handleHover = (title, isEntering) => {
    setState(prev => ({ ...prev, activeService: isEntering ? title : null }));
  };

  return (
    <section ref={sectionRef} className={`relative py-16 overflow-hidden transition-opacity duration-1000 ${state.isVisible ? "opacity-100" : "opacity-0"}`} id="services">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/20 arrow-grid-pattern opacity-10" />
      <div className="absolute inset-0 border-2 border-transparent" style={{ background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, ${state.scrollProgress}), transparent)` }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className={`text-center mb-12 transition-transform duration-1000 ${state.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 mb-4 shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-sm font-medium text-white">Our Services</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-4 pb-2">Empowering Your Business</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">Tailored cloud, data, and AI solutions</p>
        </div>

        {/* Alternating layout services */}
        <div className="flex flex-col space-y-20 mb-12">
          {services.map((service, i) => (
            <div 
              key={service.title}
              className={`transition-all duration-700 flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-6 ${state.isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
              onMouseEnter={() => handleHover(service.title, true)}
              onMouseLeave={() => handleHover(service.title, false)}
            >
              {/* Card Box */}
              <div className="w-full md:w-64 lg:w-80 transition-all duration-300 hover:scale-105">
                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden h-full p-6 group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <service.icon className={`w-12 h-12 text-blue-600 mb-4 transition-all duration-500 ${state.activeService === service.title ? 'rotate-12 scale-110' : ''}`} />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.desc}</p>
                  </div>
                </div>
              </div>

              {/* Details with sequential animation */}
              <div className="w-full flex-1 space-y-6">
                {service.details.map((detail, j) => {
                  const detailKey = `${i}-${j}`;
                  const isVisible = state.visibleDetails[detailKey];
                  return (
                    <div 
                      key={j}
                      ref={el => detailRefs.current[detailKey] = el}
                      data-key={detailKey}
                      className={`transition-all duration-500 ease-out rounded-lg p-4 bg-white shadow-md border border-blue-50 hover:shadow-lg transform ${
                        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
                      }`}
                      style={{ transitionDelay: isVisible ? `${j * 200}ms` : '0ms' }}
                    >
                      <h4 className="font-semibold text-gray-900 text-lg">{detail.title}</h4>
                      <p className="text-gray-700 text-sm mt-1">{detail.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`transition-all duration-500 ${state.isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50/30">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>{stat.value}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-1000 ${state.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="inline-block bg-white px-6 py-4 rounded-xl shadow-md border border-blue-100 hover:shadow-xl transition-all bg-gradient-to-br from-white to-blue-50/50">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-3">Transform Your Business</h3>
            <button className="group relative px-6 py-2 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:scale-105 transition-transform duration-300" />
              <a href="#contact">
                <span className="relative text-white flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .arrow-grid-pattern {
          background-image: url('data:image/svg+xml;base64,${btoa('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4 L20 12 L12 20" stroke="rgba(59, 130, 246, 0.2)" stroke-width="2" fill="none"/></svg>')}');
          background-size: 24px 24px;
          animation: patternShift 30s linear infinite;
        }

        @keyframes patternShift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(24px, 24px); }
        }
      `}</style>
    </section>
  );
};

export default AISection;