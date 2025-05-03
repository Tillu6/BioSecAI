import tensorflow as tf
import numpy as np

_loaded = None

def load_model(path='models/emotion_model.h5'):
    global _loaded
    if _loaded is None:
        _loaded = tf.keras.models.load_model(path)
    return _loaded

def predict_emotion(features):
    model = load_model()
    probs = model.predict(np.expand_dims(features, 0))[0]
    label = np.argmax(probs)
    return { 'label': int(label), 'confidence': float(probs[label]) }