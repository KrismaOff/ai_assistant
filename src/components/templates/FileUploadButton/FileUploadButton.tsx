import React, { useState } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Badge from "@mui/material/Badge";

import './FileUploadButton.css';

export default function FileUploadButton() {
  const { uploadFile, isUploading, uploadResponse, error } = useFileUpload();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Массив файлов

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        uploadFile(file, (response) => {
          console.log("Файл успешно загружен:", response);
        });
      });
      setSelectedFiles([]); // Очищаем список файлов после загрузки
    }
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        id="file-input"
        multiple // Разрешаем выбирать несколько файлов
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="file-input" className="file-input-label">
        <Badge badgeContent={selectedFiles.length} color="primary">
          <AttachFileIcon />
        </Badge>
      </label>
      <button
        onClick={handleUploadClick}
        disabled={isUploading || selectedFiles.length === 0}
        className="upload-button"
      >
        {isUploading ? "Загрузка..." : "Загрузить файл"}
      </button>
    </div>
  );
}