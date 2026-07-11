"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Camera, ImageUp, Link, X, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (dataUrl: string) => void;
}

type CaptureMode = "camera" | "upload" | "url" | null;

export function CameraModal({
  open,
  onOpenChange,
  onCapture,
}: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [mode, setMode] = useState<CaptureMode>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Cleanup camera stream on close
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraReady(false);
    setCameraError(null);
  }, []);

  useEffect(() => {
    if (!open) {
      stopCamera();
      setMode(null);
      setPreview(null);
      setUrlInput("");
      setCameraError(null);
    }
    return () => stopCamera();
  }, [open, stopCamera]);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setIsCameraReady(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsCameraReady(true);
        };
      }
    } catch {
      setCameraError("無法開啟相機，請確認已允許相機權限。");
    }
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mirror the image (front camera)
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setPreview(dataUrl);
    stopCamera();
  }, [stopCamera]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleUrlConfirm = useCallback(() => {
    if (urlInput.trim()) {
      setPreview(urlInput.trim());
    }
  }, [urlInput]);

  const handleConfirm = useCallback(() => {
    if (preview) {
      onCapture(preview);
      onOpenChange(false);
    }
  }, [preview, onCapture, onOpenChange]);

  const handleRetake = useCallback(() => {
    setPreview(null);
    if (mode === "camera") {
      startCamera();
    } else {
      setMode(null);
    }
  }, [mode, startCamera]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>更新頭像</DialogTitle>
        </DialogHeader>

        <canvas ref={canvasRef} className="hidden" />

        {/* Preview state - show after capture */}
        {preview ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-48 w-48 overflow-hidden rounded-full ring-4 ring-[#2A9D8F]/30">
              <img
                src={preview}
                alt="新頭像預覽"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRetake}>
                <RefreshCw className="mr-2 h-4 w-4" />
                重新選擇
              </Button>
              <Button
                className="bg-[#2A9D8F] text-white hover:bg-[#248f82]"
                onClick={handleConfirm}
              >
                <Camera className="mr-2 h-4 w-4" />
                使用此頭像
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode selection */}
            {!mode && (
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMode("camera");
                    startCamera();
                  }}
                  className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-4 transition hover:border-[#2A9D8F] hover:bg-[#E8F5F3] dark:border-gray-700 dark:hover:border-[#2A9D8F] dark:hover:bg-[#2A9D8F]/10"
                >
                  <Camera className="h-8 w-8 text-[#2A9D8F]" />
                  <span className="text-xs font-medium text-slate-600 dark:text-gray-300">
                    拍照
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("upload");
                    fileInputRef.current?.click();
                  }}
                  className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-4 transition hover:border-[#2A9D8F] hover:bg-[#E8F5F3] dark:border-gray-700 dark:hover:border-[#2A9D8F] dark:hover:bg-[#2A9D8F]/10"
                >
                  <ImageUp className="h-8 w-8 text-[#E76F51]" />
                  <span className="text-xs font-medium text-slate-600 dark:text-gray-300">
                    選擇圖片
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("url")}
                  className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-4 transition hover:border-[#2A9D8F] hover:bg-[#E8F5F3] dark:border-gray-700 dark:hover:border-[#2A9D8F] dark:hover:bg-[#2A9D8F]/10"
                >
                  <Link className="h-8 w-8 text-slate-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-gray-300">
                    貼上 URL
                  </span>
                </button>
              </div>
            )}

            {/* Camera mode */}
            {mode === "camera" && (
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-full max-w-sm overflow-hidden rounded-xl bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={cn(
                      "w-full rounded-xl mirror-mode",
                      isCameraReady ? "opacity-100" : "opacity-0"
                    )}
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {!isCameraReady && !cameraError && (
                    <div className="flex h-48 items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                    </div>
                  )}
                  {cameraError && (
                    <div className="flex h-48 flex-col items-center justify-center px-4 text-center text-sm text-white">
                      <p>{cameraError}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { stopCamera(); setMode(null); }}>
                    <X className="mr-2 h-4 w-4" />
                    取消
                  </Button>
                  <Button
                    disabled={!isCameraReady}
                    className="bg-[#2A9D8F] text-white hover:bg-[#248f82]"
                    onClick={capturePhoto}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    拍照
                  </Button>
                </div>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* URL mode */}
            {mode === "url" && (
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="貼上圖片網址..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setMode(null)}>
                    <X className="mr-2 h-4 w-4" />
                    取消
                  </Button>
                  <Button
                    disabled={!urlInput.trim()}
                    className="bg-[#2A9D8F] text-white hover:bg-[#248f82]"
                    onClick={handleUrlConfirm}
                  >
                    <Link className="mr-2 h-4 w-4" />
                    確認
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}