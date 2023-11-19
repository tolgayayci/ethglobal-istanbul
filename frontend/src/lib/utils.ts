import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PipelineData } from "@/types/general";
import { create } from '@web3-storage/w3up-client'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//to create navbar and page components from a json file
export function parseAndSplitCamelCase(jsonData: PipelineData) {
  function splitCamelCase(string: string): string {
    return string.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  }

  const parsedData: PipelineData = {};

  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      parsedData[key] = jsonData[key].map(item => splitCamelCase(item));
    }
  }

  return parsedData;
}

export function jsonGenerator(taskName: string, items: any) {
  // Construct the JSON structure
  const jsonData = {
    task: taskName,
    files: items.map((item: any) => {
        return { type: item.type, path: item.path };
    })
  };

  // Convert to JSON string
  const jsonString = JSON.stringify(jsonData, null, 2); // Pretty print with 2-space indentation

  // Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: 'application/json' });

  return blob
}

export async function uploadDirectoryToIpfs(files: any) {

  const client = await create()
  
  await client.login("tolga@yk-labs.com")
  
  client.setCurrentSpace("did:key:z6Mkt86eNugd3nuycmCDByfaRaXmQQFh62Sn5QmdDY4Sa8dN")

  const directoryCid = await client.uploadDirectory(files)

  return directoryCid.toString()
}