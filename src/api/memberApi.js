import axios from "axios";

// export const TODOMATE_API_SERVER_HOST = "http://13.125.110.108:8099";
// export const TODOMATE_API_SERVER_HOST = "http://3.36.84.228:8099";
export const TODOMATE_API_SERVER_HOST = "http://localhost:8099";

export const loginPost = async (loginParam) => {
  const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.password);

  const response = await axios.post(
    `${TODOMATE_API_SERVER_HOST}/api/login`,
    form,
    header
  );

  return response.data;
};

export const register = async (val) => {
  console.log("register 실행", val);
  const header = { Headers: { "Content-Type": "application/json" } };

  const response = await axios.post(
    `${TODOMATE_API_SERVER_HOST}/members`,
    val,
    header
  );
  return response.data;
};

export const deleteMember = async (mid) => {
  console.log("deleteMember 실행");
  const response = await axios.delete(
    `${TODOMATE_API_SERVER_HOST}/members/${mid}`
  );
  return response.data;
};
