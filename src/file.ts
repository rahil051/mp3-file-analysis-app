const fs = require('fs');

// Path to your MP3 file
const filePath = 'sample.mp3';

// Function to extract the bitrate index from the header
function getBitrate(header) {
  const bitrateIndex = (header[2] & 0xF0) >> 4;
  const bitrates = [
    null, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, null
  ];
  return bitrates[bitrateIndex] * 1000; // convert to bits per second
}

// Function to extract the sampling rate from the header
function getSamplingRate(header) {
  const samplingRateIndex = (header[2] & 0x0C) >> 2;
  const samplingRates = [44100, 48000, 32000, null];
  return samplingRates[samplingRateIndex];
}

// Function to calculate the frame size
function calculateFrameSize(bitrate, samplingRate, padding) {
  return Math.floor((144 * bitrate) / samplingRate) + padding;
}

// Read the MP3 file
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  let offset = 0;
  let frameCount = 0;

  while (offset < data.length) {
    if (data[offset] === 0xFF && (data[offset + 1] & 0xE0) === 0xE0) {
      // We've found the start of a frame (sync word)
      const header = data.slice(offset, offset + 4);
      const bitrate = getBitrate(header);
      const samplingRate = getSamplingRate(header);
      const padding = (header[2] & 0x02) >> 1;

      if (bitrate && samplingRate) {
        const frameSize = calculateFrameSize(bitrate, samplingRate, padding);
        frameCount++;
        offset += frameSize; // Move to the next frame
      } else {
        break; // Malformed header, stop parsing
      }
    } else {
      offset++; // Move forward by one byte if no sync word is found
    }
  }

  console.log('Total MP3 frame count:', frameCount);
});
