import { AlertCircle } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertSuccess(props: any) {
  return (
    <Alert variant="success" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        {props.message ? props.message : "Please try again."}
        {props.link ? (
          <Link href={`https://${props.link}.ipfs.w3s.link/`} target="_blank">
            Here is your cid: https://{props.link}.ipfs.w3s.link/
          </Link>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
