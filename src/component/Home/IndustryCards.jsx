// IndustryCardsPreview.jsx
import { useCases } from "./data";
import IndustryCard from "./Success";

const IndustryCardsPreview = () => {
  return (
    <div className="bg-gray-100 p-8">
      {useCases.map((useCase, index) => (
        <IndustryCard
          key={index}
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
      ))}
    </div>
  );
};

export default IndustryCardsPreview;