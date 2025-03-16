import { motion } from "framer-motion";
import { FiUsers, FiMessageCircle, FiHeart } from "react-icons/fi";

const Community = () => {
  return (
    <section id="community" className="section-padding bg-primary-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">Join Our Community</h2>
          <p className="paragraph max-w-2xl mx-auto">
            Connect with other expecting parents, share experiences, and get
            support from those who understand your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600">
              <FiMessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discussion Forums</h3>
            <p className="text-gray-600 mb-4">
              Join conversations about pregnancy, parenting, and everything in
              between.
            </p>
            <button className="text-primary-600 font-semibold hover:text-primary-700">
              Browse Forums →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600">
              <FiUsers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Support Groups</h3>
            <p className="text-gray-600 mb-4">
              Find your tribe with specialized groups for different pregnancy
              experiences.
            </p>
            <button className="text-primary-600 font-semibold hover:text-primary-700">
              Find Groups →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600">
              <FiHeart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600 mb-4">
              Get advice from healthcare professionals and experienced parents.
            </p>
            <button className="text-primary-600 font-semibold hover:text-primary-700">
              Ask Experts →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Community;
