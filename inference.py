import json
from transformers import pipeline
import logging
import os
from enum import Enum


logging.info("STARTING INFERENCE SCRIPT")

class TaskType(Enum):
    AUDIO_CLASSIFICATION = "AUDIO-CLASSIFICATION",
    AUTOMATIC_SPEECH_RECOGNITION = "AUTOMATIC-SPEECH-RECOGNITION",
    CONVERSATIONAL = "CONVERSATIONAL",
    DEPTH_ESTIMATION = "DEPTH-ESTIMATION",
    DOCUMENT_QUESTION_ANSWERING = "DOCUMENT-QUESTION-ANSWERING",
    FEATURE_EXTRACTION = "FEATURE-EXTRACTION",
    FILL_MASK = "FILL-MASK",
    IMAGE_CLASSIFICATION = "IMAGE-CLASSIFICATION",
    IMAGE_SEGMENTATION = "IMAGE-SEGMENTATION",
    IMAGE_TO_IMAGE = "IMAGE-TO-IMAGE",
    IMAGE_TO_TEXT = "IMAGE-TO-TEXT",
    MASK_GENERATION = "MASK-GENERATION",
    OBJECT_DETECTION = "OBJECT-DETECTION",
    QUESTION_ANSWERING = "QUESTION-ANSWERING",
    SUMMARIZATION = "SUMMARIZATION",
    TABLE_QUESTION_ANSWERING = "TABLE-QUESTION-ANSWERING",
    TEXT2TEXT_GENERATION = "TEXT2TEXT-GENERATION",
    TEXT_CLASSIFICATION = "TEXT-CLASSIFICATION",
    TEXT_GENERATION = "TEXT-GENERATION",
    TEXT_TO_AUDIO = "TEXT-TO-AUDIO",
    TOKEN_CLASSIFICATION  = "TOKEN-CLASSIFICATION",
    TRANSLATION  = "TRANSLATION",
    TRANSLATION_XX_TO_YY = "TRANSLATION-XX-TO-YY",
    VIDEO_CLASSIFICATION = "VIDEO-CLASSIFICATION",
    VISUAL_QUESTION_ANSWERING = "VISUAL-QUESTION-ANSWERING",
    ZERO_SHOT_CLASSIFICATION = "ZERO-SHOT-CLASSIFICATION",
    ZERO_SHOT_IMAGE_CLASSIFICATION = "ZERO-SHOT-IMAGE-CLASSIFICATION",
    ZERO_SHOT_AUDIO_CLASSIFICATION = "ZERO-SHOT-AUDIO-CLASSIFICATION",
    ZERO_SHOT_OBJECT_DETECTION = "ZERO-SHOT-OBJECT-DETECTION"

# read from env variables
print(os.getenv('FilesCID', 'xxx'))

def read_from_text_file(file_path):
    try:
        with open(file_path, 'r') as file:
            text = file.read()
    except IOError:
        logging.error(f"File not found or unable to read file at {file_path}")
    return text

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
    logging.error(f"Unable to read format.json file at {json_file_path}")


# Extract the task type
task_type =  data['task'].upper()
if task_type not in TaskType.value:
    logging.error(f"Task type {task_type} is not supported")
    raise ValueError(f"Task type {task_type} is not supported")

# Initialize the pipeline based on the task type
if task_type == TaskType.IMAGE_CLASSIFICATION.value:
    pipe = pipeline(TaskType.IMAGE_CLASSIFICATION.value)
    # Process the files
    items = []
    for file_info in data['files']:
        if file_info['type'] == 'image':
            image_path = file_info['path']
            items.append(image_path)
    response = pipe(items)
    with open('/outputs/response.json', 'w') as response_file:
        response_file.write(response)

            
elif task_type == TaskType.SUMMARIZATION.value:
    pipe = pipeline(TaskType.SUMMARIZATION.value)
    # Process the files
    items = []
    for file_info in data['files']:
        if file_info['type'] == 'text':
            text_path = file_info['path']
            text = read_from_text_file(text_path)
            items.append(text)
    response = pipe(items)
    with open('/outputs/response.txt', 'w') as response_file:
        response_file.write(response)