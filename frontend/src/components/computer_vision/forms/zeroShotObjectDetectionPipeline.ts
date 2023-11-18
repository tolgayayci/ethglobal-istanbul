import * as z from "zod";
import { jsonGenerator, uploadDirectoryToIpfs } from "@/lib/utils";
import { TaskTypes } from "@/types/constants";

const hasFileAPI = typeof File !== 'undefined';

export const zeroShotObjectDetectionPipelineFormSchema = z.object({
  image: hasFileAPI ? z.instanceof(File) : z.any()});

export async function onZeroShotObjectDetectionPipelineFormSubmit(
    data: z.infer<typeof zeroShotObjectDetectionPipelineFormSchema>
) {
    try {
      const resultJson = jsonGenerator(TaskTypes.ZERO_SHOT_OBJECT_DETECTION, [
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