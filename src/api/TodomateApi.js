import axios from "axios";

const API_SERVER_HOST = "http://localhost:8099";

export const addTask = async (taskDTO) => {
  const response = await axios.post(
    `${API_SERVER_HOST}/task/${taskDTO.mid}/add`,
    taskDTO
  );
  return response;
};

// export const getTask = async ({ tid }) => {
//   const response = await axios.get(`${API_SERVER_HOST}/${loginInfo.mid ? loginInfo.mid : 1}/${tid}`);
//   return response;
// };

export const updateTask = async ({ value: value, tid: tid }) => {
  //=======================================
  const response = await axios.put(
    `${API_SERVER_HOST}/task/1/update/${tid}/${value}`
  );
  return response;
};

export const deleteTask = async ({ tid }) => {
  //=======================================
  const response = await axios.delete(`${API_SERVER_HOST}/task/${tid}`);
  return response;
};

export const getNormalTaskList = async ({ year, month, day }) => {
  const response = await axios.get(
    `${API_SERVER_HOST}/task/${mid}/normal/${year}/${month}/${day}`
  );
  return response.data.RESULT;
};

export const getRoutineTaskList = async ({ year, month, day }) => {
  const response = await axios.get(
    `${API_SERVER_HOST}/task/routine/${year}/${month}/${day}`
  );
  return response.data.RESULT;
};

export const taskFinishedState = async ({ tid }) => {
  const response = await axios.post(`${API_SERVER_HOST}/task/${tid}`);
  return response.data.RESULT;
};

export const getNumOfTask = async ({ year, month }) => {
  const response = await axios.get(`
        ${API_SERVER_HOST}/task/numoftask/${year}/${month}`);
  return response.data.RESULT;
};
