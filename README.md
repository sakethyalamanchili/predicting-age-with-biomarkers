# Predicting Human Age with Biomarkers

## 📌 Project Overview

This repository presents a complete machine learning pipeline designed to predict human age using a rich combination of biological, lifestyle, and environmental biomarkers. The central aim was to determine whether traditional regression models or deep learning architectures perform better on structured, tabular data. The dataset is sourced from the [Precision Health: Predicting Human Age with Biomarkers](https://www.kaggle.com/competitions/precision-health-predicting-human-age-with-biomark) Kaggle competition.

---

## 📂 Dataset

The dataset comprises anonymized medical and lifestyle data of individuals:

* **Train set** with 3000 samples and 26 features + target column `Age (years)`
* **Test set** with 3000 samples and the same features, but without the target

Feature domains include:

* **Physiological**: Height, Weight, BMI, Blood Pressure
* **Biochemical**: Cholesterol, Glucose, Bone Density
* **Lifestyle**: Diet, Smoking, Alcohol, Sleep
* **Mental & Cognitive**: Stress Levels, Cognitive Scores
* **Environmental**: Sun Exposure, Pollution Levels

---

## ⚙️ Pipeline Workflow

### 1. Data Cleaning

Missing values were visualized and imputed using the most frequent category per column. Feature `Blood Pressure (s/d)` was split into `Systolic` and `Diastolic` values, and gender was binary-encoded.

### 2. Outlier Detection & Removal

An IQR-based approach was applied only on the training data to detect and remove outliers, ensuring data leakage was avoided.

### 3. Feature Preprocessing

Separate pipelines were created for scaled and unscaled data. Scaled data was used for models like Ridge, SVR, and DNN, while unscaled data was passed to tree-based models such as Random Forest and XGBoost. Preprocessing pipelines were saved using joblib to ensure consistent application across datasets.

---

## 🔍 Exploratory Data Analysis

Exploratory analysis included visualizing distributions, identifying outliers using boxplots, and analyzing class imbalance in categorical features. This provided a strong foundation for understanding feature behavior and guided preprocessing strategies.

---

## 🤖 Traditional Machine Learning Models

Multiple regression models were evaluated. Some required feature scaling (e.g., Ridge, SVR) while others didn’t (e.g., Decision Trees, Boosting methods). Ridge Regression emerged as the best traditional model due to its strong performance and simplicity.

---

## 🧠 Deep Neural Networks (DNN)

Several DNN architectures were experimented with, varying in depth, dropout rates, optimizers (Adam, RMSProp), and learning rates. The best-performing architecture used the RMSProp optimizer with dropout and moderate depth. It slightly outperformed Ridge Regression in R² Score, demonstrating that neural networks can excel on tabular data when appropriately configured.

---

## 🔁 Model Comparison & Insights

A side-by-side comparison of Ridge Regression and RMSProp DNN showed almost identical performance. While Ridge is simpler and more interpretable, the DNN architecture provides flexibility and better adaptability to non-linearities, particularly in larger or more complex datasets.

---

## 🔍 Feature Importance

Using permutation importance on the DNN, top contributing features were identified. These included Bone Density, BMI, Blood Glucose Level, Cognitive Function, and Cholesterol Level — aligning well with medical expectations about aging.

---

## ✅ Final Model Deployment

Although Ridge Regression and the RMSProp DNN performed similarly, the DNN was selected for deployment due to its slight performance edge and potential scalability. The final model was saved and used to predict the age on the unseen test dataset.

```python
rmsprop_dnn_model = load_model("rmsprop_dnn_best_model.h5")
test_data = pd.read_csv("Test.csv")
X_test_scaled = preprocess_and_transform_scaled(test_data)
predictions = rmsprop_dnn_model.predict(X_test_scaled).round()
```

The predictions were saved in a `submission.csv` file.

---

## 🧾 Conclusion

This project demonstrates that both traditional machine learning and deep learning models can perform competitively on structured data. While Ridge Regression offers simplicity and speed, deep neural networks like the RMSProp model can match or surpass their performance when properly tuned. The belief that neural networks aren't suitable for tabular data is not always true—context, data size, and feature representation play crucial roles.

---

## 💼 Author

**Saketh Yalamanchili**
MS in Data Science & Analytics
Florida Atlantic University

---

## 📎 Acknowledgments

Gratitude to Kaggle and the organizers of the Precision Health competition for the valuable dataset.
