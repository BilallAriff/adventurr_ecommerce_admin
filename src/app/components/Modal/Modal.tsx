"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal as MuiModal } from "@mui/material";

export default function Modal(props: any) {
  const { open, handleOpen, handleClose } = props;
  return (
    <>
      <MuiModal
        sx={{
          // border: "4px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(0, 0, 0, 0.5)",
          backdropFilter: "blur(3px)",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            // maxWidth: 500,
            // maxHeight: 500,
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
          }}
        >
          {props?.children}
        </Box>
      </MuiModal>
    </>
  );
}
