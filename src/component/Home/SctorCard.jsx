import React, { useState } from "react";
import { useCases } from "./data";
import IndustryCard from "./Success";
import { ChevronRight, Zap, Cpu, Building2, Factory, ArrowLeft } from "lucide-react";

const SectorSelector = () => {
  const [selectedSector, setSelectedSector] = useState(null);
  const [showCaseStudies, setShowCaseStudies] = useState(false);

  const sectors = [
    {
      id: "power",
      name: "Power Generation",
      icon: Zap,
      description: "The Power Generation sector, including renewables, leverages Azure to optimize energy production, improve data reliability, and enable real-time analytics for sustainable operations.",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      count: `${useCases.filter(uc => 
        uc.industry.includes("Power Generation") || 
        uc.industry.includes("Renewables")
      ).length} Case Studies`
    },
    {
      id: "energy",
      name: "Energy",
      icon: Building2,
      description: "The Energy sector, encompassing thermal and solar, utilizes Azure to enhance performance, streamline data processing, and deliver actionable insights for operational excellence.",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
      count: `${useCases.filter(uc => 
        uc.industry.includes("Energy") || 
        uc.industry.includes("Thermal & Solar")
      ).length} Case Studies`
    },
    {
      id: "technology",
      name: "Technology",
      icon: Cpu,
      description: "The Technology sector benefits from Azure's scalable infrastructure to improve application performance, support sales automation, and drive innovation across operations.",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
      count: `${useCases.filter(uc => 
        uc.industry.includes("Technology")
      ).length} Case Studies`
    },
    {
      id: "cement",
      name: "Cement Production",
      icon: Factory,
      description: "The Cement Production sector, integrating solar energy, uses Azure to ensure reliable data pipelines, real-time analytics, and improved decision-making for sustainable growth.",
      color: "bg-gradient-to-br from-gray-400 to-gray-600",
      count: `${useCases.filter(uc => 
        uc.industry.includes("Cement Production")
      ).length} Case Studies`
    }
  ];

  const handleSectorClick = (sector) => {
    setSelectedSector(sector);
    setShowCaseStudies(true);
  };

  const handleBackToSectors = () => {
    setShowCaseStudies(false);
    setSelectedSector(null);
  };

  // Filter use cases based on the selected sector (same logic as original)
  const filteredUseCases = selectedSector 
    ? useCases.filter(
        (useCase) =>
          useCase.industry.includes(selectedSector.name) ||
          (selectedSector.name === "Power Generation" &&
            useCase.industry.includes("Renewables")) ||
          (selectedSector.name === "Energy" &&
            useCase.industry.includes("Thermal & Solar")) ||
          (selectedSector.name === "Cement Production" &&
            useCase.industry.includes("Cement Production"))
      )
    : useCases;

  // Case Studies Detail View
  if (showCaseStudies && selectedSector) {
    return (
      <div className="bg-gray-50 min-h-screen" style={{animation: 'fadeIn 0.5s ease-out'}}>
        {/* Header with Back Button */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-8 py-6">
            <button
              onClick={handleBackToSectors}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Sectors
            </button>
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg ${selectedSector.color} flex items-center justify-center mr-4`}>
                <selectedSector.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{selectedSector.name}</h1>
                <p className="text-gray-600 mt-1">{selectedSector.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Cards using your original component */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="space-y-16">
            {filteredUseCases.length > 0 ? (
              filteredUseCases.map((useCase, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center min-h-[400px] ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col gap-8 lg:gap-16`}
                  style={{
                    animation: `slideInFromBottom 0.6s ease-out ${index * 0.2}s both`
                  }}
                >
                  {/* Industry Card Container */}
                  <div className="flex-1 max-w-4xl w-full">
                    <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <IndustryCard
                        industry={useCase.industry}
                        department={useCase.department}
                        problem={useCase.problem}
                        synopsis={useCase.synopsis}
                        situation={useCase.situation}
                        solution={useCase.solution}
                        azureServices={useCase.azureServices}
                        benefits={useCase.benefits}
                        outcomes={useCase.outcomes}
                        roiTimeline={useCase.roiTimeline}
                      />
                    </div>
                  </div>
                  
                  {/* Decorative Visual Element */}
                  <div className="flex-shrink-0 hidden lg:block">
                    <div className={`w-32 h-32 rounded-full ${sectors.find(s => 
                      useCase.industry.includes(s.name) || 
                      (s.name === "Power Generation" && useCase.industry.includes("Renewables")) ||
                      (s.name === "Energy" && useCase.industry.includes("Thermal & Solar"))
                    )?.color || 'bg-gradient-to-br from-blue-400 to-purple-500'} 
                    flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-12`}>
                      {(() => {
                        const sector = sectors.find(s => 
                          useCase.industry.includes(s.name) || 
                          (s.name === "Power Generation" && useCase.industry.includes("Renewables")) ||
                          (s.name === "Energy" && useCase.industry.includes("Thermal & Solar"))
                        );
                        const IconComponent = sector?.icon || Cpu;
                        return <IconComponent className="w-16 h-16 text-white" />;
                      })()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12" style={{animation: 'fadeIn 0.6s ease-out'}}>
                <div className="text-6xl mb-4">📊</div>
                <p className="text-xl text-gray-600 mb-2">No case studies available</p>
                <p className="text-gray-500">Case studies for {selectedSector.name} are coming soon.</p>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes slideInFromBottom {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  // Main Sector Selection View
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Industry Transformation with Microsoft Azure
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Explore how Azure solutions drive innovation and efficiency across various sectors. 
            Select a sector to view tailored case studies.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
              Select a sector below to explore case studies
            </div>
          </div>
        </div>
      </div>

      {/* Sector Cards Grid */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Industry</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click on any sector card to explore real-world case studies, solutions, and success metrics
            from companies that have transformed their operations with Azure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {sectors.map((sector) => {
            const IconComponent = sector.icon;
            return (
              <div
                key={sector.id}
                onClick={() => handleSectorClick(sector)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                  {/* Card Header with Gradient */}
                  <div className={`${sector.color} h-32 flex items-center justify-center relative`}>
                    <IconComponent className="w-12 h-12 text-white" />
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium">{sector.count}</span>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                      {sector.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {sector.description}
                    </p>
                    
                    {/* Call to Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Explore Case Studies
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your Industry?</h3>
            <p className="text-gray-600 mb-6">
              Connect with our Azure experts to discuss how these solutions can be tailored for your organization.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorSelector;