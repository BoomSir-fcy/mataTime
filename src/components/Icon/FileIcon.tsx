import React from 'react';
import {
  FileExcel,
  FilePPT,
  FileWord,
  FileOther,
  FilePDF,
  SvgProps,
} from 'uikit';

interface FileIcon extends SvgProps {
  ext: string;
}
const FileIcon: React.FC<FileIcon> = ({ ext, ...props }) => {
  if (ext === 'ppt') return <FilePPT {...props} />;
  if (ext === 'xls' || ext === 'xlsx') return <FileExcel {...props} />;
  if (ext === 'doc' || ext === 'docx') return <FileWord {...props} />;
  if (ext === 'pdf') return <FilePDF {...props} />;
  return <FileOther {...props} />;
};

export default FileIcon;
