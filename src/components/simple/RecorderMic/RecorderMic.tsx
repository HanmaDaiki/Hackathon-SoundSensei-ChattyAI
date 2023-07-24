import { useEffect, useState } from "react"

const MicRecorderToMp3 = require('mic-recorder-to-mp3');

const Mp3Recorder = new MicRecorderToMp3({
  bitRate: 128
});

type RecorderProps = {
  children?: React.ReactNode;
  makeFile: (blob: Blob) => void;
}

export function RecorderMic(props: RecorderProps) {
  const [blob, setBlob] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRecording) {
        setTimer(seconds => seconds + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      setTimer(0)
    };
  }, [isRecording])


  const startRecording = () => {
    setIsRecording(true);
    Mp3Recorder.start();
  }

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([blob]: any) => {
        const blobURL = URL.createObjectURL(new Blob(blob))
        setBlob(blobURL)
        setIsRecording(false);
        props.makeFile(new Blob(blob));
      }).catch((e: Error) => console.log(e));
  }

  return (
    <div className="App">
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <p>Time: {timer}</p>
      <audio src={blob} controls />
    </div>
  );
}
