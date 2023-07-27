import { FC } from "react";
import { useEffect, useState } from "react";

import {
  addUserMessageToCurrentStory,
  getOpenAiStory,
  saveCurrentStory,
  updateStatusApiIsLoading,
} from "../../../store/storySlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { apiSpeechFlow } from "../../../utils/ApiSpeechFlow";
import { useSelector } from "react-redux";
import { StoryState } from "../../../interfaces/StoryState";
import styles from "./Mic.module.scss";
import { LanguageState } from '../../../interfaces/LanguageState';

const MicRecorderToMp3 = require("mic-recorder-to-mp3");

const Mp3Recorder = new MicRecorderToMp3({
  bitRate: 128,
});

export const Mic: FC = () => {
  const [file, setFile] = useState<File | null>();
  const [isSubmissionOk, setIsSubmissionOk] = useState(false);
  const [transResult, setTransResult] = useState("");
  const [taskId, setTaskId] = useState("");
  const { statusApiIsLoading } = useSelector(
    (state: { story: StoryState }) => state.story
  );
  const { language, currentLanguage } = useSelector((state: { lang: LanguageState }) => state.lang);


  const dispatch = useAppDispatch();

  useEffect(() => {
    if (transResult.length !== 0 && transResult !== 'ClearString') {
      dispatch(getOpenAiStory({ prompt: transResult, keyWords: language[currentLanguage].keyWords })).finally(() =>
        dispatch(updateStatusApiIsLoading(false))
      );
      dispatch(addUserMessageToCurrentStory(transResult));
      dispatch(saveCurrentStory());
      setTransResult("");
      setFile(null);
    } 
    if (transResult === 'ClearString') {
      dispatch(getOpenAiStory({ prompt: '', keyWords: language[currentLanguage].miniStory })).finally(() =>
        dispatch(updateStatusApiIsLoading(false))
      );
      setTransResult("");
      dispatch(addUserMessageToCurrentStory(""));
      dispatch(saveCurrentStory());
      setFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transResult, dispatch]);

  useEffect(() => {
    if (isSubmissionOk) {
      const interval = setInterval(() => {
        handleShowResult(interval);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmissionOk]);

  const startRecording = () => {
    Mp3Recorder.start();
  };

  const stopRecording = () => {
    dispatch(updateStatusApiIsLoading(true));
    Mp3Recorder.stop()
      .getMp3()
      .then(([blob]: any) => {
        const createdBlob = new Blob(blob);
        const file = new File([createdBlob], "recording.mp3");
        setFile(file);
      })
      .catch((e: Error) => console.log(e));
  };

  const handleShowResult = (
    interval: string | number | NodeJS.Timeout | undefined
  ) => {
    apiSpeechFlow.queryTranscriptionResult(taskId, 4).then((res) => {
      console.log("result: ", res);
      if (res && res.code === 11000) {
        setTransResult(res.result);
        if (res.result === '') {
          setTransResult('ClearString');
        }
        clearInterval(interval);
        setIsSubmissionOk(false);
      }

      if (res && res.code === 11405) {
        clearInterval(interval);
        setIsSubmissionOk(false);
        dispatch(updateStatusApiIsLoading(false));
      }

      if (res && res.code === 11499) {
        clearInterval(interval);
        setIsSubmissionOk(false);
        dispatch(addUserMessageToCurrentStory(""));
        dispatch(getOpenAiStory({ prompt: "", keyWords: language[currentLanguage].miniStory })).finally(() =>
          dispatch(updateStatusApiIsLoading(false))
        );
      }
    });
  };

  const createFormData = (lang: string, file: File) => {
    const formData = new FormData();
    formData.append("lang", lang);
    formData.append("file", file);
    return formData;
  };

  const handleSubmitRecording = async () => {
    if (!file) return;
    const formData = createFormData(currentLanguage, file);  
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

  return (
    <>
      {statusApiIsLoading ? (
        <div className={styles.mic_loader}></div>
      ) : (
        <button
          className={styles.mic}
          onMouseDown={() => startRecording()}
          onMouseUp={async () => {
            await stopRecording();
          }}
        />
      )}
    </>
  );
};
