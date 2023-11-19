import * as z from "zod";
import { jsonGenerator, uploadDirectoryToIpfs } from "@/lib/utils";
import { TaskTypes } from "@/types/constants";

const hasFileAPI = typeof File !== 'undefined';

export const objectDetectionPipelineFormSchema = z.object({
  image: hasFileAPI ? z.instanceof(File) : z.any()});

export async function onObjectDetectionPipelineFormSubmit(
    data: z.infer<typeof objectDetectionPipelineFormSchema>
) {
    try {
      const resultJson = jsonGenerator(TaskTypes.OBJECT_DETECTION, [
        { type: 'image', path: `files/${data.image.name}` }
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