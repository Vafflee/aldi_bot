import { ROLES } from "../constants/userRoles";
import { deleteRequest, getRequest } from "../db/request";
import { getUser, updateUser } from "../db/user";

export async function declineRequest(requestId: number) {
  try {
    const deletedRequest = await deleteRequest(requestId);
    return deletedRequest;
  } catch (err) {
    console.error(err);
    return null;
  }
}
