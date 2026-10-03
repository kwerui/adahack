type RecommendationProps = {
  airQuality: number | null;
  carbonIntensity: number | null;
  greenSpaceCount: number | null;
};

export default function RecommendationCard({
  airQuality,
  carbonIntensity,
  greenSpaceCount,
}: RecommendationProps) {
  function getRecommendation() {
    if (
      airQuality === null ||
      carbonIntensity === null ||
      greenSpaceCount === null
    ) {
      return "Analysing your local area...";
    }
// Recommendations are rule-based so they remain transparent and explainable.

    if (carbonIntensity >= 250) {
      return "⚡ Electricity is relatively carbon-intensive right now. Consider delaying non-essential energy-heavy tasks such as laundry or dishwashing.";
    }

    if (airQuality <= 40) {
      return "🚶 Air quality is good today. Consider walking or cycling for a short local journey instead of driving.";
    }

    if (greenSpaceCount < 3) {
      return "🌱 Your neighbourhood has relatively few mapped green spaces nearby. Consider supporting planting or community greening projects.";
    }

    if (carbonIntensity < 150) {
      return "⚡ Electricity is relatively low-carbon right now. This could be a better time for energy-heavy household tasks.";
    }

    return "🌿 Local conditions are looking fairly good. Keep making lower-impact choices such as walking locally and using electricity efficiently.";
  }

  return (
    <div className="bg-white text-gray-800 border border-green-200 rounded-2xl p-6 text-center w-full max-w-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-3">
        💡 Best Action Today
      </h2>

      <p className="text-gray-700">
        {getRecommendation()}
      </p>
    </div>
  );
}