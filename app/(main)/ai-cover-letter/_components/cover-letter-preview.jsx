
"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { pdf, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { toast } from "sonner";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.6,
  },
});


const CoverLetterPDF = ({ content }) => {
  const cleanContent = content
    .replace(/```markdown/g, "")
    .replace(/```/g, "")
    .trim();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {cleanContent.split("\n").map((line, i) => (
          <Text key={i}>{line}</Text>
        ))}
      </Page>
    </Document>
  );
};


const CoverLetterPreview = ({ content }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const blob = await pdf(
        <CoverLetterPDF content={content} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cover-letter.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="py-4 space-y-4">

      {/* Download Button */}
      <div className="flex justify-end">
        <Button onClick={handleDownload} disabled={downloading}>
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* Existing Preview (unchanged) */}
      <MDEditor value={content} preview="preview" height={700} />

    </div>
  );
};

export default CoverLetterPreview;
