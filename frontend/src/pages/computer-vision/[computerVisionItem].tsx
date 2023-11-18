import { GetStaticPaths, GetStaticProps } from "next";
import pipelineData from "@/data/hugging_face_pipelines.json";
import { parseAndSplitCamelCase } from "@/lib/utils";

import DepthEstimationPipeline from "@/components/computer_vision/DepthEstimationPipeline";
import ImageClassificationPipeline from "@/components/computer_vision/ImageClassificationPipeline";
import ImageSegmentationPipeline from "@/components/computer_vision/ImageSegmentationPipeline";
import ImageToImagePipeline from "@/components/computer_vision/ImageToImagePipeline";
import ObjectDetectionPipeline from "@/components/computer_vision/ObjectDetectionPipeline";
import VideoClassificationPipeline from "@/components/computer_vision/VideoClassificationPipeline";
import ZeroShotImageClassificationPipeline from "@/components/computer_vision/ZeroShotImageClassificationPipeline";
import ZeroShotObjectDetectionPipeline from "@/components/computer_vision/ZeroShotObjectDetectionPipeline";

type ImageItemPageProps = {
  computerVisionItem: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const parsedJson = parseAndSplitCamelCase(pipelineData);

  const paths = parsedJson.computer_vision.map((item) => ({
    params: { computerVisionItem: item.replace(/\s+/g, "-").toLowerCase() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Here you can add any additional data fetching logic if needed
  return { props: { computerVisionItem: params?.computerVisionItem } };
};

const AudioItemPage: React.FC<ImageItemPageProps> = ({
  computerVisionItem,
}) => {
  let ComponentToRender;

  switch (computerVisionItem) {
    case "depth-estimation-pipeline":
      ComponentToRender = DepthEstimationPipeline;
      break;
    case "image-classification-pipeline":
      ComponentToRender = ImageClassificationPipeline;
      break;
    case "image-segmentation-pipeline":
      ComponentToRender = ImageSegmentationPipeline;
      break;
    case "image-to-image-pipeline":
      ComponentToRender = ImageToImagePipeline;
      break;
    case "object-detection-pipeline":
      ComponentToRender = ObjectDetectionPipeline;
      break;
    case "video-classification-pipeline":
      ComponentToRender = VideoClassificationPipeline;
      break;
    case "zero-shot-image-classification-pipeline":
      ComponentToRender = ZeroShotImageClassificationPipeline;
      break;
    case "zero-shot-object-detection-pipeline":
      ComponentToRender = ZeroShotObjectDetectionPipeline;
      break;
    // Add other cases for your components
    default:
      ComponentToRender = "not exist";
  }

  return <ComponentToRender />;
};

export default AudioItemPage;
