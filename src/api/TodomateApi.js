import axios from 'axios';

const TODOMATE_API_SERVER_HOST = 'http://localhost:8099';

export const addTask = async (taskDTO) => {
  const response = await axios.post(`${TODOMATE_API_SERVER_HOST}/task/add`, taskDTO);
  return response;
};

export const getTask = async ({ tid }) => {
  const response = await axios.get(`${TODOMATE_API_SERVER_HOST}/${tid}`);
  return response;
};

export const updateTask = async ({ value: value, tid: tid }) => {
  const response = await axios.put(`${TODOMATE_API_SERVER_HOST}/task/update/${tid}/${value}`);
  return response;
};

export const deleteTask = async ({ tid }) => {
  const response = await axios.delete(`${TODOMATE_API_SERVER_HOST}/task/${tid}`);
  return response;
};

export const getNormalTaskList = async ({ year, month, day }) => {
  const response = await axios.get(`${TODOMATE_API_SERVER_HOST}/task/normal/${year}/${month}/${day}`);
  return response.data.RESULT;
};

export const taskFinishedState = async ({ tid }) => {
  const response = await axios.post(`${TODOMATE_API_SERVER_HOST}/task/${tid}`);
  return response.data.RESULT;
};

export const getNumOfTask = async ({ mid, year, month }) => {
  const response = await axios.get(`
        ${TODOMATE_API_SERVER_HOST}/task/numoftask/${mid}/${year}/${month}`);
  return response.data.RESULT;
};

//======================== Routine
export const addRotine = async (mid, routineDTO) => {
  console.log("=======mid", mid)
  const response = await axios.post(`${TODOMATE_API_SERVER_HOST}/routines/${mid}`, routineDTO);
  return response.data;
};

export const getRoutineTaskList = async ({ mid, year, month, day }) => {
  const response = await axios.get(`${TODOMATE_API_SERVER_HOST}/routines/${mid}/${year}/${month}/${day}`);
  return response.data.RESULT;
};

export const dailyRoutineFinished = async ({ drId }) => {
  const response = await axios.put(`${TODOMATE_API_SERVER_HOST}/routines/daily/${drId}`);
  return response.data;
};

export const deleteDailyRoutine = async ({ drId }) => {
  const response = await axios.delete(`${TODOMATE_API_SERVER_HOST}/routines/daily/${drId}`);
  return response.data;
};

export const getRoutine = async ({ mid, drId }) => {
  const response = await axios.get(`${TODOMATE_API_SERVER_HOST}/routines/${mid}/${drId}`);
  return response.data.RESULT;
};

export const updateRoutine = async ({ rid, routineDTO }) => {
  console.log('updateRoutine routine 실행', rid);
  const response = await axios.put(`${TODOMATE_API_SERVER_HOST}/routines/${rid}`, routineDTO);
  return response.data;
};
