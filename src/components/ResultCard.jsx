import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ResultCard({ predictedAge, confidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10"
    >
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 text-center">
        Your Results
      </h2>
      <div className="flex items-center justify-around gap-8">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-6">
            <CircularProgressbar
              value={predictedAge}
              maxValue={100}
              text={`${predictedAge}`}
              styles={buildStyles({
                textSize: '28px',
                pathColor: `rgba(168, 85, 247, ${confidence})`,
                textColor: '#fff',
                trailColor: 'rgba(255, 255, 255, 0.1)',
                pathTransition: 'stroke-dashoffset 1s ease-in-out',
              })}
            />
          </div>
          <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Predicted Age
          </p>
        </div>
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-6">
            <CircularProgressbar
              value={confidence * 100}
              text={`${Math.round(confidence * 100)}%`}
              styles={buildStyles({
                textSize: '28px',
                pathColor: '#EC4899',
                textColor: '#fff',
                trailColor: 'rgba(255, 255, 255, 0.1)',
                pathTransition: 'stroke-dashoffset 1s ease-in-out',
              })}
            />
          </div>
          <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Confidence
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultCard;