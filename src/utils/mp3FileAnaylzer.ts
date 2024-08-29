import fs from "node:fs";
import path from "node:path";

/**
 * MP3FileAnalyzer
 *
 * @export
 * @class MP3FileAnalyzer
 * @typedef {MP3FileAnalyzer}
 */
export class MP3FileAnalyzer {
  readonly ext = "mp3";
  private fullPath: string;

  constructor(
    public filename: string,
    public relativePath = "/tmp/uploads",
  ) {
    if (path.extname(this.filename) !== this.ext) {
      throw new Error("MP3FileAnalyzer: file isn't mp3");
    }

    this.fullPath = `${this.relativePath}/${this.filename}`;
  }

  /**
   * Extract the bitrate index from the header
   *
   * @private
   * @param {Buffer} header
   * @returns {number}
   */
  private getBitrate(header: Buffer): number {
    const bitrateIndex = (header[2] & 0xf0) >> 4;
    const bitrates = [32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
    return bitrates[bitrateIndex] * 1000; // convert to bits per second
  }

  /**
   * Extract the sampling rate from the header
   *
   * @private
   * @param {Buffer} header
   * @returns {*}
   */
  private getSamplingRate(header: Buffer) {
    const samplingRateIndex = (header[2] & 0x0c) >> 2;
    const samplingRates = [44100, 48000, 32000, null];
    return samplingRates[samplingRateIndex];
  }

  /**
   * Calculate the frame size
   *
   * @private
   * @param {number} bitrate
   * @param {number} samplingRate
   * @param {number} padding
   * @returns {*}
   */
  private calculateFrameSize(bitrate: number, samplingRate: number, padding: number) {
    return Math.floor((144 * bitrate) / samplingRate) + padding;
  }

  /**
   * Count the number of frames of the mp3 file
   *
   * @public
   * @returns {Promise<number>}
   */
  public countFrames(): Promise<number> {
    return new Promise((resolve, reject) => {
      return fs.readFile(this.fullPath, (err, data) => {
        if (err) {
          console.error("Error reading file: ", err);
          reject(err);
        }

        let offset = 0;
        let frameCount = 0;

        while (offset < data.length) {
          if (data[offset] === 0xff && (data[offset + 1] & 0xe0) === 0xe0) {
            // We've found the start of a frame (sync word)
            const header = data.subarray(offset, offset + 4);
            const bitrate = this.getBitrate(header);
            const samplingRate = this.getSamplingRate(header);
            const padding = (header[2] & 0x02) >> 1;

            if (bitrate && samplingRate) {
              const frameSize = this.calculateFrameSize(bitrate, samplingRate, padding);
              frameCount++;
              offset += frameSize; // Move to the next frame
            } else {
              break; // Malformed header, stop parsing
            }
          } else {
            offset++; // Move forward by one byte if no sync word is found
          }
        }

        resolve(frameCount);
      });
    });
  }
}
