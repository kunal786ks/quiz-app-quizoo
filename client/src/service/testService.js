import { axiosApi } from "../config/axios";
export const createTestApi = async ({
  title,
  time_to_finish,
  testCategory,
  instruction,
  testDescription,
  passingMarks,
  MaximumMarks,
  token,
}) =>
  axiosApi.post(
    `/api/test/create-test`,
    {
      title,
      time_to_finish,
      testCategory,
      instruction,
      testDescription,
      passingMarks,
      MaximumMarks,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
