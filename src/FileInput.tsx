import React from 'react';

class FileInput extends React.Component {
  handleFileInput = (event: any) => {
    const file = event.target.files[0];
    // Process the uploaded file
  };

  render() {
    return (
      <input type="file" onChange={this.handleFileInput} />
    );
  }
}

export default FileInput;
