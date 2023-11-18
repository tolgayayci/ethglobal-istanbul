import { GetStaticPaths, GetStaticProps } from "next";
import pipelineData from "@/data/hugging_face_pipelines.json";
import { parseAndSplitCamelCase } from "@/lib/utils";

import ConversationalPipeline from "@/components/natural_language_processing/ConversationalPipeline";
import FillMaskPipeline from "@/components/natural_language_processing/FillMaskPipeline";
import NerPipeline from "@/components/natural_language_processing/NerPipeline";
import QuestionAnsweringPipeline from "@/components/natural_language_processing/QuestionAnsweringPipeline";
import SummarizationPipeline from "@/components/natural_language_processing/SummarizationPipeline";
import TableQuestionAnsweringPipeline from "@/components/natural_language_processing/TableQuestionAnsweringPipeline";
import Text2TextGenerationPipeline from "@/components/natural_language_processing/Text2TextGenerationPipeline";
import TextClassificationPipeline from "@/components/natural_language_processing/TextClassificationPipeline";
import TextGenerationPipeline from "@/components/natural_language_processing/TextGenerationPipeline";
import TokenClassificationPipeline from "@/components/natural_language_processing/TokenClassificationPipeline";
import TranslationPipeline from "@/components/natural_language_processing/TranslationPipeline";
import ZeroShotClassificationPipeline from "@/components/natural_language_processing/ZeroShotClassificationPipeline";

type NlpItemPageProps = {
  nlpItem: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const parsedJson = parseAndSplitCamelCase(pipelineData);

  const paths = parsedJson.natural_language_processing.map((item) => ({
    params: { nlpItem: item.replace(/\s+/g, "-").toLowerCase() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Here you can add any additional data fetching logic if needed
  return { props: { nlpItem: params?.nlpItem } };
};

const NlpItemPage: React.FC<NlpItemPageProps> = ({ nlpItem }) => {
  let ComponentToRender;

  switch (nlpItem) {
    case "conversational-pipeline":
      ComponentToRender = ConversationalPipeline;
      break;
    case "fill-mask-pipeline":
      ComponentToRender = FillMaskPipeline;
      break;
    case "ner-pipeline":
      ComponentToRender = NerPipeline;
      break;
    case "question-answering-pipeline":
      ComponentToRender = QuestionAnsweringPipeline;
      break;
    case "summarization-pipeline":
      ComponentToRender = SummarizationPipeline;
      break;
    case "table-question-answering-pipeline":
      ComponentToRender = TableQuestionAnsweringPipeline;
      break;
    case "text2text-generation-pipeline":
      ComponentToRender = Text2TextGenerationPipeline;
      break;
    case "text-classification-pipeline":
      ComponentToRender = TextClassificationPipeline;
      break;
    case "text-generation-pipeline":
      ComponentToRender = TextGenerationPipeline;
      break;
    case "token-classification-pipeline":
      ComponentToRender = TokenClassificationPipeline;
      break;
    case "translation-pipeline":
      ComponentToRender = TranslationPipeline;
      break;
    case "zero-shot-classification-pipeline":
      ComponentToRender = ZeroShotClassificationPipeline;
      break;
    // Add other cases for your components
    default:
      ComponentToRender = "not exist";
  }

  return <ComponentToRender />;
};

export default NlpItemPage;
