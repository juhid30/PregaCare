import { motion } from "framer-motion";
import { FiCalendar, FiHeart } from "react-icons/fi";
import mother from "../assets/mom.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden min-h-screen section-padding pt-16 pb-32 ">
      <div className="container-width mt-16 sm:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-primary mb-6">
              Your Journey to
              <span className="text-primary-600"> Motherhood </span>
              Starts Here
            </h1>
            <p className="paragraph mb-8">
              Welcome to PregaCare, your trusted companion throughout your
              pregnancy journey. Get personalized guidance, track your progress,
              and connect with a supportive community of expecting parents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <FiCalendar className="h-5 w-5" />
                Track Your Pregnancy
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <FiHeart className="h-5 w-5" />
                Join Community
              </button>
            </div>
          </motion.div>
          <motion.div
            className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <img
                className="w-full rounded-2xl shadow-xl ring-1 ring-gray-400/10"
                src={mother}
                alt="Happy expecting mother"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
                <div className="bg-primary-100 rounded-full p-2">
                  <FiHeart className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Join 10,000+</p>
                  <p className="text-sm text-gray-500">expecting parents</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
