import * as Speech from 'expo-speech';

export default function voiceStory(text) {
    Speech.speak(text);
}