import { motion } from "framer-motion";
import { FiPhone, FiAlertCircle, FiHelpCircle } from "react-icons/fi";

const EmergencyResources = () => {
  return (
    <section className="section-padding bg-red-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">Emergency Resources</h2>
          <p className="paragraph max-w-2xl mx-auto">
            Quick access to important emergency contacts and information during
            pregnancy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-red-600">
              <FiPhone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="font-semibold">Emergency:</span>
                <a href="tel:911" className="text-red-600 hover:text-red-700">
                  911
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold">24/7 Nurse Line:</span>
                <a
                  href="tel:1800NURSE"
                  className="text-red-600 hover:text-red-700"
                >
                  1-800-NURSE
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold">Poison Control:</span>
                <a
                  href="tel:18002221222"
                  className="text-red-600 hover:text-red-700"
                >
                  1-800-222-1222
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-red-600">
              <FiAlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Warning Signs</h3>
            <ul className="space-y-3 text-gray-600">
              <li>Severe abdominal pain</li>
              <li>Heavy bleeding</li>
              <li>Severe headaches</li>
              <li>Decreased fetal movement</li>
              <li>High fever</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-red-600">
              <FiHelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quick FAQs</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">
                  When should I go to the ER?
                </h4>
                <p className="text-gray-600">
                  If you experience severe pain, heavy bleeding, or decreased
                  fetal movement.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">What about contractions?</h4>
                <p className="text-gray-600">
                  Time them and call if they're regular before 37 weeks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyResources;
