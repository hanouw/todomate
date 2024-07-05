import axios from "axios";

const TODOMATE_API_SERVER_HOST = "http://localhost:8099";

export const addTask = async (taskDTO) => {
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

export const updateTask = async ({ value: value, tid: tid }) => {
  const response = await axios.put(
    `${TODOMATE_API_SERVER_HOST}/task/update/${tid}/${value}`
  );
  return response;
};

export const deleteTask = async ({ tid }) => {
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
export const addRotine =  async (mid, routineDTO) => {
  console.log("add routine 실행")
  const response = await axios.post(`${TODOMATE_API_SERVER_HOST}/routines/${mid}`, routineDTO)
  return response.data;
}

export const getRoutineTaskList = async ({ year, month, day }) => {
  const response = await axios.get(
    `${TODOMATE_API_SERVER_HOST}/routines/${year}/${month}/${day}`
  );
  return response.data.RESULT;
};

export const getRoutine = async ({ tid }) => {
  const response = await axios.get(`${TODOMATE_API_SERVER_HOST}/${tid}`);
  return response;
};