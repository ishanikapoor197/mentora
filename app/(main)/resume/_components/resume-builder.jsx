

"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

import dynamic from "next/dynamic";
const PDFDownloadLink = dynamic(
  () =>
    import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

import ResumePDF from "./ResumePDF";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const [resumeMode, setResumeMode] = useState("preview");

  const { user } = useUser();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {
        email: "",
        mobile: "",
        linkedin: "",
        twitter: "",
        github:"",
      },
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const formValues = watch();

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent || initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) toast.success("Resume saved successfully!");
    if (saveError)
      toast.error(saveError.message || "Failed to save resume");
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];

    if (contactInfo.email) parts.push(`Email: ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`Phone: ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`LinkedIn: ${contactInfo.linkedin}`);
    if (contactInfo.twitter)
      parts.push(`Twitter: ${contactInfo.twitter}`);
    if (contactInfo.github)
      parts.push(`Github: ${contactInfo.github}`);

    return parts.length
      ? `## <div align="center">${user?.fullName || ""}</div>

<div align="center">
${parts.join(" | ")}
</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;

    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const resumeData = {
    fullName: user?.fullName || "",
    email: formValues.contactInfo?.email || "",
    mobile: formValues.contactInfo?.mobile || "",
    linkedin: formValues.contactInfo?.linkedin || "",
    twitter: formValues.contactInfo?.twitter || "",
    github: formValues.contactInfo?.github || "",
    summary: formValues.summary || "",
    skills: formValues.skills || "",
    experience: formValues.experience || [],
    education: formValues.education || [],
    projects: formValues.projects || [],
  };

  const onSubmit = async () => {
    await saveResumeFn(previewContent);
  };

  return (
    <div data-color-mode="light" className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>

        <div className="space-x-2">
          <Button onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
            Save
          </Button>

          <PDFDownloadLink
            document={<ResumePDF data={resumeData} />}
            fileName="resume.pdf"
          >
            {({ loading }) => (
              <Button disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Download />}
                Download PDF
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form className="space-y-8">

            <div className="space-y-4">
  <h3 className="text-lg font-medium">Contact Information</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">

    {/* Email */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Email</label>
      <Input
        {...register("contactInfo.email")}
        type="email"
        placeholder="your@email.com"
      />
    </div>

    {/* Mobile */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Mobile Number</label>
      <Input
        {...register("contactInfo.mobile")}
        type="tel"
        placeholder="+91 000 000 0000"
      />
    </div>

    {/* LinkedIn */}
    <div className="space-y-1">
      <label className="text-sm font-medium">LinkedIn URL</label>
      <Input
        {...register("contactInfo.linkedin")}
        type="url"
        placeholder="https://linkedin.com/in/your-profile"
      />
    </div>

    {/* Twitter */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Twitter/X Profile</label>
      <Input
        {...register("contactInfo.twitter")}
        type="url"
        placeholder="https://twitter.com/your-handle"
      />
    </div>

    {/* Github */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Github Profile</label>
      <Input
        {...register("contactInfo.github")}
        type="url"
        placeholder="https://github.com"
      />
    </div>

  </div>
</div>


            {/* Professional Summary */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Professional Summary
              </label>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Write a compelling professional summary..."
                  />
                )}
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="List your key skills..."
                  />
                )}
              />
            </div>

            {/* Work Experience */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Work Experience
              </label>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Education */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Education</label>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Projects */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Projects</label>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

          </form>
        </TabsContent>

      

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}
         
            <div className="border rounded-lg bg-background p-6">
  <MDEditor
    value={previewContent}
    onChange={setPreviewContent}
    height={800}
    preview={resumeMode}
    data-color-mode="dark"
  />


          </div>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}





