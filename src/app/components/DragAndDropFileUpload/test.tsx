import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";

const MasonryContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem",
  padding: "1rem",
});

const MasonryItem = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 200,
  backgroundColor: "#f0f0f0",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    "&::after": {
      content: '"Click to Enlarge"',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(0, 0, 255, 0.8)",
      color: "#fff",
      padding: "4px 0",
      textAlign: "center",
    },
  },
});

const EnlargedImgContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FileInput = styled("input")({
  display: "none",
});

const FileUploadComponent: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isEnlargedOpen, setIsEnlargedOpen] = useState(false);
  const [enlargedImgUrl, setEnlargedImgUrl] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length > 0) {
      setFiles([...files]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
  };

  const handleEnlargeImage = (imageUrl: string) => {
    setEnlargedImgUrl(imageUrl);
    setIsEnlargedOpen(true);
  };

  const handleCloseEnlarged = () => {
    setIsEnlargedOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 1,
        width: "100%",
        height: "100%",
        draggable: "true",
      }}
      onDragStart={handleDragStart}
    >
      <Box
        sx={{
          borderRadius: "4px",
          padding: 1,
          border: "2px dashed #F1F1F1",
          height: "100%",
          width: "100%",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FileInput type="file" multiple onChange={handleFileChange} />
        <MasonryContainer>
          {files.map((image, index) => {
            const imageUrl = URL.createObjectURL(image);

            return (
              <MasonryItem
                key={index}
                onClick={() => handleEnlargeImage(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt={`Image ${index}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </MasonryItem>
            );
          })}
        </MasonryContainer>
        <Dialog
          open={isEnlargedOpen}
          onClose={handleCloseEnlarged}
          maxWidth="md"
        >
          <DialogContent>
            <EnlargedImgContainer>
              <img
                src={enlargedImgUrl}
                alt="Enlarged"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </EnlargedImgContainer>
          </DialogContent>
        </Dialog>
      </Box>
      <Button variant="contained" onClick={handleClearAll}>
        Clear All
      </Button>
    </Box>
  );
};

export default FileUploadComponent;
