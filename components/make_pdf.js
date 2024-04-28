import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  story: {
    fontSize: 12,
    marginBottom: 12,
  },
  image: {
    width: '50%',
    height: 'auto',
    marginBottom: 12,
  },
  disclaimer: {
    fontSize: 10,
    marginBottom: 12,
  },
  prompt: {
    fontSize: 12,
    marginBottom: 12,
  },
});

const PackageStoryPDF = ({ pdfFilename, title, story, imageFilename, storyPrompt, imagePrompt, textModel, imageModel }) => {

  const savePDF = () => {
    const doc = (
      <Document>
        <Page size="A4">
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.story}>{story}</Text>
            {imageFilename && <Image src={imageFilename} style={styles.image} />}
            <Text style={styles.disclaimer}>
              Disclaimer: This story has been auto-generated using artificial intelligence. Any resemblance to real persons, living or dead, or actual places or events is purely coincidental and unintentional. Read the documentation of the story-writer Python library to learn more: https://github.com/haesleinhuepf/story-writer
            </Text>
            {storyPrompt && <Text style={styles.prompt}>How it works:</Text>}
            {storyPrompt && <Text style={styles.prompt}>We used your short story notes as a prompt for {textModel}:</Text>}
            {storyPrompt && <Text style={styles.prompt}>{storyPrompt}</Text>}
            {imagePrompt && <Text style={styles.prompt}>Then, we asked {imageModel} for an image using this prompt:</Text>}
            {imagePrompt && <Text style={styles.prompt}>{imagePrompt}</Text>}
          </View>
        </Page>
      </Document>
    );

    const blob = new Blob([doc], { type: 'application/pdf' });
    saveAs(blob, pdfFilename);
  };

  return (
    <button onClick={savePDF}>Download PDF</button>
  );
};

export default PackageStoryPDF;
