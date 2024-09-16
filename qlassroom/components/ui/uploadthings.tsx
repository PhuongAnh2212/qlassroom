import { useDropzone, Accept } from 'react-dropzone';

interface FileUploadProps {
  value: string;
  onChange: (fileUrl: string) => void;
  accept?: string;
  disabled?: boolean;
}

const FileUpload = ({ value, onChange, accept, disabled }: FileUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    disabled,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        onChange(fileUrl);
      }
    },
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>{value ? "File selected" : "Drag 'n' drop a file here, or click to select one"}</p>
    </div>
  );
};

export default FileUpload;
