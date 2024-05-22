import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ViewStoryToPDF = () => {
  const viewShotRef = useRef(null);

  const captureView = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const htmlContent = `<html><body><img src="${uri}" /></body></html>`;
      const options = {
        html: htmlContent,
        fileName: 'view_story.pdf',
        directory: 'Documents',
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      console.log(pdf.filePath); // Path to the generated PDF file
      // Provide download option to users
    } catch (error) {
      console.error('Error capturing view or converting to PDF:', error);
    }
  };

  return (
    <View>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        {/* Your view story content here */}
        <Text>Hello, this is the view story content!</Text>
      </ViewShot>
      <Button title="Download PDF" onPress={captureView} />
    </View>
  );
};

export default ViewStoryToPDF;
