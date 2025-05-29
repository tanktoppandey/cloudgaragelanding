// useCases.js
export const useCases = [
    {
      industry: "Power Generation (Renewables)",
      department: "Data & AI, Operations, Maintenance",
      problem:
        "Data integrity compromised due to reliance on SCADA systems for data transfer, leading to potential data loss before reaching Azure Synapse.",
      synopsis:
        "A renewable energy provider faced data integrity issues due to SCADA-based data transfer, risking incomplete data for analytics and operational decisions.",
      situation:
        "Legacy SCADA systems caused data loss during transmission, limiting real-time analytics and operational efficiency.",
      solution:
        "Implemented direct data acquisition from PLCs to Azure Synapse, bypassing SCADA, with increased Synapse compute capacity and Microsoft Fabric services for effective data management and analysis.",
      azureServices: [
        { name: "Azure Synapse", description: "Real-time data analytics and processing" },
        { name: "Microsoft Fabric", description: "Unified data management and analytics platform" },
      ],
      benefits: [
        {
          metric: "Improved",
          title: "Data Integrity",
          description: "Eliminated data loss with direct PLC integration",
          color: "blue",
        },
        {
          metric: "Real-time",
          title: "Analytics",
          description: "Enabled real-time operational insights",
          color: "green",
        },
      ],
      outcomes: ["Enhanced data reliability for operational decisions", "Improved analytics speed and accuracy"],
      roiTimeline: "Significant operational savings within 12 months",
    },
    {
      industry: "Energy (Thermal & Solar)",
      department: "Data & AI, Operations, Quality Control, R&D",
      problem: "Performance issues in mobile BI app due to streaming an entire dataset of 50,000 tags via Signal R.",
      synopsis:
        "An energy company’s mobile BI app suffered from slow performance, hindering real-time insights for operations and quality control teams.",
      situation: "The mobile BI app’s reliance on Signal R for streaming large datasets caused delays and poor user experience.",
      solution:
        "Deployed Azure Data Hub and Azure Synapse for selective tag streaming, reducing data volume and improving app performance for real-time insights.",
      azureServices: [
        { name: "Azure Data Hub", description: "Efficient data streaming and processing" },
        { name: "Azure Synapse", description: "Scalable analytics for large datasets" },
      ],
      benefits: [
        {
          metric: "Faster",
          title: "App Performance",
          description: "Reduced data streaming volume for responsive BI",
          color: "blue",
        },
        {
          metric: "Scalable",
          title: "Analytics",
          description: "Improved scalability for growing data needs",
          color: "green",
        },
      ],
      outcomes: ["Enhanced mobile BI app performance", "Real-time actionable insights for operations"],
      roiTimeline: "Performance improvements realized within 6 months",
    },
    {
      industry: "Power Generation (Renewables)",
      department: "Data & AI, Operations, Legal",
      problem: "Manual data gathering and querying from multiple PDF documents was time-consuming and error-prone.",
      synopsis:
        "A renewable energy firm struggled with inefficient manual processes for querying data from PDF documents, impacting operational and legal workflows.",
      situation: "Manual PDF data extraction slowed down critical processes and introduced errors.",
      solution:
        "Developed an Azure OpenAI-powered chatbot to automate data retrieval and querying across PDF files, enhancing accuracy and reducing access time.",
      azureServices: [{ name: "Azure OpenAI", description: "AI-powered data extraction and querying" }],
      benefits: [
        {
          metric: "Reduced",
          title: "Processing Time",
          description: "Automated data retrieval from PDFs",
          color: "blue",
        },
        {
          metric: "Improved",
          title: "Accuracy",
          description: "Minimized errors in data extraction",
          color: "green",
        },
      ],
      outcomes: ["Streamlined document management processes", "Enhanced accuracy in legal and operational data retrieval"],
      roiTimeline: "Efficiency gains within 3 months of implementation",
    },
    {
      industry: "Technology",
      department: "Data & AI, Sales, Marketing, Operations, IT",
      problem: "Performance issues in the Sales Force Automation (SFA) app affected user experience and productivity.",
      synopsis: "A technology company’s SFA app faced slow performance, impacting sales and operational efficiency.",
      situation: "The SFA app’s legacy architecture caused slow response times and limited scalability.",
      solution:
        "Utilized Azure Fabric and a revised data architecture to enhance SFA app performance, enabling faster processing and scalability.",
      azureServices: [{ name: "Azure Fabric", description: "Unified data and analytics platform" }],
      benefits: [
        {
          metric: "Faster",
          title: "Processing",
          description: "Improved app response times",
          color: "blue",
        },
        {
          metric: "Scalable",
          title: "Architecture",
          description: "Enhanced scalability for future growth",
          color: "green",
        },
      ],
      outcomes: ["Improved sales team productivity", "Scalable platform for future enhancements"],
      roiTimeline: "Performance gains within 6 months",
    },
    {
      industry: "Industry Transformation",
      department: "Data & AI, Operations, Maintenance",
      problem: "Operational inefficiencies due to data loss during transmission from solar sites to the cloud.",
      synopsis:
        "A cement producer expanding into solar energy faced data loss issues, affecting analytics and operational decision-making.",
      situation: "Data transmission from solar sites to the cloud was unreliable, impacting analytics quality.",
      solution:
        "Established a robust data pipeline using Azure IoT, Azure Synapse, and Microsoft Fabric for real-time analytics, improving data accuracy and decision-making.",
      azureServices: [
        { name: "Azure IoT", description: "Real-time data collection from solar sites" },
        { name: "Azure Synapse", description: "Scalable analytics for solar data" },
        { name: "Microsoft Fabric", description: "Unified data management platform" },
      ],
      benefits: [
        {
          metric: "Improved",
          title: "Data Accuracy",
          description: "Eliminated data loss in transmission",
          color: "blue",
        },
        {
          metric: "Real-time",
          title: "Insights",
          description: "Enabled real-time operational analytics",
          color: "green",
        },
      ],
      outcomes: ["Enhanced operational decision-making", "Improved solar energy management"],
      roiTimeline: "Operational savings within 9 months",
    },
  ];