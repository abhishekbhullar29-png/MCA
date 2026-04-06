import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Sample data
data = {
    'marks': [40, 50, 60, 70, 80, 90],
    'attendance': [50, 60, 70, 80, 90, 95],
    'grade': [4, 5, 6, 7, 8, 9]
}

df = pd.DataFrame(data)

X = df[['marks', 'attendance']]
y = df['grade']

model = LinearRegression()
model.fit(X, y)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("Model trained successfully!")