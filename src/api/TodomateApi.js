import axios from "axios";

const TODOMATE_API_SERVER_HOST = "http://localhost:8099";

export const addTask = async (taskDTO) => {
  console.log(taskDTO);
  const response = await axios.post(
    `${TODOMATE_API_SERVER_HOST}/task/add`,
    taskDTO
  );
  return response;
};

export const getTask = async ({ tid }) => {
  const response = await axios.get(`${TODOMATE_API_SERVER_HOST}/${tid}`);
  return response;
};

export const updateTask = async ({ taskDTO }) => {
  const response = await axios.put(
    `${TODOMATE_API_SERVER_HOST}/task/update`,
    taskDTO
  );
  return response;
};

export const deleteTask = async ({ tid }) => {
  console.log(tid);
  const response = await axios.delete(
    `${TODOMATE_API_SERVER_HOST}/task/${tid}`
  );
  return response;
};

export const getNormalTaskList = async ({ year, month, day }) => {
  const response = await axios.get(
    `${TODOMATE_API_SERVER_HOST}/task/normal/${year}/${month}/${day}`
  );
  return response.data.RESULT;
};

export const getRoutineTaskList = async ({ year, month, day }) => {
  const response = await axios.get(
    `${TODOMATE_API_SERVER_HOST}/task/routine/${year}/${month}/${day}`
  );
  return response.data.RESULT;
};

export const taskFinishedState = async ({ tid }) => {
  const response = await axios.post(`${TODOMATE_API_SERVER_HOST}/task/${tid}`);
  return response.data.RESULT;
};
