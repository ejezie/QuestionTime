import { toast } from "react-toastify";
import { revalidateTag } from "next/cache";

const BASE_URL = "https://qt.organogram.app/";

export async function getToken(payload: {}) {
  const res = await fetch(`${BASE_URL}token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "44",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(error.error || "An error occured");
    return;
  } else {
    const token = await res.json();
    localStorage.setItem("token", token.token);
    toast("Token retrieved successfully");
  }
  return res.ok;
}

export async function getQuestions() {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const res = await fetch(`https://qt.organogram.app/questions`, {
    method: "GET",
    headers: {
      Token: token ?? "",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(error.error || "An error occured");
    return;
  }
  return res.json();
}

export async function addQuestion(payload: {}) {
  const res = await fetch(`${BASE_URL}questions`, {
    method: "POST",
    headers: {
      Token: localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
      "Content-Length": "193",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(error.error || "An error occured");
    return;
  } else {
    toast("Question added successfully");
  }
  return res.ok;
}

export async function editQuestion(payload: { [key in string]: string | {} }) {
  const res = await fetch(`${BASE_URL}questions/${payload.id}`, {
    method: "PUT",
    headers: {
      Token: localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
      "Content-Length": "197",
    },
    body: JSON.stringify(payload.question),
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(error.error || "An error occured");
    return;
  } else {
    toast("Question saved successfully");
  }
  return res.ok;
}

export async function deleteQuestion(payload: {
  [key in string]: string | {};
}) {
  const res = await fetch(`${BASE_URL}questions/${payload.id}`, {
    method: "DELETE",
    headers: {
      Token: localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
      "Content-Length": "197",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(error.error || "An error occured");
    return;
  } else {
    toast("Question deleted successfully");
  }
  return res.ok;
}
