import { ChangeEvent, useState, useEffect } from "react";

import { apiSpeechFlow } from "../../../utils/ApiSpeechFlow";

import styles from "./Transcribe.module.scss";

export function Transcribe() {
  const [file, setFile] = useState<File>();
  const [isTransReady, setIsTransReady] = useState(false);
  const [isSubmissionOk, setIsSubmissionOk] = useState(false);
  const [transResult, setTransResult] = useState("");
  const [taskId, setTaskId] = useState("");


  const handleShowClick = () => { 
    apiSpeechFlow.queryTranscriptionResult(taskId, 4).then((res) => {
      console.log("result: ", res);
      if (res && res.code === 11000) {
        setIsTransReady(true);
        setTransResult(res.result);
      }
    });
  };

  useEffect(() => {
    if (isSubmissionOk) {
      const interval = setInterval(() => {
        handleShowClick();
      }, 2000);

      return(() => clearInterval(interval));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmissionOk, isTransReady]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
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

  // const handleSuccess = (stream) => {
  //   if (window.URL) {
  //     player.srcObject = stream;
  //   } else {
  //     player.src = stream;
  //   }
  // };

  // navigator.mediaDevices
  //   .getUserMedia({ audio: true, video: false })
  //   .then(handleSuccess);

  return (
    <div className={styles.container}>
      <h2>Hey siri</h2>
      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUploadClick}>Распознай меня</button>
      {isSubmissionOk && <span>Record submitted</span>}

      <br />
      {!isTransReady && isSubmissionOk && <p>Working...</p>}

      {isTransReady && <p>{transResult}</p>}

      {/* <audio id="player" ref={player} controls></audio> */}
    </div>
  );
}