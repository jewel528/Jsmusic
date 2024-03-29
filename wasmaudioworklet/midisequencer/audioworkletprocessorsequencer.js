export function AudioWorkletProcessorSequencerModule() {
  const SEQ_MSG_LOOP = -1;
  const SEQ_MSG_START_RECORDING = -2;
  const SEQ_MSG_STOP_RECORDING = -3;

  class MidiSequencer {
    constructor() {
      this.sequence = [];
      this.recorded = {};
    }

    clearRecording() {
      this.recorded = {};
    }

    setSequenceData(sequencedata) {
      if (sequencedata.length > 0) {
        // clear recorded data
        this.clearRecording();
      }
      
      const startRecordingEntry = sequencedata.find(entry => entry.message.length === 1 && entry.message[0] === SEQ_MSG_START_RECORDING);

      if (startRecordingEntry && startRecordingEntry.time <= this.getCurrentTime()) {
        this.recordingActive = true;
      } else {
        this.recordingActive = false;
      }    
      // update sequence
      if (this.sequence.length > 0 && sequencedata.length > 0) {
        // Replace while playing
        const currentTime = (this.currentFrame / sampleRate) * 1000;
        this.sequenceIndex = sequencedata.findIndex(evt => evt.time >= currentTime);
        if (this.sequenceIndex == -1) {
          this.sequenceIndex = 0;
        }
      } else {
        // Start playing from the beginning
        this.sequenceIndex = 0;
        this.currentFrame = 0;
      }
      this.sequence = sequencedata;
    }

    addMidiReceiver(midireceiver) {
      this.midireceiver = midireceiver;
    }

    onmidi(data) {
      if (this.recordingActive) {
        if (!this.recorded[this.currentFrame]) {
          this.recorded[this.currentFrame] = [];
        }
        this.recorded[this.currentFrame].push([data[0], data[1], data[2]]);
      }
    }

    getRecorded() {
      const eventlist = Object.keys(this.recorded)
        .sort((a, b) => a - b)
        .reduce((prev, frame) =>
          prev.concat(this.recorded[frame].map(event =>
            [frame / sampleRate].concat(event)))
          , []);
      return eventlist;
    }

    getCurrentTime() {
      return (this.currentFrame / sampleRate) * 1000;
    }

    setCurrentTime(time) {
      this.currentFrame = sampleRate * time / 1000;
      let sequenceIndex = 0;
      while (sequenceIndex < this.sequence.length &&
        this.sequence[sequenceIndex] &&
        this.sequence[sequenceIndex].time < time) {
        sequenceIndex++;
      }
      this.sequenceIndex = sequenceIndex;
    }

    onprocess() {
      let currentTime = this.getCurrentTime();

      while (this.sequenceIndex < this.sequence.length &&
        this.sequence[this.sequenceIndex] && // sometimes this is undefined for yet unkown reasons
        this.sequence[this.sequenceIndex].time < currentTime) {

        let loop = false;
        while (this.sequence[this.sequenceIndex].message[0] < 0 &&
            this.sequence[this.sequenceIndex].time <= currentTime) {
          switch (this.sequence[this.sequenceIndex].message[0]) {
            case SEQ_MSG_LOOP:
              // loop
              loop = true;
              break;
            case SEQ_MSG_START_RECORDING:
              this.recordingActive = true;
              this.sequenceIndex++;
              break;
            case SEQ_MSG_STOP_RECORDING:
              this.recordingActive = false;
              this.sequenceIndex++;
              break;
          }
          if (loop) {
            break;
          }
        }
        if (loop) {
          this.sequenceIndex = 0;
          this.currentFrame = 0;
          break;
        }

        const message = this.sequence[this.sequenceIndex].message;
        this.midireceiver(message[0], message[1], message[2]);
        this.sequenceIndex++;
      }

      if (this.recordingActive && this.recorded[this.currentFrame]) {
        const recorded = this.recorded[this.currentFrame];

        for (let n = 0; n < recorded.length; n++) {
          const message = recorded[n];
          this.midireceiver(message[0], message[1], message[2]);
        }
      }
      this.currentFrame += 128;
    }
  }

  AudioWorkletGlobalScope.midisequencer = new MidiSequencer();
}
