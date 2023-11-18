import * as z from "zod";
import { jsonGenerator, uploadDirectoryToIpfs } from "@/lib/utils";
import { TaskTypes } from "@/types/constants";

const hasFileAPI = typeof File !== 'undefined';

export const zeroShotImageClassificationPipelineFormSchema = z.object({
  image: hasFileAPI ? z.instanceof(File) : z.any()});

export async function onZeroShotImageClassificationPipelineFormSubmit(
    data: z.infer<typeof zeroShotImageClassificationPipelineFormSchema>
) {
    try {
      const resultJson = jsonGenerator(TaskTypes.ZERO_SHOT_IMAGE_CLASSIFICATION, [
        { type: 'image', value: `files/${data.image.name}` }
      ])

     //TODO: Add logic to upload data to w3 storage and send to cid backend api
      const files = [
        new File([resultJson], 'files/format.json'),
        new File([data.image], 'files/' + data.image.name),
      ]

      return await uploadDirectoryToIpfs(files)

      //TODO: Add logic to send cid to backend api

    } catch (error) {
      console.error(`Error: ${error}`); // log error
    }
} 