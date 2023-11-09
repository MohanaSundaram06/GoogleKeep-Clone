import axios from "axios";

class ApiService {
  // *************************************
  //   User Service Api
  // *************************************

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
    // .catch(console.error());

    return response;
  };

  getNote = (userId, noteId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.get(
      `http://localhost:8080/api/${idUser}/note/${noteId}`,
      {
        headers,
      }
    );
    // console.log(response);
    return response;
  };

  // *************************************
  //   Note Service Api
  // *************************************

  getNotes = (userId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    console.log(headers);
    const response = axios.get(`http://localhost:8080/api/${idUser}/note/`, {
      headers,
    });
    // console.log(response);
    return response;
  };

  addNote = (userId, noteRequestDTO) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.post(
      `http://localhost:8080/api/${idUser}/note/`,
      noteRequestDTO,
      { headers }
    );
    return response;
  };

  updateNote = (userId, noteId, noteRequestDTO) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}`,
      noteRequestDTO,
      { headers }
    );
    return response;
  };

  // *************************************
  //  Note Label Service Api
  // *************************************

  AddNoteLabel = (noteId, labelId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/add-label/${labelId}`,
      null,
      {
        headers,
      }
    );
    return response;
  };

  removeNoteLabel = (noteId, labelId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/remove-label/${labelId}`,
      null,
      {
        headers,
      }
    );
    return response;
  };

  filterLabelNotes = (labelId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.get(
      `http://localhost:8080/api/${idUser}/note/${labelId}/notes`,
      {
        headers,
      }
    );
    // console.log(response);
    return response;
  };
  // *************************************
  //   Trash Service Api
  // *************************************

  trashNote = (noteId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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

  // *************************************
  //   Archive Service Api
  // *************************************

  archiveNote = (noteId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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

  // *************************************
  //   Remainder Service Api
  // *************************************

  setRemainder = (noteId, remainder) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/set-remainder?remainderTime=${remainder}`,
      null,
      { headers }
    );
    return response;
  };

  deleteRemainder = (noteId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.put(
      `http://localhost:8080/api/${idUser}/note/${noteId}/delete-remainder`,
      null,
      { headers }
    );
    return response;
  };

  getAllRemainderNotes = () => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    // console.log("get trash");
    const response = axios.get(
      `http://localhost:8080/api/${idUser}/note/remainders`,
      {
        headers,
      }
    );
    console.log(response);
    return response;
  };

  // *************************************
  //   Label Service Api
  // *************************************

  addLabel = (name) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));
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
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

    const response = axios.get(`http://localhost:8080/api/${idUser}/label/`, {
      headers,
    });
    console.log(response);
    return response;
  };

  deleteLabel = (labelId) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const idUser = Number(sessionStorage.getItem("userId"));

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
