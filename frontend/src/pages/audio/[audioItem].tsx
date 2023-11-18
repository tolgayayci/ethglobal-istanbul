import { GetStaticPaths, GetStaticProps } from "next";
import pipelineData from "@/data/hugging_face_pipelines.json";
import { parseAndSplitCamelCase } from "@/lib/utils";

import AudioClassificationPipeline from "@/components/audio/AudioClassificationPipeline";
import AutomaticSpeechRecognitionPipeline from "@/components/audio/AutomaticSpeechRecognitionPipeline";
import TextToAudioPipeline from "@/components/audio/TextToAudioPipeline";
import ZeroShotAudioClassificationPipeline from "@/components/audio/ZeroShotAudioClassificationPipeline";

type AudioItemPageProps = {
  audioItem: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const parsedJson = parseAndSplitCamelCase(pipelineData);

  const paths = parsedJson.audio.map((item) => ({
    params: { audioItem: item.replace(/\s+/g, "-").toLowerCase() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Here you can add any additional data fetching logic if needed
  return { props: { audioItem: params?.audioItem } };
};

const AudioItemPage: React.FC<AudioItemPageProps> = ({ audioItem }) => {
  let ComponentToRender;

  console.log(audioItem);

  switch (audioItem) {
    case "audio-classification-pipeline":
      ComponentToRender = AudioClassificationPipeline;
      break;
    case "automatic-speech-recognition-pipeline":
      ComponentToRender = AutomaticSpeechRecognitionPipeline;
      break;
    case "text-to-audio-pipeline":
      ComponentToRender = TextToAudioPipeline;
      break;
    case "zero-shot-audio-classification-pipeline":
      ComponentToRender = ZeroShotAudioClassificationPipeline;
      break;
    // Add other cases for your components
    default:
      ComponentToRender = "not exist";
  }

  return (
    <div className="p-8">
      <ComponentToRender />
    </div>
  );
};

export default AudioItemPage;
