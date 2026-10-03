const tiers = [
  {
    name: "Seedling",
    emoji: "🌱",
    range: "0–24",
    description: "Your postcode has started its green journey.",
  },
  {
    name: "Sprout",
    emoji: "🌿",
    range: "25–49",
    description: "Your community is building greener habits.",
  },
  {
    name: "Bloom",
    emoji: "🌸",
    range: "50–74",
    description: "Your postcode is making strong environmental progress.",
  },
  {
    name: "Canopy",
    emoji: "🌳",
    range: "75–100",
    description: "Your community has reached the highest GreenStreet level.",
  },
];

const pointTypes = [
  {
    title: "Everyday actions",
    emoji: "🚶",
    points: "5–25 points",
    description:
      "Smaller sustainable actions such as walking, cycling or using public transport instead of driving.",
    limit: "Maximum 25 points per day.",
  },
  {
    title: "Home shifts",
    emoji: "⚡",
    points: "50–100 points",
    description:
      "Larger household actions such as using energy-heavy appliances during lower-carbon periods.",
    limit: "Maximum 150 points per day.",
  },
  {
    title: "Community projects",
    emoji: "🌳",
    points: "Up to 1000 points",
    description:
      "High-impact neighbourhood projects such as tree planting or larger community sustainability projects.",
    limit: "Large projects would require additional verification.",
  },
];

const rewards = [
  {
    title: "Community recognition",
    emoji: "🏅",
    description:
      "Show your postcode's GreenStreet level and celebrate progress together.",
  },
  {
    title: "Sustainable discounts",
    emoji: "🎟️",
    description:
      "Prototype rewards could include discounts from sustainable or local partners.",
  },
  {
    title: "Freebies",
    emoji: "🎁",
    description:
      "Communities could unlock small sustainability-related rewards as they progress.",
  },
  {
    title: "Neighbourhood competition",
    emoji: "🏘️",
    description:
      "Postcodes could compete for both the greenest area and the most improved area.",
  },
];

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-green-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 text-center mb-3">
          GreenStreet Awards 🏆
        </h1>

        <p className="text-gray-600 text-center mb-10">
          Work together with your postcode community to earn points and grow
          through the GreenStreet levels.
        </p>

        {/* LEVELS */}
        <section>
          <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
            GreenStreet Levels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-white border-2 border-green-600 rounded-xl p-6 text-center shadow-sm"
              >
                <p className="text-4xl mb-3">
                  {tier.emoji}
                </p>

                <h3 className="text-xl font-bold text-green-600">
                  {tier.name}
                </h3>

                <p className="font-semibold text-gray-800 mt-2">
                  {tier.range} points
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* POINTS */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-3">
            How do you earn points?
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Bigger sustainability actions can contribute more points to your
            postcode community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pointTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white border-2 border-green-600 rounded-xl p-6 shadow-sm"
              >
                <p className="text-3xl mb-3">
                  {type.emoji}
                </p>

                <h3 className="text-xl font-bold text-green-600 mb-2">
                  {type.title}
                </h3>

                <p className="font-semibold text-gray-800 mb-3">
                  {type.points}
                </p>

                <p className="text-gray-700 mb-4">
                  {type.description}
                </p>

                <p className="text-sm text-gray-500">
                  {type.limit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SCORE EXPLANATION */}
        <section className="mt-14">
          <div className="bg-white border-2 border-green-600 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
              How does your postcode level grow?
            </h2>

            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              Your postcode score is designed to combine local environmental
              conditions with community participation. Environmental data such
              as air quality, carbon intensity and nearby green space can form
              part of the baseline, while completed actions and community
              participation help the postcode progress.
            </p>

            <p className="text-sm text-gray-500 text-center mt-4">
              The final scoring formula is still a prototype and would need
              further testing to keep comparisons fair between postcodes of
              different sizes.
            </p>
          </div>
        </section>

        {/* REWARDS */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-3">
            GreenStreet Rewards 🎁
          </h2>

          <p className="text-gray-600 text-center mb-6">
            As a postcode progresses, the community could unlock recognition
            and sustainability-focused rewards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.title}
                className="bg-white border-2 border-green-600 rounded-xl p-6 text-center shadow-sm"
              >
                <p className="text-4xl mb-3">
                  {reward.emoji}
                </p>

                <h3 className="text-lg font-bold text-green-600 mb-2">
                  {reward.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {reward.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Reward examples shown here are prototype concepts and are not
            confirmed Postcode Lottery rewards.
          </p>
        </section>
      </div>
    </main>
  );
}