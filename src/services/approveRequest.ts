import { deleteRequest, getRequest } from "../db/request";
import { updateUser } from "../db/user";

export async function approveRequest(requestId: number) {
  try {
    const request = await getRequest(requestId);
    if (!request) return null;
    // change user role
    const user = {
      ...request.user,
      role: request.role,
      fullName: request.fullName,
      job: request.job,
    };
    const updatedUser = await updateUser(user);
    // remove request
    await deleteRequest(requestId);
    return updatedUser;
  } catch (err) {
    console.error(err);
    return null;
  }
}
