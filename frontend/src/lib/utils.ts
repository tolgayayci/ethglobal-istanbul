import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PipelineData } from "@/types/general";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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