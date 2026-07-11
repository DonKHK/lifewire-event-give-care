"use client";

import { useState, useRef, useCallback } from "react";
import { ImagePlus, X, Upload, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setUploadSuccess(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    setCaption("");
    setUploadSuccess(false);
  }, []);

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    // TODO: Upload file to Supabase Storage
    // const fileExt = selectedFile.name.split('.').pop()
    // const fileName = `${Date.now()}.${fileExt}`
    // const { data, error } = await supabase.storage
    //   .from('photos')
    //   .upload(fileName, selectedFile)
    //
    // TODO: Save photo metadata to Supabase database
    // const { error: dbError } = await supabase.from('photos').insert({
    //   image_url: data?.path,
    //   caption,
    //   uploader_id: user.id,
    // })

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUploading(false);
    setUploadSuccess(true);
    removeFile();
  };

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-[#0d1a17] p-8 shadow-xl shadow-[#2A9D8F]/20">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex rounded-full bg-[#E8F5F3] dark:bg-[#1a3d38] p-3">
              <Heart className="h-6 w-6 text-[#2A9D8F]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1E293B] dark:text-gray-100 sm:text-3xl">
              上載相片
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
              分享你喺活動中捕捉嘅溫暖時刻，一齊守護 rare disease 家庭
            </p>
          </div>

          {uploadSuccess && (
            <div className="mb-6 rounded-xl bg-green-50 dark:bg-green-900/30 p-4 text-center text-sm font-medium text-green-700 dark:text-green-300">
              多謝你嘅分享！你嘅相片已經成功上載 🎉
            </div>
          )}

          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 shadow-xl shadow-[#2A9D8F]/20 sm:p-8">
            <div className="space-y-6">
              {/* Drop Zone */}
              {!preview ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => inputRef.current?.click()}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all ${
                    dragOver
                      ? "border-[#2A9D8F] bg-[#E8F5F3] dark:bg-[#1a3d38]"
                      : "border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-800/50 hover:border-[#2A9D8F] hover:bg-[#E8F5F3]/50 dark:hover:bg-[#1a3d38]/50"
                  }`}
                >
                  <ImagePlus
                    className={`mb-4 h-12 w-12 transition-colors ${
                      dragOver ? "text-[#2A9D8F]" : "text-slate-400 dark:text-gray-500"
                    }`}
                  />
                  <p className="text-sm font-medium text-slate-600 dark:text-gray-300">
                    拖放相片到這裡，或按此選擇
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-gray-500">
                    PNG, JPG 或 WebP (最大 10MB)
                  </p>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                </div>
              ) : (
                /* Preview */
                <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-gray-800">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[400px] w-full object-contain"
                  />
                  <button
                    onClick={removeFile}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Caption */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  相片說明 (可選)
                </label>
                <Textarea
                  placeholder="分享呢一刻嘅感受..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="min-h-[100px] resize-none border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F]"
                  maxLength={200}
                />
                <p className="text-right text-xs text-slate-400 dark:text-gray-500">
                  {caption.length}/200
                </p>
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                disabled={!selectedFile || isUploading}
                size="xl"
                className="w-full bg-[#2A9D8F] font-semibold text-white shadow-lg shadow-[#2A9D8F]/20 transition-all hover:bg-[#248f82] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    上載中...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    上載相片
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* TODO: Supabase integration notes */}
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 p-4 text-xs text-slate-500 dark:text-gray-400">
          <p className="font-medium dark:text-gray-300">🔧 開發備註</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              TODO: 整合 Supabase Storage 進行相片上載
            </li>
            <li>
              TODO: 整合 Supabase Auth 用戶認證
            </li>
            <li>
              TODO: 將相片資料儲存到 Supabase Database
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}