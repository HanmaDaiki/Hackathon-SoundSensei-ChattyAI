import { ChangeEvent, useState, useEffect } from "react";
import { apiSpeechFlow } from "../../../utils/ApiSpeechFlow";
import { RecorderMic } from "../RecorderMic/RecorderMic";
import styles from "./Transcribe.module.scss";

export function Transcribe() {
  const [file, setFile] = useState<File>();
  const [isTransReady, setIsTransReady] = useState(false);
  const [isSubmissionOk, setIsSubmissionOk] = useState(false);
  const [transResult, setTransResult] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleShowResult = () => { 
    apiSpeechFlow.queryTranscriptionResult(taskId, 4).then((res) => {
      console.log("result: ", res);
      if (res && res.code === 11000) {
        setIsTransReady(true);
        setTransResult(res.result);
      }
    });
  };

  const makeFile = (blob: Blob) => {
    console.log('makefile fired');
    const file = new File([blob], 'recording.mp3');
    setFile(file);
  }

useEffect(() => {
  if (file) handleSubmitRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [file])

useEffect(() => {
    if (isSubmissionOk) {
      const interval = setInterval(() => {
        handleShowResult();
      }, 2000);

      return(() => clearInterval(interval));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmissionOk, isTransReady]);

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  const handleSubmitRecording = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("lang", "ru");
    formData.append("file", file);

    apiSpeechFlow.postTranscription(formData).then((res) => {
      console.log("result: ", res);
      if (res && res.code === 10000) {
        setIsSubmissionOk(true);
        setTaskId(res.taskId);
      }
    });
  };


  return (
    <div className={styles.container}>
      <h2>Hey siri</h2>
      <RecorderMic makeFile={makeFile} />
      {!isTransReady && isSubmissionOk && <p>Working...</p>}
      {isTransReady && <p>{transResult}</p>}

    </div>
  );
}