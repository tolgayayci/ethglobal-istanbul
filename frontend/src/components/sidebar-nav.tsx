"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { parseAndSplitCamelCase } from "@/lib/utils";
import pipelineData from "@/data/hugging_face_pipelines.json";
import { FileAudio, Camera, GitBranch, TextIcon } from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  const parsedJson = parseAndSplitCamelCase(pipelineData);

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4 border-l-2">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Audio
          </h2>
          <div className="space-y-1 p-2">
            <ScrollArea>
              {parsedJson?.audio.map((pipeline, i) => (
                <Link
                  key={i}
                  href={`/audio/${pipeline.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[13px]"
                  >
                    <FileAudio className="mr-2 h-4 w-4" />
                    {pipeline}
                  </Button>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Computer Vision
          </h2>
          <div className="space-y-1 p-2">
            {parsedJson?.computer_vision.map((pipeline, i) => (
              <Link
                key={i}
                href={`/computer-vision/${pipeline
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[13px]"
                  key={i}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {pipeline}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Natural Language Processing
          </h2>
          <ScrollArea>
            <div className="space-y-1 p-2">
              {parsedJson?.natural_language_processing.map((pipeline, i) => (
                <Link
                  key={i}
                  href={`/natural-language-processing/${pipeline
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[13px]"
                    key={i}
                  >
                    <TextIcon className="mr-2 h-4 w-4" />
                    {pipeline}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Multimodal
          </h2>
          <ScrollArea>
            <div className="space-y-1 p-2">
              {parsedJson?.multimodal.map((pipeline, i) => (
                <Link
                  key={i}
                  href={`/multimodel/${pipeline
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[13px]"
                    key={i}
                  >
                    <GitBranch className="mr-2 h-4 w-4" />
                    {pipeline}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
