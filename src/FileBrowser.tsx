import React from 'react';
import { List, ListItem } from '@mui/material';

interface props {
    files: any
}

const FileBrowser = ({ files } : props) => (
  <List>
    {files.map((file: any) => (
      <ListItem key={file.name}>
        {file.name}
      </ListItem>
    ))}
  </List>
);

export default FileBrowser;