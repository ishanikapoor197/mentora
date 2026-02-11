"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

const PDFDownloadLink = dynamic(
  () =>
    import("@react-pdf/renderer").then(
      (mod) => mod.PDFDownloadLink
    ),
  { ssr: false }
);

export default function PdfDownloadButton({ document }) {
  return (
    <PDFDownloadLink document={document} fileName="resume.pdf">
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
