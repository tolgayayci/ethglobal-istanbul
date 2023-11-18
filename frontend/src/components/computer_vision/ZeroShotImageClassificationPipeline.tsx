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
  zeroShotImageClassificationPipelineFormSchema,
  onZeroShotImageClassificationPipelineFormSubmit,
} from "@/components/computer_vision/forms/zeroShotImageClassificationPipeline";

import { TaskTypes } from "@/types/constants";
import { AlertDestructive } from "@/components/common/alert-destructive";
import { AlertSuccess } from "../common/alert-success";

export default function ZeroShotImageClassificationPipeline() {
  const zeroShotImageClassificationPipelineForm = useForm<
    z.infer<typeof zeroShotImageClassificationPipelineFormSchema>
  >({
    resolver: zodResolver(zeroShotImageClassificationPipelineFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cid, setCid] = useState<string>();

  // Custom onChange handler for file input
  const handleFileChange = (event: any, field: any) => {
    const file = event.target.files[0];
    if (file) {
      field.onChange(file);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true); // Set loading to true when submission starts
    try {
      const cid = await onZeroShotImageClassificationPipelineFormSubmit(data);
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
      title="Zero Shot Image Classification Pipeline"
      badge={TaskTypes.OBJECT_DETECTION}
    >
      <Form {...zeroShotImageClassificationPipelineForm}>
        <form
          onSubmit={zeroShotImageClassificationPipelineForm.handleSubmit(
            handleSubmit
          )}
        >
          {zeroShotImageClassificationPipelineForm.formState
            .isSubmitSuccessful && (
            <AlertSuccess
              message={`Your image has been successfully uploaded! `}
              link={cid ? cid : "cid-error"}
            />
          )}
          {!zeroShotImageClassificationPipelineForm.formState
            .isSubmitSuccessful &&
          !zeroShotImageClassificationPipelineForm.formState.isDirty ? (
            <AlertDestructive
              message={"There has been an error. Please try again."}
            />
          ) : null}
          <div className="space-y-2">
            <FormField
              control={zeroShotImageClassificationPipelineForm.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-small">
                    Upload Your Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => handleFileChange(e, field)}
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
      {zeroShotImageClassificationPipelineForm.formState.isSubmitSuccessful && (
        <h3>Show the lilypad output at this section</h3>
      )}
    </CardLayout>
  );
}
