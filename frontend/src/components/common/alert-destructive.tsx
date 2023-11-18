import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive(props: any) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>There has been an error!</AlertTitle>
      <AlertDescription>
        {props.message ? props.message : "Please try again."}
      </AlertDescription>
    </Alert>
  );
}
