import { motion } from "framer-motion";
import { FiCalendar, FiBell, FiHeart, FiBook } from "react-icons/fi";

const features = [
  {
    icon: <FiCalendar className="h-6 w-6" />,
    title: "Doctor Appointment Scheduler",
    description:
      "Never miss an important checkup. Set reminders and track your medical visits easily.",
  },
  {
    icon: <FiBell className="h-6 w-6" />,
    title: "Medication & Supplement Reminders",
    description:
      "Stay on track with your prenatal vitamins and medications with timely notifications.",
  },
  {
    icon: <FiHeart className="h-6 w-6" />,
    title: "Baby Name Suggestions",
    description:
      "Find the perfect name for your little one with our extensive database of names and meanings.",
  },
  {
    icon: <FiBook className="h-6 w-6" />,
    title: "Daily Pregnancy Tips",
    description:
      "Get expert advice on nutrition, exercise, and mental well-being throughout your pregnancy.",
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">Everything You Need</h2>
          <p className="paragraph max-w-2xl mx-auto">
            Comprehensive tools and features designed to support you throughout
            your pregnancy journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
