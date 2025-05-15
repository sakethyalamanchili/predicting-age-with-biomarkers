import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ResultCard({ predictedAge, confidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Prediction Result</h2>
      <div className="flex items-center justify-around">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4">
            <CircularProgressbar
              value={predictedAge}
              maxValue={100}
              text={`${predictedAge}`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: `rgba(129, 140, 248, ${confidence})`,
                textColor: '#1F2937',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <p className="text-lg font-semibold text-gray-900">Predicted Age</p>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4">
            <CircularProgressbar
              value={confidence * 100}
              text={`${Math.round(confidence * 100)}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: '#8B5CF6',
                textColor: '#1F2937',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <p className="text-lg font-semibold text-gray-900">Confidence</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultCard;