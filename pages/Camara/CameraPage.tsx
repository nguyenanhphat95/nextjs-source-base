import React, { useRef, useState } from "react";
import styles from "./style.module.scss";
import { useUserMedia } from "./useUserMedia";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "user" },
};

const CameraPage = () => {
  const canvasRef = useRef<any>();
  const videoRef = useRef<any>();
  const [src, setSrc] = useState("");

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
    videoRef.current.play();
  }

  const _handleCapture = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 500, 600);
    const base64 = canvasRef.current.toDataURL();
    setSrc(base64);
  };

  return (
    <>
      <div className={styles.camera}>
        <video ref={videoRef} className={styles.video}>
          Video stream not available.
        </video>
        <button onClick={_handleCapture} className={styles.startbutton}>
          Take photo
        </button>
      </div>
      <canvas ref={canvasRef} className={styles.canvas}>
        <div className={styles.output}>
          <img
            className={styles.photo}
            alt="The screen capture will appear in this box."
          />
        </div>
      </canvas>

      {src && (
        <div>
          <img src={src} alt="image " />
        </div>
      )}
    </>
  );
};

export default CameraPage;
