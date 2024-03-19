import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 500 },
    { duration: "30s", target: 500 },
  ],
};

export default function() {
  let res = http.post("http://localhost:1337/todo", JSON.stringify({
    author: "testuser",
    text: "testpassword",
  }), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  res = http.get("http://localhost:1337/todo");

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}