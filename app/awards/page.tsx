const tiers = [
  {
    name: "Seedling",
    emoji: "🌱",
    range: "0–24",
    description: "Your postcode has started its green journey.",
    style: "bg-lime-50 border-lime-200",
  },
  {
    name: "Sprout",
    emoji: "🌿",
    range: "25–49",
    description: "Your community is building greener habits.",
    style: "bg-green-50 border-green-200",
  },
  {
    name: "Bloom",
    emoji: "🌸",
    range: "50–74",
    description: "Your postcode is making strong environmental progress.",
    style: "bg-pink-50 border-pink-200",
  },
  {
    name: "Canopy",
    emoji: "🌳",
    range: "75–100",
    description:
      "Your community has reached the highest GreenStreet level.",
    style: "bg-emerald-50 border-emerald-200",
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

const tierRewards = [
  {
    name: "Seedling",
    emoji: "🌱",
    requiredScore: 0,
    reward: "GreenStreet community badge",
  },
  {
    name: "Sprout",
    emoji: "🌿",
    requiredScore: 25,
    reward: "Sustainable local partner discount",
  },
  {
    name: "Bloom",
    emoji: "🌸",
    requiredScore: 50,
    reward: "Sustainability-focused freebie",
  },
  {
    name: "Canopy",
    emoji: "🌳",
    requiredScore: 75,
    reward: "Highest-level community reward",
  },
];

export default function AwardsPage() {
  // Prototype score for the hackathon demo
  const demoScore = 38;

  const currentTier =
    demoScore >= 75
      ? "Canopy 🌳"
      : demoScore >= 50
      ? "Bloom 🌸"
      : demoScore >= 25
      ? "Sprout 🌿"
      : "Seedling 🌱";

  const nextTarget =
    demoScore < 25
      ? 25
      : demoScore < 50
      ? 50
      : demoScore < 75
      ? 75
      : 100;

  const pointsToNext = Math.max(
    nextTarget - demoScore,
    0
  );

  return (
    <main className="min-h-screen bg-green-100 p-10">
      <div className="max-w-6xl mx-auto">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold text-green-600 text-center mb-3">
          GreenStreet Awards 🏆
        </h1>

        <p className="text-gray-600 text-center mb-10">
          Work together with your postcode community to earn
          points and grow through the GreenStreet levels.
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
className={`${tier.style} border rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition`}
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

        {/* CURRENT POSTCODE PROGRESS */}
        <section className="mt-12">
          <div className="bg-white border border-green-200 rounded-2xl p-8 max-w-3xl mx-auto shadow-sm">
            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
              Your Postcode Progress
            </h2>

            <p className="text-center text-4xl font-bold text-gray-800 mb-2">
              {demoScore} / 100
            </p>

            <p className="text-center text-xl font-semibold text-green-600 mb-5">
              {currentTier}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
              <div
                className="bg-green-600 h-5 rounded-full transition-all duration-500"
                style={{
                  width: `${demoScore}%`,
                }}
              />
            </div>

            {demoScore < 75 ? (
              <p className="text-center text-gray-600">
                {pointsToNext} points until the next
                GreenStreet level.
              </p>
            ) : (
              <p className="text-center text-gray-600">
                Your postcode has reached the highest
                GreenStreet level!
              </p>
            )}

            <p className="text-xs text-gray-400 text-center mt-4">
              Prototype score shown for demonstration.
            </p>
          </div>
        </section>

        {/* POINTS */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-3">
            How do you earn points?
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Bigger sustainability actions can contribute more
            points to your postcode community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pointTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm"
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
          <div className="bg-white border border-green-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
              How does your postcode level grow?
            </h2>

            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              Your postcode score is designed to combine local
              environmental conditions with community
              participation. Environmental data such as air
              quality, carbon intensity and nearby green space
              can form part of the baseline, while completed
              actions and community participation help the
              postcode progress.
            </p>

            <p className="text-sm text-gray-500 text-center mt-4">
              The scoring formula is still a prototype and would
              need further testing to keep comparisons fair
              between postcodes of different sizes.
            </p>
          </div>
        </section>

        {/* DYNAMIC REWARDS */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-3">
            GreenStreet Rewards 🎁
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Grow your postcode level to unlock new community
            rewards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tierRewards.map((reward) => {
              const unlocked =
                demoScore >= reward.requiredScore;

              const pointsNeeded = Math.max(
                reward.requiredScore - demoScore,
                0
              );

              return (
                <div
                  key={reward.name}
                  className={`rounded-xl p-6 text-center border-2 shadow-sm ${
                    unlocked
                      ? "bg-white border-green-600"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <p className="text-4xl mb-3">
                    {unlocked
                      ? reward.emoji
                      : "🔒"}
                  </p>

                  <h3
                    className={`text-xl font-bold ${
                      unlocked
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {reward.name}
                  </h3>

                  <p className="text-gray-700 mt-3">
                    {reward.reward}
                  </p>

                  {unlocked ? (
                    <p className="text-green-600 font-semibold mt-4">
                      ✓ Unlocked
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm mt-4">
                      {pointsNeeded} points needed
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Reward examples are prototype concepts and are not
            confirmed Postcode Lottery rewards.
          </p>
        </section>
      </div>
    </main>
  );
}