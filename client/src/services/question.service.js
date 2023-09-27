import axios from 'axios';
// Question service interects with backend API -> saves to reducer

const baseUrl = 'http://localhost:8000/questions';

export const addQuestionToRepo = async (formData) => {
  formData = JSON.stringify(formData, null, 4);
  console.log('add: \n' + formData);
  try {
    const response = await axios.post(baseUrl, formData);
    console.log('add response: \n' + response);
    return response.data;
  } catch (error) {
    console.error('There was an error adding the question:', error);
  }
};

// Delete a question
export const deleteQuestionFromRepo = async (id) => {
  console.log('delete: \n' + id);
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    console.log('delete response: \n' + response);
    return response.data;
  } catch (error) {
    console.error('There was an error deleting the question:', error);
  }
};

// Get questions (simulates response promise)
export const getQuestions = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('There was an error retrieving the questions:', error);
  }
};