//import { PDFDocument, rgb } from 'react-native-pdf-lib';
//import { writeFile } from 'react-native-fs';


export function createStoryPrompt(outline, numParagraph = 1, numSentences = 1, targetAudience = 6, genr = 'fiction story', numsentencewords = 10) {
    return `
    A ${genr} story about ${outline} for ${targetAudience}-year old kids with ending part. This story has ${numParagraph} paragraphs, this story has ${numSentences} sentences in its each paragraph, each sentence has less than ${numsentencewords} words. 

    The story should be a little bit funny and in general written with a positive mood.
    `;
}




export function createStoryOutline(story) {
    return `
    Create a summary for the following story: ${story}.
    `;
}



export function createImagePrompt(story, imageType = 'illustration') {
    return `
Draw related ${imageType} for the following story outline: ${story}. 

The general mood of the ${imageType} is positive.
Do not write any text or speech or words into the ${imageType}.

`;
}

export function createTitlePrompt(story) {
    return `
Formulate a very short title of the following story: ${story}.

`;
}


export function createQuestions(story) {
    return `

Formulate 5 selection questions for a following story: ${story}.

Each question has 1 right answer and 3 confusing answers, and the first answer is the right answer.

`;
}


export async function packageStory(pdfFilename, title, paragraphs, imageURLs) {
  const pdfPath = `${pdfFilename}.pdf`;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add title to the PDF
  const page = pdfDoc.addPage();
  page.drawText(title, {
    x: 50,
    y: page.getHeight() - 100,
    size: 24,
    color: rgb(0, 0, 0), // black
  });

  // Add paragraphs and images to the PDF
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const imageURL = imageURLs[i];

    // Add paragraph text to the PDF
    page.drawText(paragraph, {
      x: 50,
      y: page.getHeight() - (i * 100) - 200,
      size: 12,
      color: rgb(0, 0, 0), // black
    });

    // Add image to the PDF
    if (imageURL) {
      const imageBytes = await fetch(imageURL).then(response => response.arrayBuffer());
      const image = await pdfDoc.embedPng(imageBytes);
      page.drawImage(image, {
        x: 50,
        y: page.getHeight() - (i * 100) - 400, // Adjust Y position as needed
        width: 200, // Adjust width as needed
        height: 100, // Adjust height as needed
      });
    }
  }

  // Save the PDF to file
  const pdfBytes = await pdfDoc.save();
  await writeFile(pdfPath, pdfBytes, 'base64');

  return pdfPath;
}