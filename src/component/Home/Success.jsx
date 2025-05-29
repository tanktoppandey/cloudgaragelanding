import React, { useState } from "react";

const IndustryCard = ({
  industry,
  department,
  problem,
  synopsis,
  situation,
  solution,
  azureServices = [], // Array of { name, description }
  benefits = [], // Array of { metric, title, description }
  outcomes = [], // Array of strings
  roiTimeline = "", // String for ROI
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="rounded-xl shadow-xl bg-white border border-gray-200 max-w-4xl mx-auto my-8">
      {/* Top Azure Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 px-8 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 96 96" fill="currentColor">
            <path d="M49.5,37l8.6-14.9l-23-9.4L26.9,37H49.5z M25.1,40.7L22.4,48L12,74.3l27.2-4.4l-14-29.2H25.1z M53.1,40.7H40.6l14,29.2l27.4,4.4L71.3,48l-2.7-7.3H53.1z M67.5,22.1L58.9,37h16.9l-4.9-8.4l15.6-6.4L59.1,12.7L67.5,22.1z" />
          </svg>
          {/* <span className="font-bold">Microsoft Azure Solution</span> */}
        </div>
        <div className="bg-blue-800 text-xs px-3 py-1 rounded-full">
          Enterprise Ready
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {industry} Industry Transformation
            </h2>
            <p className="text-blue-600 font-medium text-sm mb-3">CASE STUDY | CLOUD MIGRATION</p>
            <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span><strong>Department:</strong> {department}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* <div className="bg-blue-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" />
                <path d="M9.25 10.25L4.75 13L12 17.25L19.25 13L14.75 10.25" />
                <path d="M9.25 14.25L4.75 17L12 21.25L19.25 17L14.75 14.25" />
              </svg>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.1,8.6c1.5,0,2.5,1,2.5,2.6s-1,2.6-2.5,2.6c-1.5,0-2.5-1-2.5-2.6S8.7,8.6,10.1,8.6L10.1,8.6z M13.8,6.2v5.1h3.9V2.8h-9V5h-4c-2.5,0-4.5,2-4.5,4.5v3c0,0.6,0.4,1,1,1h4.5v2.2h-4c-0.6,0-1,0.4-1,1v3C0.2,21.2,2.2,23.2,4.7,23.2h10.1v-8.9h-5.9v-2.2h7.9c0.6,0,1-0.4,1-1v-3c0-1-0.9-1.9-1.9-1.9H13.8z" />
              </svg>
            </div> */}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px辣

System: px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === "solution"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Azure Solution
            </button>
            <button
              onClick={() => setActiveTab("benefits")}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === "benefits"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Benefits & ROI
            </button>
          </nav>
        </div>

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div>
            <div className="mb-6 bg-blue-50 p-4 rounded-lg border-l-2 border-blue-600">
              <h3 className="font-bold text-blue-600 text-lg flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Business Challenge
              </h3>
              <p className="text-gray-700">{problem}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Customer Profile
                </h3>
                <p className="text-gray-700">{synopsis}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Legacy Environment
                </h3>
                <p className="text-gray-700">{situation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Solution Tab Content */}
        {activeTab === "solution" && (
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                  1
                </div>
                <h3 className="font-bold text-lg">Assessment & Planning</h3>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-3">
                  Comprehensive evaluation of existing infrastructure, data requirements, and migration strategies.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    Azure Migrate Assessment
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    Cloud Adoption Framework
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                  2
                </div>
                <h3 className="font-bold text-lg">Solution Architecture</h3>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-3">{solution}</p>
                <div className="grid grid-cols-2 gap-4">
                  {azureServices.map((service, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-3 flex items-start"
                    >
                      <div className="bg-blue-100 p-2 rounded text-blue-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" />
                          <path d="M9.25 10.25L4.75 13L12 17.25L19.25 13L14.75 10.25" />
                          <path d="M9.25 14.25L4.75 17L12 21.25L19.25 17L14.75 14.25" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {service.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Tab Content */}
        {activeTab === "benefits" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`bg-${benefit.color}-50 p-5 rounded-lg border border-${benefit.color}-100 text-center`}
                >
                  <div className={`text-${benefit.color}-600 font-bold text-3xl mb-1`}>
                    {benefit.metric}
                  </div>
                  <div className={`text-${benefit.color}-800 font-medium`}>
                    {benefit.title}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Business Outcomes</h3>
              <ul className="space-y-2">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>

              {roiTimeline && (
                <div className="mt-4 bg-white p-4 rounded border border-gray-200">
                  <div className="flex items-center mb-2">
                    <svg
                      className="h-4 w-4 text-blue-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium text-gray-800">ROI Timeline</span>
                  </div>
                  <p className="text-gray-700 text-sm">{roiTimeline}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-6 rounded-b-xl border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              Microsoft Cloud Solution Architect
            </div>
            <div className="text-xs text-gray-500">Schedule a free consultation</div>
          </div>
        </div>
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center transition-colors duration-300">
          View Full Case Study
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default IndustryCard;