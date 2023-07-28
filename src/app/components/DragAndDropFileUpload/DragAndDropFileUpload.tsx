import React, { useState, useRef } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface ImageData {
  id: number;
  url: string;
}

interface DragAndDropImageGalleryProps {
  onImagesChange: (images: ImageData[]) => void;
}

const DragAndDropImageGallery: React.FC<DragAndDropImageGalleryProps> = ({
  onImagesChange,
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const dropAreaRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [viewImageDialog, setViewImageDialog] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    uploadImages(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    uploadImages(files);
  };

  const uploadImages = async (files: File[]) => {
    const duplicateImages = images.some((image) =>
      files.some((file) => file.name === image.url)
    );

    if (duplicateImages) {
      alert("This image is already added!");
      return;
    }

    const newImages: ImageData[] = [];
    for (const file of files) {
      try {
        const imageUrl = await readFileAsDataURL(file);
        newImages.push({ id: images.length + newImages.length, url: imageUrl });
      } catch (error) {
        console.error("Error reading file:", file.name, error);
      }
    }

    setImages([...images, ...newImages]);
    onImagesChange([...images, ...newImages]);

    console.log("Uploaded images:", newImages);
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error("Failed to read file."));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (id: number) => {
    const filteredImages = images.filter((image) => image.id !== id);
    setImages(filteredImages);
    onImagesChange(filteredImages);
  };

  const handleClearAll = () => {
    setImages([]);
    onImagesChange([]);
  };

  const handleViewImage = (url: string) => {
    setViewImageDialog(url);
  };

  const handleCloseViewImageDialog = () => {
    setViewImageDialog(null);
  };

  return (
    <>
      <div
        ref={dropAreaRef}
        style={{
          border: "2px dashed #cccccc",
          padding: "1rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        Drop images here or click to browse
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple
        />
      </div>
      <ImageList sx={{ width: "100%", gap: 8 }} cols={4}>
        {images.map((image) => (
          <ImageListItem key={image.id} sx={{ position: "relative" }}>
            <img
              src={image.url}
              alt={image.url}
              onMouseEnter={(e) => e.currentTarget.classList.add("blur")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("blur")}
              onClick={() => handleViewImage(image.url)}
            />
            <ImageListItemBar
              position="bottom"
              actionIcon={
                <IconButton
                  aria-label="delete"
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Delete />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <button onClick={handleClearAll}>Clear All</button>
      <Dialog open={!!viewImageDialog} onClose={handleCloseViewImageDialog}>
        <DialogContent>
          <img
            src={viewImageDialog || ""}
            alt="View"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>
      <style jsx>{`
        .blur {
          filter: blur(4px);
        }
      `}</style>
    </>
  );
};

export default DragAndDropImageGallery;
