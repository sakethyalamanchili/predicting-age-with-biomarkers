import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const featureImportance = [
  { feature: 'Bone Density', importance: 0.85 },
  { feature: 'BMI', importance: 0.75 },
  { feature: 'Blood Glucose', importance: 0.70 },
  { feature: 'Cognitive Function', importance: 0.65 },
  { feature: 'Cholesterol', importance: 0.60 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
        <p className="text-gray-200">{`${payload[0].payload.feature}: ${(payload[0].value * 100).toFixed(1)}%`}</p>
      </div>
    );
  }
  return null;
};

function FeatureImportance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-white mb-8">Feature Importance</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={featureImportance}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 1]} stroke="#fff" />
            <YAxis dataKey="feature" type="category" stroke="#fff" />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="importance"
              fill="url(#colorGradient)"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default FeatureImportance;