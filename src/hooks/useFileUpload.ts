import { useState } from "react";
import { sendRequest } from "@/utils/sendRequest";
import { tokenCheck } from "@/utils/tokenCheck";

export default function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = (file: File, callback?: (response: any) => void) => {
    if (!file) {
      setError("Файл не выбран");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    sendRequest({
      method: "post",
      path: "api/upload_file",
      data: formData,
      token: tokenCheck(),
      callback: (res) => {
        setIsUploading(false);
        setUploadResponse(res);
        callback?.(res);
      },
    });
  };

  return { uploadFile, isUploading, uploadResponse, error };
}