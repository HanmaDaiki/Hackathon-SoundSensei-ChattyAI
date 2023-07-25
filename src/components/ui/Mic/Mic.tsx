import { FC } from 'react';
import { useEffect, useState } from "react";

import { addUserMessageToCurrentStory, getOpenAiStory, saveCurrentStory } from '../../../store/storySlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { apiSpeechFlow } from '../../../utils/ApiSpeechFlow';
import styles from './Mic.module.scss';


const MicRecorderToMp3 = require('mic-recorder-to-mp3');

const Mp3Recorder = new MicRecorderToMp3({
  bitRate: 128
});

export const Mic: FC = () => {
  const [file, setFile] = useState<File | null>();
  const [isSubmissionOk, setIsSubmissionOk] = useState(false);
  const [transResult, setTransResult] = useState("");
  const [taskId, setTaskId] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(transResult.length !== 0) {
      dispatch(getOpenAiStory({ prompt: transResult }));
      dispatch(addUserMessageToCurrentStory(transResult));
      dispatch(saveCurrentStory());
      setTransResult('');
      setFile(null);
    }
  }, [transResult, dispatch])

  useEffect(() => {
    if(isSubmissionOk) {
      const interval = setInterval(() => {
        handleShowResult(interval);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmissionOk])

  const startRecording = () => {
    Mp3Recorder.start();
  }

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([blob]: any) => {
        const createdBlob = new Blob(blob);
        const file = new File([createdBlob], 'recording.mp3');
        setFile(file);
      }).catch((e: Error) => console.log(e));
  }

  const handleShowResult = (interval: string | number | NodeJS.Timeout | undefined) => { 
    apiSpeechFlow.queryTranscriptionResult(taskId, 4).then((res) => {
      console.log("result: ", res);
      if (res && res.code === 11000) {
        setTransResult(res.result);
        clearInterval(interval);
        setIsSubmissionOk(false);
      }

      if(res && res.code === 11405) {
        clearInterval(interval);
        setIsSubmissionOk(false);
      }

      if(res && res.code === 11499) {
        clearInterval(interval);
        setIsSubmissionOk(false);
      }
    });
  };

  const createFormData = (lang: string, file: File) => {
    const formData = new FormData();
    formData.append("lang", lang);
    formData.append("file", file);
    return formData;
  }

  const handleSubmitRecording = async () => {
    if (!file) return;
    const formData = createFormData("ru", file);  
    apiSpeechFlow.postTranscription(formData).then((res) => {
      console.log("result: ", res);
      if (res && res.code === 10000) {
        setIsSubmissionOk(true);
        setTaskId(res.taskId);
      }
    });
  };

  useEffect(() => {
    if (file) handleSubmitRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return <button className={styles.mic} onMouseDown={() => startRecording()} onMouseUp={async () => { 
    await stopRecording();
  }} />;
};
