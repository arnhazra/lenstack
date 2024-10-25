"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Not Found</CardTitle>
          <CardDescription>
            Seems like there is nothing what you are looking for
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            size="lg"
            className="w-full"
            onClick={(): void => router.push("/dashboard")}
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
