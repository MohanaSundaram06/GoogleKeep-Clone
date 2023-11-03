import axios from "axios";

class ApiService {
  login = (loginDto) => {
    const response = axios.post(
      `http://localhost:8080/api/authenticate`,
      loginDto
    );
    return response;
  };

  register = (registerData) => {
    const response = axios.post(
      `http://localhost:8080/api/user/register`,
      registerData
    );
    console.log(response);
    return response;
  };

  getNote = (userId, noteId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.get(
      `http://localhost:8080/api/${idUser}/note/${noteId}`,
      {
        headers,
      }
    );
    // console.log(response);
    return response;
  };

  getNotes = (userId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    console.log(headers);
    const response = axios.get(`http://localhost:8080/api/${idUser}/note/`, {
      headers,
    });
    // console.log(response);
    return response;
  };

  addNote = (userId, noteRequestDTO) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.post(
      `http://localhost:8080/api/${idUser}/note/`,
      noteRequestDTO,
      { headers }
    );
    return response;
  };

  updateNote = (userId, noteId, noteRequestDTO) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}`,
      noteRequestDTO,
      { headers }
    );
    return response;
  };

  trashNote = (noteId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/trash`,
      null,
      {
        headers,
      }
    );
    return response;
  };

  restoreNote = (noteId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/restore-trash`,
      null,
      {
        headers,
      }
    );
    return response;
  };
  deleteNote = (noteId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.delete(
      `http://localhost:8080/api/${idUser}/note/${noteId}/delete-trash`,
      {
        headers,
      }
    );
    return response;
  };

  getTrashNotes = (userId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    // console.log("get trash");
    const response = axios.get(
      `http://localhost:8080/api/${idUser}/note/trashed`,
      {
        headers,
      }
    );
    console.log(response);
    return response;
  };

  archiveNote = (noteId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/archive`,
      null,
      {
        headers,
      }
    );
    return response;
  };
  unArchiveNote = (noteId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/unarchive`,
      null,
      {
        headers,
      }
    );
    return response;
  };

  getArchivedhNotes = (userId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    // console.log("get trash");
    const response = axios.get(
      `http://localhost:8080/api/${idUser}/note/archived`,
      {
        headers,
      }
    );
    console.log(response);
    return response;
  };

  addLabel = (name) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.post(
      `http://localhost:8080/api/${idUser}/label/?labelName=${name}`,
      null,
      {
        headers,
      }
    );
    console.log(response);
    return response;
  };

  updateLabel = (labelId, name) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));
    const response = axios.put(
      `http://localhost:8080/api/${idUser}/label/${labelId}?labelName=${name}`,
      null,
      {
        headers,
      }
    );
    console.log(response);
    return response;
  };

  getLabels = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.get(`http://localhost:8080/api/${idUser}/label/`, {
      headers,
    });
    console.log(response);
    return response;
  };

  deleteLabel = (labelId) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const idUser = Number(localStorage.getItem("userId"));

    const response = axios.delete(
      `http://localhost:8080/api/${idUser}/label/${labelId}`,
      {
        headers,
      }
    );
    console.log(response);
    return response;
  };
}

export default new ApiService();
