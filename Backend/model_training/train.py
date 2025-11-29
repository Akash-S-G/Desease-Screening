"""
Minimal training skeleton using TensorFlow/Keras and MobileNetV2.

This is a starter script showing how to set up transfer learning for the
multi-class classification tasks. You will need to prepare a folder structure like:

data/tongue/train/<class folders>/images
data/tongue/val/<class folders>/images

data/nail/train/<class folders>/images
data/nail/val/<class folders>/images

data/ankle/train/<class folders>/images
data/ankle/val/<class folders>/images

data/foot/train/<class folders>/images
data/foot/val/<class folders>/images

Categories:
- Tongue: Normal Tongue, Coated Tongue, Geographic Tongue
- Nail: Healthy Nail, Fungal Infection, Nail Discoloration / Iron Deficiency
- Ankle: Healthy Ankle, Ankle Swelling, Skin Inflammation
- Foot: Healthy Foot, Fungal Foot Infection, Foot Callus / Corn

Run and modify as needed. This is a minimal example — tune hyperparams
and augmentation for production.
"""

import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os


def build_model(num_classes):
    base = MobileNetV2(include_top=False, input_shape=(224,224,3), weights='imagenet')
    base.trainable = False
    x = layers.GlobalAveragePooling2D()(base.output)
    x = layers.Dropout(0.3)(x)
    out = layers.Dense(num_classes, activation='softmax')(x)
    model = models.Model(base.input, out)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model


def train(data_dir, output_path, num_classes=3, epochs=5, batch_size=16):
    train_dir = os.path.join(data_dir, 'train')
    val_dir = os.path.join(data_dir, 'val')

    train_datagen = ImageDataGenerator(rescale=1./255, horizontal_flip=True, rotation_range=10)
    val_datagen = ImageDataGenerator(rescale=1./255)

    train_gen = train_datagen.flow_from_directory(train_dir, target_size=(224,224), batch_size=batch_size, class_mode='categorical')
    val_gen = val_datagen.flow_from_directory(val_dir, target_size=(224,224), batch_size=batch_size, class_mode='categorical')

    model = build_model(num_classes)
    model.fit(train_gen, validation_data=val_gen, epochs=epochs)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    model.save(output_path)
    print('Saved model to', output_path)


if __name__ == '__main__':
    # Example usage: train tongue model
    # train('data/tongue', 'flask_app/models/tongue_model.h5', num_classes=3, epochs=10)
    pass
