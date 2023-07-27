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

const MicRecorderToMp3 = require("mic-recorder-to-mp3");

const Mp3Recorder = new MicRecorderToMp3({
  bitRate: 128,
});

type IProps = {
  handleHover: () => void;
};
export const Mic: FC<IProps> = ({ handleHover }) => {
  const [file, setFile] = useState<File | null>();
  const [isSubmissionOk, setIsSubmissionOk] = useState(false);
  const [transResult, setTransResult] = useState("");
  const [taskId, setTaskId] = useState("");
  const { statusApiIsLoading } = useSelector(
    (state: { story: StoryState }) => state.story
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (transResult.length !== 0) {
      dispatch(getOpenAiStory({ prompt: transResult })).finally(() =>
        dispatch(updateStatusApiIsLoading(false))
      );
      dispatch(addUserMessageToCurrentStory(transResult));
      dispatch(saveCurrentStory());
      setTransResult("");
      setFile(null);
    }
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
        dispatch(getOpenAiStory({ prompt: "" })).finally(() =>
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

  return (
    <>
      {statusApiIsLoading ? (
        <div className={styles.mic_loader}></div>
      ) : (
        <button
          className={styles.mic}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onMouseDown={() => startRecording()}
          onMouseUp={async () => {
            await stopRecording();
          }}
        />
      )}
    </>
  );
};
