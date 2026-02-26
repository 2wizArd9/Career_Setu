import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Card from './Card';
import { extractTextFromPDF, extractTextFromDOCX } from '../../utils/fileProcessing';

interface FileUploadProps {
  onFileSelect: (file: File, text: string) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = ['.pdf', '.docx', '.txt'],
  maxSize = 10 * 1024 * 1024 // 10MB
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      let text = '';

      if (file.type === 'text/plain') {
        text = await file.text();
      } else if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        text = await extractTextFromPDF(arrayBuffer);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        text = await extractTextFromDOCX(arrayBuffer);
      } else {
        throw new Error('Unsupported file type');
      }

      onFileSelect(file, text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize,
    multiple: false
  });

  return (
    <Card>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-blue bg-blue-50'
            : 'border-border-light hover:border-primary-blue hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {isProcessing ? (
            <div>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-blue mx-auto mb-2"></div>
              <p className="text-body text-text-secondary">Processing file...</p>
            </div>
          ) : isDragActive ? (
            <div>
              <p className="text-heading-3 font-semibold text-primary-blue">Drop your resume here</p>
              <p className="text-body-small text-text-secondary">Release to upload</p>
            </div>
          ) : (
            <div>
              <p className="text-heading-3 font-semibold text-text-primary">
                Drag & drop your resume here
              </p>
              <p className="text-body-small text-text-secondary mb-4">
                or click to browse files
              </p>
              <p className="text-body-small text-text-secondary">
                Supports PDF, DOCX, and TXT files (max {Math.round(maxSize / 1024 / 1024)}MB)
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-body-small text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};


export default FileUpload;