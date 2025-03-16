import { motion } from "framer-motion";
import { FiCalendar, FiActivity, FiSearch } from "react-icons/fi";

const ToolsCalculators = () => {
  return (
    <section id="tools" className="section-padding bg-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">
            Helpful Tools & Calculators
          </h2>
          <p className="paragraph max-w-2xl mx-auto">
            Stay informed and organized with our suite of pregnancy planning
            tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600">
              <FiCalendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Due Date Calculator</h3>
            <p className="text-gray-600 mb-4">
              Calculate your expected due date based on your last period or
              conception date.
            </p>
            <button className="btn-primary w-full">Calculate Due Date</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600">
              <FiActivity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Weight Tracker</h3>
            <p className="text-gray-600 mb-4">
              Monitor your pregnancy weight gain and get personalized
              recommendations.
            </p>
            <button className="btn-primary w-full">Track Weight</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600">
              <FiSearch className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Baby Name Finder</h3>
            <p className="text-gray-600 mb-4">
              Search through thousands of names by meaning, origin, or
              popularity.
            </p>
            <button className="btn-primary w-full">Find Names</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsCalculators;
