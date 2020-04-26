

/**
 * Format the user name properly, by returning First & last name if available, 
 * or username if not.
 * @param user an object with at least first_name, last_name and username
 */
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