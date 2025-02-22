import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Badge from "@mui/material/Badge";

import CancelIcon from '@mui/icons-material/Cancel';

import "./FileUploadButton.css";

interface FileUploadButtonProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ file, setFile }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const deleteFile = () => {
    setFile(null)
  }

  return (
    <div className="file-upload-container">
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="file-input" className="file-input-label">
        <Badge badgeContent={file ? 1 : 0} color="primary">
          <AttachFileIcon />
        </Badge>
      </label>
      {file &&
        <div className="file-name-cont">
          <p className="file-name">{file.name}</p>
          <div className="file-cross" onClick={deleteFile}>
            <CancelIcon fontSize="small" />
          </div>
        </div>
      }
    </div>
  );
};

export default FileUploadButton;
