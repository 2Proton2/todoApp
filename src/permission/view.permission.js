export const viewPermission = (requestUser, todoUser) => {
    return requestUser.toString() === todoUser.toString()
}