import * as z from "zod";
import { jsonGenerator, uploadDirectoryToIpfs } from "@/lib/utils";
import { TaskTypes } from "@/types/constants";

export const fillMaskPipelineFormSchema = z.object({
  user_input: z.string(),
});

export async function onFillMaskPipelineFormSubmit(
  data: z.infer<typeof fillMaskPipelineFormSchema>
) {
  try {
    const resultJson = jsonGenerator(TaskTypes.FILL_MASK, [
      { type: "text", path: `files/text.txt` },
    ]);

    let blob = new Blob([data.user_input], { type: "text/plain" });

    //TODO: Add logic to upload data to w3 storage and send to cid backend api
    const files = [
      new File([resultJson], "files/format.json"),
      new File([blob], "files/" + "text.txt"),
    ];

    return await uploadDirectoryToIpfs(files);

    //TODO: Add logic to send cid to backend api
  } catch (error) {
    console.error(`Error: ${error}`); // log error
  }
}
