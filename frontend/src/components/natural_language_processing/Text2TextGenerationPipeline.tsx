"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// ** Form Related Imports
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import CardLayout from "@/components/common/card-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  text2TextGenerationPipelineFormSchema,
  onText2TextGenerationPipelineFormSubmit,
} from "@/components/natural_language_processing/forms/text2TextGenerationPipeline";

import { TaskTypes } from "@/types/constants";
import { AlertDestructive } from "@/components/common/alert-destructive";
import { AlertSuccess } from "@/components/common/alert-success";

export default function Text2TextGenerationPipeline() {
  const text2TextGenerationPipelineForm = useForm<
    z.infer<typeof text2TextGenerationPipelineFormSchema>
  >({
    resolver: zodResolver(text2TextGenerationPipelineFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cid, setCid] = useState<string>();

  const handleSubmit = async (data: any) => {
    setIsLoading(true); // Set loading to true when submission starts
    try {
      const cid = await onText2TextGenerationPipelineFormSubmit(data);
      // Handle successful submission
      setCid(cid);
    } catch (error) {
      // Handle errors if needed
    } finally {
      setIsLoading(false); // Reset loading state whether success or fail
    }
  };

  return (
    <CardLayout
      title="Text 2 Text Generation Pipeline"
      badge={TaskTypes.TEXT2TEXT_GENERATION}
    >
      <Form {...text2TextGenerationPipelineForm}>
        <form
          onSubmit={text2TextGenerationPipelineForm.handleSubmit(handleSubmit)}
        >
          {text2TextGenerationPipelineForm.formState.isSubmitSuccessful && (
            <AlertSuccess
              message={`Your text has been successfully uploaded! `}
              link={cid ? cid : "cid-error"}
            />
          )}
          {!text2TextGenerationPipelineForm.formState.isSubmitSuccessful &&
          !text2TextGenerationPipelineForm.formState.isDirty ? (
            <AlertDestructive
              message={"There has been an error. Please try again."}
            />
          ) : null}
          <div className="space-y-2">
            <FormField
              control={text2TextGenerationPipelineForm.control}
              name="user_input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-small">Write Your Input</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-full"
                      placeholder="We will analyze your input and give you the model's output"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-3 flex justify-end pt-3">
              <Button
                type="reset"
                variant="outline"
                onClick={() => console.log("reset")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="animate-spin mr-2" size={18} />
                )}
                {isLoading ? "Loading..." : "Create"}{" "}
              </Button>
            </div>
          </div>
          <div></div>
        </form>
      </Form>
      {text2TextGenerationPipelineForm.formState.isSubmitSuccessful && (
        <h3>Show the lilypad output at this section</h3>
      )}
    </CardLayout>
  );
}
