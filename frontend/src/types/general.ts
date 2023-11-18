export type PipelineData = {
    [category: string]: string[];
};

interface FileItem {
    type: string;
    value: string;
  }
  
export interface ApiJsonData {
    task: string;
    files: FileItem[];
}

export interface ITaskTypes {
    AUDIO_CLASSIFICATION: string;
    AUTOMATIC_SPEECH_RECOGNITION: string;
    CONVERSATIONAL: string;
    DEPTH_ESTIMATION: string;
    DOCUMENT_QUESTION_ANSWERING: string;
    FEATURE_EXTRACTION: string;
    FILL_MASK: string;
    IMAGE_CLASSIFICATION: string;
    IMAGE_SEGMENTATION: string;
    IMAGE_TO_IMAGE: string;
    IMAGE_TO_TEXT: string;
    MASK_GENERATION: string;
    OBJECT_DETECTION: string;
    QUESTION_ANSWERING: string;
    SUMMARIZATION: string;
    TABLE_QUESTION_ANSWERING: string;
    TEXT2TEXT_GENERATION: string;
    TEXT_CLASSIFICATION: string;
    TEXT_GENERATION: string;
    TEXT_TO_AUDIO: string;
    TOKEN_CLASSIFICATION: string;
    TRANSLATION: string;
    TRANSLATION_XX_TO_YY: string;
    VIDEO_CLASSIFICATION: string;
    VISUAL_QUESTION_ANSWERING: string;
    ZERO_SHOT_CLASSIFICATION: string;
    ZERO_SHOT_IMAGE_CLASSIFICATION: string;
    ZERO_SHOT_AUDIO_CLASSIFICATION: string;
    ZERO_SHOT_OBJECT_DETECTION: string;
}

  