const fetch = require("node-fetch");

const ROOT_URL = "http://localhost:8080/api";
let testId;

async function postFetch(url, body) {
  return await fetch(`${ROOT_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  });
}

async function deleteFetch(url) {
  return await fetch(`${ROOT_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

describe("POST /api/books title=test", () => {
  test("post new book w/ title", async () => {
    expect.assertions(3);
    const response = await postFetch("/books", { title: "test" });
    // check response recieved ok
    expect(response.ok).toBeTruthy();
    const data = await response.json();
    // check return data
    expect(data.title).toBe("test");
    expect(data._id).toBeTruthy();
    testId = data._id;
  });
});

describe("GET /api/books", () => {
  test("get all books", async () => {
    expect.assertions(3);
    const response = await fetch(`${ROOT_URL}/books`);
    // check response is ok
    expect(response.ok).toBeTruthy();
    const data = await response.json();
    expect(typeof data[0].title).toBe("string");
    expect(typeof data[0].comments).toBe("number");
  });
});

describe("POST /api/books/:id", () => {
  test("add comment to book", async () => {
    expect.assertions(1);
    const response = await postFetch(`/books/${testId}`, {
      comment: "testing comment"
    });
    expect(response.ok).toBeTruthy();
    const data = await response.json();
  });
});

describe("DELETE /api/books/:id", () => {
  test("remove book", async () => {
    expect.assertions(2);
    const response = await deleteFetch(`/books/${testId}`);
    expect(response.ok).toBeTruthy();
    const data = await response.json();
    expect(data.message).toBe("Successfully Removed");
  });
});

describe("DELETE (all) /api/books", () => {
  test("remove all books", async () => {
    expect.assertions(2);
    const response = await deleteFetch(`/books`);
    expect(response.ok).toBeTruthy();
    const data = await response.json();
    expect(data.message).toBe("All Books Removed");
  });
});
