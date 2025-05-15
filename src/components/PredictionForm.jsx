import React, { useState } from 'react';
import { motion } from 'framer-motion';

const formFields = [
  { name: 'height', label: 'Height (cm)', type: 'number', min: 100, max: 250 },
  { name: 'weight', label: 'Weight (kg)', type: 'number', min: 30, max: 200 },
  { name: 'bmi', label: 'BMI', type: 'number', min: 15, max: 45 },
  { name: 'bloodPressureSystolic', label: 'Blood Pressure Systolic', type: 'number', min: 80, max: 200 },
  { name: 'bloodPressureDiastolic', label: 'Blood Pressure Diastolic', type: 'number', min: 50, max: 120 },
  { name: 'cholesterol', label: 'Cholesterol Level', type: 'number', min: 100, max: 300 },
  { name: 'glucose', label: 'Blood Glucose Level', type: 'number', min: 70, max: 200 },
  { name: 'boneDensity', label: 'Bone Density', type: 'number', min: 0.5, max: 1.5 },
  { name: 'sleepHours', label: 'Sleep Hours', type: 'number', min: 4, max: 12 },
  { name: 'stressLevel', label: 'Stress Level (1-10)', type: 'number', min: 1, max: 10 },
];

function PredictionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({});

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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 gap-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              min={field.min}
              max={field.max}
              step="any"
              required
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </motion.div>
        ))}
        <motion.button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Predicting...' : 'Predict Age'}
        </motion.button>
      </div>
    </form>
  );
}

export default PredictionForm;