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

function FeatureImportance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Importance</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={featureImportance}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 1]} />
            <YAxis dataKey="feature" type="category" />
            <Tooltip />
            <Bar
              dataKey="importance"
              fill="#8B5CF6"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default FeatureImportance;