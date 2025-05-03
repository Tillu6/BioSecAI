import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
# Placeholder: load your interaction dataset
# X_train: features, y_train: emotion labels
X_train = np.load('data/X_train.npy')
y_train = np.load('data/y_train.npy')

model = models.Sequential([
    layers.Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    layers.Dropout(0.3),
    layers.Dense(64, activation='relu'),
    layers.Dense(len(np.unique(y_train)), activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=20, batch_size=32)
model.save('models/emotion_model.h5')

print('Emotion model trained and saved.')