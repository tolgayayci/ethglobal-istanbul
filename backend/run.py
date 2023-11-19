import subprocess
import os
from enum import Enum
from dotenv import load_dotenv

load_dotenv()

class TaskType(Enum):
    AUDIO_CLASSIFICATION = "AUDIO-CLASSIFICATION"
    AUTOMATIC_SPEECH_RECOGNITION = "AUTOMATIC-SPEECH-RECOGNITION"
    CONVERSATIONAL = "CONVERSATIONAL"
    DEPTH_ESTIMATION = "DEPTH-ESTIMATION"
    DOCUMENT_QUESTION_ANSWERING = "DOCUMENT-QUESTION-ANSWERING"
    FEATURE_EXTRACTION = "FEATURE-EXTRACTION"
    FILL_MASK = "FILL-MASK"
    IMAGE_CLASSIFICATION = "IMAGE-CLASSIFICATION"
    IMAGE_SEGMENTATION = "IMAGE-SEGMENTATION"
    IMAGE_TO_IMAGE = "IMAGE-TO-IMAGE"
    IMAGE_TO_TEXT = "IMAGE-TO-TEXT"
    MASK_GENERATION = "MASK-GENERATION"
    OBJECT_DETECTION = "OBJECT-DETECTION"
    QUESTION_ANSWERING = "QUESTION-ANSWERING"
    SUMMARIZATION = "SUMMARIZATION"
    TABLE_QUESTION_ANSWERING = "TABLE-QUESTION-ANSWERING"
    TEXT2TEXT_GENERATION = "TEXT2TEXT-GENERATION"
    TEXT_CLASSIFICATION = "TEXT-CLASSIFICATION"
    TEXT_GENERATION = "TEXT-GENERATION"
    TEXT_TO_AUDIO = "TEXT-TO-AUDIO"
    TOKEN_CLASSIFICATION = "TOKEN-CLASSIFICATION"
    TRANSLATION = "TRANSLATION"
    TRANSLATION_XX_TO_YY = "TRANSLATION-XX-TO-YY"
    VIDEO_CLASSIFICATION = "VIDEO-CLASSIFICATION"
    VISUAL_QUESTION_ANSWERING = "VISUAL-QUESTION-ANSWERING"
    ZERO_SHOT_CLASSIFICATION = "ZERO-SHOT-CLASSIFICATION"
    ZERO_SHOT_IMAGE_CLASSIFICATION = "ZERO-SHOT-IMAGE-CLASSIFICATION"
    ZERO_SHOT_AUDIO_CLASSIFICATION = "ZERO-SHOT-AUDIO-CLASSIFICATION"
    ZERO_SHOT_OBJECT_DETECTION = "ZERO-SHOT-OBJECT-DETECTION"


MODULE_FILE = "github.com/tolgayayci/lilypad-module"
MODULE_TAG = "v0.0.15"


def run_lilypad(cid):# -> dict[str, str] | dict[str, Any]:
    # Define the command
    command = f'lilypad run {MODULE_FILE}:{MODULE_TAG} -i FilesCID="FilesCID={cid}" --web3-private-key={os.getenv("WEB3_PRIVATE_KEY")}'

    # Run the command and capture output
    result = subprocess.run(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
    )
    print(result)

    # Parse the output to find the response_cid_path
    for line in result.stdout.splitlines():
        if "open" in line:
            response_cid_path = line.split()[1]
            break
    else:
        return {
            "status": "failed",
            "response": "Could not find response CID path in output",
        }

    # Read exitCode
    try:
        with open(os.path.join(response_cid_path, "exitCode")) as f:
            exit_code = int(f.read().strip())
    except FileNotFoundError:
        return {"status": "failed", "response": "exitCode file not found"}

    # Determine success or failure
    if exit_code == 1:
        try:
            with open(os.path.join(response_cid_path, "stderr")) as f:
                stderr_content = f.read()
            return {"status": "failed", "response": stderr_content}
        except FileNotFoundError:
            return {"status": "failed", "response": "stderr file not found"}
    else:
        return {"status": "success", "path": os.path.join(response_cid_path, "output")}


def read_from_text_file(file_path):
    try:
        with open(file_path, "r") as file:
            text = file.read()
    except IOError:
        raise Exception(f"File not found or unable to read file at {file_path}")
    return text


def handle_output(task_type, response):
    if task_type == TaskType.SUMMARIZATION.value:
        return read_from_text_file(os.path.join(response["path"], "response.txt"))
