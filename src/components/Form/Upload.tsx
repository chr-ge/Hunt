import React from "react";
import { IonButton, isPlatform } from "@ionic/react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { dataURItoBlob } from "../../utils/file";
import "./Upload.css";

const { Camera } = Plugins;

interface UploadProps {
  onChange: (value: any[]) => void;
  placeholder: string;
  files: string[];
  multiple?: boolean;
}

const Upload = ({
  onChange,
  placeholder,
  files,
  multiple,
  ...rest
}: UploadProps) => {
  const handleSelectFile = async (event: any) => {
    if (isPlatform("mobile")) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      const blob = dataURItoBlob(image.dataUrl!);

      onChange([blob]);
    } else {
      onChange([...event.target.files]);
    }
  };
  
  return (
    <div className="file-input-container">
      {!isPlatform("mobile") && (
        <input
          id="file"
          type="file"
          className="file-input"
          accept="image/*"
          onChange={handleSelectFile}
          multiple={multiple}
        />
      )}
      <IonButton onClick={handleSelectFile} {...rest}>
        {files.length ? `${files.length} file selected` : placeholder}
      </IonButton>
    </div>
  );
};

export default Upload;
