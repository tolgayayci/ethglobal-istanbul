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
  tokenClassificationPipelineFormSchema,
  onTokenClassificationPipelineFormSubmit,
} from "@/components/natural_language_processing/forms/tokenClassificationPipeline";

import { TaskTypes } from "@/types/constants";
import { AlertDestructive } from "@/components/common/alert-destructive";
import { AlertSuccess } from "@/components/common/alert-success";

export default function TokenClassificationPipeline() {
  const tokenClassificationPipelineForm = useForm<
    z.infer<typeof tokenClassificationPipelineFormSchema>
  >({
    resolver: zodResolver(tokenClassificationPipelineFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cid, setCid] = useState<string>();

  const handleSubmit = async (data: any) => {
    setIsLoading(true); // Set loading to true when submission starts
    try {
      const cid = await onTokenClassificationPipelineFormSubmit(data);
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
      title="Token Classification Pipeline"
      badge={TaskTypes.TOKEN_CLASSIFICATION}
    >
      <Form {...tokenClassificationPipelineForm}>
        <form
          onSubmit={tokenClassificationPipelineForm.handleSubmit(handleSubmit)}
        >
          {tokenClassificationPipelineForm.formState.isSubmitSuccessful && (
            <AlertSuccess
              message={`Your text has been successfully uploaded! `}
              link={cid ? cid : "cid-error"}
            />
          )}
          {!tokenClassificationPipelineForm.formState.isSubmitSuccessful &&
          !tokenClassificationPipelineForm.formState.isDirty ? (
            <AlertDestructive
              message={"There has been an error. Please try again."}
            />
          ) : null}
          <div className="space-y-2">
            <FormField
              control={tokenClassificationPipelineForm.control}
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
      {tokenClassificationPipelineForm.formState.isSubmitSuccessful && (
        <h3>Show the lilypad output at this section</h3>
      )}
    </CardLayout>
  );
}
