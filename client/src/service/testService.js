import { axiosApi } from "../config/axios";
export const createTestApi = async ({
  title,
  time_to_finish,
  testCategory,
  instruction,
  totalQuestions,
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
      totalQuestions,
      passingMarks,
      MaximumMarks,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
