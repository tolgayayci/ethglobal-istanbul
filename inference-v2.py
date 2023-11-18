import json
from transformers import pipeline
import logging
import os

# Set up logging
log_file_path = '/outputs/execution.log'
os.makedirs(os.path.dirname(log_file_path), exist_ok=True)
logging.basicConfig(filename=log_file_path, level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')


# Path to the JSON file
json_file_path = '/input/format.json'

try:
    # Try to open and read the JSON file
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    logging.info('Successfully read JSON file')
    # Further processing here
except IOError:
    logging.error(f"File not found or unable to read file at {json_file_path}")


# Extract the task type
task_type = data['task']

# Initialize the pipeline based on the task type
if task_type == 'image_classification':
    classifier = pipeline('image-classification')
    # Process the files
    for file_info in data['files']:
        if file_info['type'] == 'image':
            image_path = file_info['path']
            # Here, add your logic to process the image with the classifier
            # For example: results = classifier(image_path)
elif task_type == 'text_classification':
    pass