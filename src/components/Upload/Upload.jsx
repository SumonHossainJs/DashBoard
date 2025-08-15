import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";

const Upload = ({ type = "image", setProgress, setData, children, multiple = false }) => {
  const ref = useRef();

  // Handle authentication for secure uploads
  const authenticator = async () => {
    try {
      const res = await fetch("https://a4codebackend.onrender.com/workItem/uploadAuth");
      const data = await res.json();
      return data; // should contain signature, expire, token
    } catch (err) {
      console.error("Error getting auth details:", err);
    }
  };

  const onError = (err) => {
    console.error("Upload Error:", err);
  };

  // Handle single or multiple files success
  const onSuccess = (res) => {
    // res can be a single object or an array of uploaded files
    if (Array.isArray(res)) {
      setData(res);
    } else {
      setData(res);
    }
    setProgress(0);
  };

  const onUploadProgress = (progressEvent) => {
    const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    setProgress(percent);
  };

  return (
    <IKContext
      publicKey="public_1023j1igBB8hDGGpHpABCyQQ5YM="
      urlEndpoint="https://ik.imagekit.io/fr0rfuxid"
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
        multiple={multiple} // Enable multiple file selection
      />
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
