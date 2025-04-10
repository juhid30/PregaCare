import { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";
import timeline from "../assets/timeline.png";
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
          {" "}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={timeline}
              alt="Pregnancy timeline illustration"
              className="rounded-2xl w-[38rem] shadow-lg"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
              <p className="font-semibold">Track your journey</p>
              <p className="text-sm text-gray-500">40 weeks of milestones</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
    5: "apple seed",
    6: "sweet pea",
    7: "blueberry",
    8: "raspberry",
    9: "green olive",
    10: "prune",
    11: "lime",
    12: "plum",
    13: "peach",
    14: "lemon",
    15: "apple",
    16: "avocado",
    17: "turnip",
    18: "bell pepper",
    19: "heirloom tomato",
    20: "banana",
    21: "carrot",
    22: "spaghetti squash",
    23: "grapefruit",
    24: "ear of corn",
    25: "rutabaga",
    26: "scallion",
    27: "cauliflower",
    28: "eggplant",
    29: "butternut squash",
    30: "cabbage",
    31: "coconut",
    32: "jicama",
    33: "pineapple",
    34: "cantaloupe",
    35: "honeydew melon",
    36: "romaine lettuce",
    37: "swiss chard bunch",
    38: "leek bundle",
    39: "mini watermelon",
    40: "small pumpkin",
  };
  return comparisons[week] || "growing baby";
}

function getWeeklyDescription(week) {
  const descriptions = {
    1: "The journey begins with crucial early development.",
    2: "Your baby's major organs are starting to form.",
    3: "The neural tube is developing into the brain and spinal cord.",
    4: "The heart begins to beat and pump blood.",
    5: "Tiny limbs and facial features start to appear.",
    6: "Arm and leg buds form, and the heart beats regularly.",
    7: "Facial features continue to develop rapidly.",
    8: "Fingers and toes are beginning to form.",
    9: "The embryo is now called a fetus; organs continue developing.",
    10: "Vital organs are now fully formed and starting to function.",
    11: "Fingernails and hair follicles start forming.",
    12: "Your baby can make small movements!",
    13: "Second trimester begins; vocal cords are developing.",
    14: "Facial muscles allow baby to make expressions.",
    15: "Taste buds and hearing are developing.",
    16: "You may feel the first flutters of movement soon.",
    17: "The skeleton is hardening into bone.",
    18: "Ears are in place and baby might hear sounds.",
    19: "Vernix (a protective coating) covers baby’s skin.",
    20: "Halfway there! Anomaly scan often takes place now.",
    21: "Your baby responds to your voice and sound.",
    22: "Facial features are more defined; eyes and lips are visible.",
    23: "Lungs begin to produce surfactant for breathing.",
    24: "Baby’s skin is still translucent but filling out.",
    25: "Nerves are developing for senses like touch and smell.",
    26: "Eyes open soon; lungs continue maturing.",
    27: "Start of the third trimester; brain activity increases.",
    28: "Eyes can now blink; dream (REM) sleep begins.",
    29: "Muscles and lungs are continuing to mature.",
    30: "Baby can grip a finger and has regular sleep cycles.",
    31: "Brain connections are forming rapidly.",
    32: "Baby practices breathing and gains fat.",
    33: "Skull remains soft for delivery.",
    34: "Baby’s fingernails reach the tips of fingers.",
    35: "Fat layers increase to regulate temperature after birth.",
    36: "Most systems are ready; final touches are happening.",
    37: "Considered full term; baby may drop lower in the pelvis.",
    38: "Baby’s organs are fully developed.",
    39: "Baby is ready for life outside the womb.",
    40: "Due date week! Baby may arrive any moment.",
  };
  return (
    descriptions[week] ||
    "Your baby continues to grow and develop new features."
  );
}

export default WeeklyTracker;
