

export const nameForUser = ({
  first_name,
  last_name,
  username
}: { first_name?: string, last_name?: string, username: string }) => {
  if (first_name && last_name) {
    return `${first_name} ${last_name}`
  } else {
    return username
  }
}