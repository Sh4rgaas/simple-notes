import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getNotes = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const notes: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/notes"
    )
    return notes;
  } catch (error) {
    throw new Error()
  }
};

export const addNote = async (
    formData: INote
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const note: Omit<INote, "_id"> = {
        name: formData.name,
        description: formData.description,
        status: false,
      }
      const saveNote: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/add-note",
        note
      )
      return saveNote
    } catch (error) {
      throw new Error()
    }
  }

  export const updateNote = async (
    note: INote
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const noteUpdate: Pick<INote, "status"> = {
        status: true,
      }
      const updatedNote: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/edit-note/${note._id}`,
        noteUpdate
      )
      return updatedNote
    } catch (error) {
      throw new Error()
    }
  }

  export const deleteNote = async (
    _id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedNote: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-note/${_id}`
      )
      return deletedNote
    } catch (error) {
      throw new Error()
    }
  }