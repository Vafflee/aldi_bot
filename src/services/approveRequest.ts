import { ROLES } from "../constants/userRoles";
import { deleteRequest, getRequest } from "../db/request";
import { getUser, updateUser } from "../db/user";

export async function approveRequest(requestId: number) {
  try {
    const request = await getRequest(requestId);
    if (!request) return null;
    // change user role
    request.user.role = ROLES.STAFF;
    const updatedUser = await updateUser(request.user);
    // remove request
    await deleteRequest(requestId);
    return updatedUser;
  } catch (err) {
    console.error(err);
    return null;
  }
}
