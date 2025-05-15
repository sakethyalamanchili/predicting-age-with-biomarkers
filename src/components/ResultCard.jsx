import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ResultCard({ predictedAge, confidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Results</h2>
      <div className="flex items-center justify-around gap-8">
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-6">
            <CircularProgressbar
              value={predictedAge}
              maxValue={100}
              text={`${predictedAge}`}
              styles={buildStyles({
                textSize: '28px',
                pathColor: `rgba(168, 85, 247, ${confidence})`,
                textColor: '#fff',
                trailColor: 'rgba(255, 255, 255, 0.1)',
              })}
            />
          </div>
          <p className="text-xl font-semibold text-gray-200">Predicted Age</p>
        </div>
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-6">
            <CircularProgressbar
              value={confidence * 100}
              text={`${Math.round(confidence * 100)}%`}
              styles={buildStyles({
                textSize: '28px',
                pathColor: '#EC4899',
                textColor: '#fff',
                trailColor: 'rgba(255, 255, 255, 0.1)',
              })}
            />
          </div>
          <p className="text-xl font-semibold text-gray-200">Confidence</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultCard;