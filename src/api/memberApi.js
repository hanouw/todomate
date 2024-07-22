import axios from "axios";

export const TODOMATE_API_SERVER_HOST = "http://13.125.110.108:8099";
// export const TODOMATE_API_SERVER_HOST = "http://3.36.84.228:8099";
// export const TODOMATE_API_SERVER_HOST = "http://localhost:8099";

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

export const getName = async (mid) => {
  const response = await axios.get(
    `${TODOMATE_API_SERVER_HOST}/members/getname/${mid}`
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

export const searchFriends = async ({ mid, startsWith }) => {
  console.log("searchFriends 친구찾기 실행");
  const response = await axios.get(
    `${TODOMATE_API_SERVER_HOST}/members/searchfriends/${mid}/${startsWith}`
  );
  return response.data;
};

export const friendRequest = async ({ bymid, tomid }) => {
  console.log("friendRequest 실행");
  const response = await axios.post(
    `${TODOMATE_API_SERVER_HOST}/members/friendrequest/${bymid}/${tomid}`
  );
  return response.data;
};

export const friendAccept = async ({ bymid, tomid, tf }) => {
  console.log("friendAccept 실행");
  const response = await axios.post(
    `${TODOMATE_API_SERVER_HOST}/members/friendAccept/${bymid}/${tomid}/${tf}`
  );
  return response.data;
};

export const getFriends = async (mid) => {
  console.log("getFriends 실행");
  const response = await axios.get(
    `${TODOMATE_API_SERVER_HOST}/members/getfriend/${mid}`
  );
  return response.data;
};

export const getFriendRequest = async (mid) => {
  console.log("getFriendRequest 실행");
  const response = await axios.get(
    `${TODOMATE_API_SERVER_HOST}/members/getfriendrequest/${mid}`
  );
  return response.data;
};

export const friendBanned = async ({ bymid, tomid }) => {
  console.log("friendBanned 실행");
  const response = await axios.put(
    `${TODOMATE_API_SERVER_HOST}/members/friendBanned/${bymid}/${tomid}`
  );
  return response.data;
};
