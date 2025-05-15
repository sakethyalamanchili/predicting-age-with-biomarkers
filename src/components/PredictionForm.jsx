import React, { useState } from 'react';
import { motion } from 'framer-motion';

const formFields = [
  { name: 'height', label: 'Height (cm)', type: 'number', min: 100, max: 250, icon: '📏' },
  { name: 'weight', label: 'Weight (kg)', type: 'number', min: 30, max: 200, icon: '⚖️' },
  { name: 'bmi', label: 'BMI', type: 'number', min: 15, max: 45, icon: '📊' },
  { name: 'bloodPressureSystolic', label: 'Blood Pressure Systolic', type: 'number', min: 80, max: 200, icon: '❤️' },
  { name: 'bloodPressureDiastolic', label: 'Blood Pressure Diastolic', type: 'number', min: 50, max: 120, icon: '💓' },
  { name: 'cholesterol', label: 'Cholesterol Level', type: 'number', min: 100, max: 300, icon: '🔬' },
  { name: 'glucose', label: 'Blood Glucose Level', type: 'number', min: 70, max: 200, icon: '🩸' },
  { name: 'boneDensity', label: 'Bone Density', type: 'number', min: 0.5, max: 1.5, icon: '🦴' },
  { name: 'sleepHours', label: 'Sleep Hours', type: 'number', min: 4, max: 12, icon: '😴' },
  { name: 'stressLevel', label: 'Stress Level (1-10)', type: 'number', min: 1, max: 10, icon: '😰' },
];

function PredictionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
      <div className="grid grid-cols-1 gap-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative transform transition-all duration-200 ease-in-out ${
              focusedField === field.name ? 'scale-105' : ''
            }`}
          >
            <label className="block text-lg font-medium text-gray-200 mb-2">
              {field.icon} {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              min={field.min}
              max={field.max}
              step="any"
              required
              onChange={handleChange}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </motion.div>
        ))}
        <motion.button
          type="submit"
          disabled={loading}
          className={`mt-8 w-full flex justify-center py-4 px-6 border border-transparent rounded-xl text-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin mr-3 h-6 w-6 border-3 border-white border-t-transparent rounded-full"></div>
              Analyzing...
            </div>
          ) : (
            'Predict Age'
          )}
        </motion.button>
      </div>
    </form>
  );
}

export default PredictionForm;