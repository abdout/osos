import Link from "next/link"
import { IconPackageOff, IconArrowLeft } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export default function TrackingNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <IconPackageOff className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Shipment Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The tracking number you entered could not be found. Please check and try again.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">
              <IconArrowLeft className="me-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
