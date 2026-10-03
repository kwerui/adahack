"use client";

import { useEffect, useState } from "react";

type StreetChallengeProps = {
  airQuality: number | null;
  carbonIntensity: number | null;
  greenSpaceCount: number | null;
};

const cleanerTravelChallenges = [
  "Walk instead of driving for a short journey.",
  "Cycle instead of driving for a short journey.",
  "Use public transport instead of a car for one journey.",
  "Avoid unnecessary engine idling when parked or waiting.",
];

const poorAirTravelChallenges = [
  "Use public transport instead of a car for one journey.",
  "Avoid unnecessary engine idling when parked or waiting.",
];

const energyChallenges = [
  "Turn off the lights when leaving the room.",
  "Switch off appliances at the plug instead of leaving them on standby.",
  "Choose a short shower instead of a bath.",
  "Air-dry clothes instead of using the tumble dryer.",
  "Run the dishwasher only when it is full.",
  "Run a full washing machine load at 30°C or lower.",
  "Avoid heating an empty room — only heat rooms when needed.",
  "Turn off your computer or monitor during longer breaks.",
];

const greenSpaceChallenges = [
  "Visit a green space in your postcode that you have never visited before.",
  "Take a walk through your favourite local green space.",
  "Look for a local tree-planting event and consider joining it.",
  "Create a suitable shelter for birds in your garden or outdoor space.",
  "Join or organise a litter pick in a local park or green space.",
];

const localElectricityChallenges = [
  "Spend one evening using as little electricity as reasonably possible.",
  "Use natural daylight instead of electric lighting when practical.",
  "Move one flexible appliance use to a lower-carbon time of day.",
  "Delay running your dishwasher until electricity carbon intensity is lower.",
  "Run your washing machine during a lower-carbon electricity period.",
];

export default function StreetChallenge({
  airQuality,
  carbonIntensity,
  greenSpaceCount,
}: StreetChallengeProps) {
  const [challenge, setChallenge] = useState("");
  const [category, setCategory] = useState("");

  // Prototype community numbers
  const [participants, setParticipants] = useState(14);
  const [joined, setJoined] = useState(false);

  const target = 20;

  useEffect(() => {
    if (
      airQuality === null ||
      carbonIntensity === null ||
      greenSpaceCount === null
    ) {
      return;
    }

    // Only categories that make sense for this postcode
    const relevantCategories: {
      name: string;
      challenges: string[];
    }[] = [];

    // Few nearby green spaces
    if (greenSpaceCount < 3) {
      relevantCategories.push({
        name: "🌳 Green Space Challenge",
        challenges: greenSpaceChallenges,
      });
    }

    // High-carbon electricity
    if (carbonIntensity >= 250) {
      relevantCategories.push({
        name: "🔌 Lower-Carbon Electricity Challenge",
        challenges: localElectricityChallenges,
      });
    }

    // Moderately high electricity carbon
    if (carbonIntensity >= 180 && carbonIntensity < 250) {
      relevantCategories.push({
        name: "⚡ Energy Challenge",
        challenges: energyChallenges,
      });
    }

    // Good air quality makes active travel more suitable
    if (airQuality <= 40) {
      relevantCategories.push({
        name: "🚶 Cleaner Travel Challenge",
        challenges: cleanerTravelChallenges,
      });
    }

    // Poorer air quality: don't specifically encourage walking/cycling
    if (airQuality > 40) {
      relevantCategories.push({
        name: "🚌 Cleaner Travel Challenge",
        challenges: poorAirTravelChallenges,
      });
    }

    // Fallback in case nothing else was added
    if (relevantCategories.length === 0) {
      relevantCategories.push({
        name: "⚡ Energy Challenge",
        challenges: energyChallenges,
      });
    }

    // Choose a relevant category randomly
    const selectedCategory =
      relevantCategories[
        Math.floor(Math.random() * relevantCategories.length)
      ];

    // Choose a challenge randomly from that category
    const selectedChallenge =
      selectedCategory.challenges[
        Math.floor(Math.random() * selectedCategory.challenges.length)
      ];

    setCategory(selectedCategory.name);
    setChallenge(selectedChallenge);
  }, [airQuality, carbonIntensity, greenSpaceCount]);

  function joinChallenge() {
    if (joined) return;

    setParticipants((current) => current + 1);
    setJoined(true);
  }

  const progress = Math.min(
    (participants / target) * 100,
    100
  );

  return (
    <div className="bg-white text-gray-800 border-2 border-green-600 rounded-xl p-6 text-center w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-2">
        🤝 Your Street Challenge
      </h2>

      {!challenge ? (
        <p>Finding a challenge for your area...</p>
      ) : (
        <>
          <p className="text-sm font-semibold text-green-600 mb-3">
            {category}
          </p>

          <p className="text-lg mb-6">
            {challenge}
          </p>

          <p className="font-semibold mb-2">
            {participants} / {target} demo participants
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mb-5">
            Prototype community progress
          </p>

          <button
            onClick={joinChallenge}
            disabled={joined}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {joined ? "Joined ✓" : "Join Challenge"}
          </button>
        </>
      )}
    </div>
  );
}