const RED = '\x1b[31m';
const END = '\x1b[0m';
const USER_NOT_FOUND = '\nUser not found\n';
const OOPSS = '\nOops! Something went wrong.\n';
const RESPONSE_STATUS = '\nResponse status: ';

const array = process.argv;
let username;
if (array.length != 3) {
  console.log('Usage: node index.js <github-username>');
  process.exit(1);
}

username = array[2];

async function getData(username) {
  const url = `http://api.github.com/users/${username}/events`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status == 404) {
        throw new Error(RED + USER_NOT_FOUND + END);
      }
      throw new Error(
        RED + OOPSS + END + RESPONSE_STATUS + response.status + END
      );
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData(username);

