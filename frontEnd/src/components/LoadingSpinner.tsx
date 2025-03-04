
import { motion } from 'framer-motion';


const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center  bg-gray-300 items-center min-h-screen space-y-6">
      
      {/* Optional: Charging Indicator */}
      <div className="flex items-center space-x-2">
        <motion.div
          className="w-3 h-3 bg-green-500 rounded-full"
          animate={{ y: [0, 10, 0] }} // Animates up and down
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />
        <motion.div
          className="w-3 h-3 bg-green-500 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="w-3 h-3 bg-green-500 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;


