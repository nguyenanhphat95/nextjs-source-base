import { useEffect, useState } from "react";
import _get from "lodash/get";

export function useUserMedia(requestedMedia: any) {
  const [mediaStream, setMediaStream] = useState<any>(null);

  useEffect(() => {
    async function enableVideoStream() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream: any = await navigator.mediaDevices.getUserMedia(
            requestedMedia
          );
          setMediaStream(stream);
        } else {
        }
      } catch (err) {
        // Handle the error
        console.error(err);
      }
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream?.getTracks().forEach((track: any) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}
