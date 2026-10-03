export default function AboutPage() {
  return (
    <main className="min-h-screen bg-green-100 px-6 py-12 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">

        <section className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            About GreenStreet 🌱
          </h1>

          <p className="text-lg">
            GreenStreet helps neighbours understand the environmental
            conditions in their postcode and take practical action together.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">
            How it works
          </h2>

          <p className="mb-3">
            Enter your postcode and GreenStreet combines local environmental
            data into one simple dashboard.
          </p>

          <p>
            We show local air quality, electricity carbon intensity and nearby
            green spaces, then turn those results into practical actions and
            community challenges.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">
            Our data
          </h2>

          <div className="space-y-3">
            <p>
              📍 <strong>Postcodes.io</strong> — converts a postcode into
              location information and coordinates.
            </p>

            <p>
              🌬 <strong>Open-Meteo</strong> — provides current local
              air-quality data.
            </p>

            <p>
              ⚡ <strong>Carbon Intensity API</strong> — provides regional
              electricity carbon-intensity information.
            </p>

            <p>
              🌳 <strong>Geoapify</strong> — identifies nearby parks and
              green spaces.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">
            From information to action
          </h2>

          <p>
            GreenStreet analyses local conditions and recommends practical
            actions based on what is happening in the area.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">
            Greener together 🤝
          </h2>

          <p>
            Neighbours can take part in postcode-based sustainability
            challenges and work towards shared community goals.
          </p>
        </section>

      </div>
    </main>
  );
}