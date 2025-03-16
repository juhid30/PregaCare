import { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";

const WeeklyTracker = () => {
  const [currentWeek, setCurrentWeek] = useState(1);

  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <section
      id="tracker"
      className="section-padding bg-gradient-to-b from-white to-primary-50"
    >
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">
            Track Your Pregnancy Journey
          </h2>
          <p className="paragraph max-w-2xl mx-auto">
            Follow your baby's development week by week and get personalized
            insights for each stage of your pregnancy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary-100 rounded-full p-3">
                <FiCalendar className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold">Week {currentWeek}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-4">
                {weeks.map((week) => (
                  <button
                    key={week}
                    onClick={() => setCurrentWeek(week)}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      currentWeek === week
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {week}
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Baby's Development</h4>
                <p className="text-gray-600">
                  Your baby is now the size of a{" "}
                  {getWeeklyComparison(currentWeek)}.
                  {getWeeklyDescription(currentWeek)}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <FiClock className="h-4 w-4" />
                <span>Last updated: Today at 9:00 AM</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1584582396772-fe913bb3ee82?auto=format&fit=crop&q=80"
              alt="Pregnancy timeline illustration"
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
              <p className="font-semibold">Track your journey</p>
              <p className="text-sm text-gray-500">40 weeks of milestones</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function getWeeklyComparison(week) {
  const comparisons = {
    1: "poppy seed",
    2: "sesame seed",
    3: "blueberry",
    4: "raspberry",
    // Add more comparisons as needed
  };
  return comparisons[week] || "growing baby";
}

function getWeeklyDescription(week) {
  const descriptions = {
    1: " The journey begins with crucial early development.",
    2: " Your baby's major organs are starting to form.",
    3: " The neural tube is developing into the brain and spinal cord.",
    4: " The heart begins to beat and pump blood.",
    // Add more descriptions as needed
  };
  return (
    descriptions[week] ||
    " Your baby continues to grow and develop new features."
  );
}

export default WeeklyTracker;
