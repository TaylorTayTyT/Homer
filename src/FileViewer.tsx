import React, { useEffect, useState } from 'react';

interface props {
    path: string
}

const FileViewer = ({ path } : props) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(path)
      .then(response => response.text())
      .then(data => setContent(data));
  }, [path]);

  return (
    <div>
      {content}
    </div>
  );
};

export default FileViewer;