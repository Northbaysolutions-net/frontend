import axios from 'axios';
// import { getCharts, getLoginConfigurations } from './../utils/Mapper';
// import _ from 'lodash';
// import { API_ENDPOINT } from '../constants';


// API Call for getting workflow management table data
export default {
  fetchData: (category, color, size, sortBy, search, page, gender) => {
    let str=null
 
    if(category) 
    {
      str=`categoryFilter=${category}`
    }
  if (color)
   {
     str=str.concat(`&filter[]=${color}`)
   }
   if (size)
   {
     str=str.concat(`&filter[]=${size}`)
   }
   if (gender)
   {
     str=str.concat(`&filter[]=${gender}`)
   }
   if (search)
   {
     str=str.concat(`&search=${search}`)
   }
   if (page)
   {
     
     str=str.concat(`&offset=${page}`)
   }

   


    return axios
      .get(`http://localhost:3000/products?${str}&sort=${sortBy}`)
      .then(response => {
        return Promise.resolve(response.data.result);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  fetchSingleProduct: (id) => {
  
    return axios
      .get(`http://localhost:3000/products/${id}`)
      .then(response => {
        return Promise.resolve(response.data.result);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
  // fetchConfigurations: (userId, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_ENDPOINT_INT_USER}/${userId}`, config)
  //     .then(response => {
  //       const configurations = getLoginConfigurations(response.data);
  //       return Promise.resolve(configurations);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for updating state
  // updateState: (obj, id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   let object = { state: obj.id, assignee: obj.userId };
  //   return axios
  //     .put(`${API_UPDATE_STATE}${id}/`, object, config)
  //     .then(response => {
  //       return Promise.resolve(
  //         _.assign(response.data, { id: id, state: `${object.state}` })
  //       );
  //     })
  //     .catch(error => {
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for updating comments against a chart
  // commentUpdate: (fileId, obj, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .put(`${API_UPDATE_COMMENTS}${fileId}`, obj, config)
  //     .then(response => {
  //       return Promise.resolve(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for updating reviewer
  // updateAssigned: (obj, id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   let object = { userId: obj.id, state: obj.state };
  //   return axios
  //     .patch(`${API_UPDATE_ASSIGNED}${id}/`, object, config)
  //     .then(response => {
  //       return Promise.resolve(
  //         _.assign(response.data, { id, userId: `${object.userId}` })
  //       );
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting OCR'ed text
  // fetchOcrData: (pageNUm, id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_GETOCR_PAGE}${id}/${pageNUm}`, config)
  //     .then(response => {
  //       return Promise.resolve(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting Pdf file
  // fetchPdfData: (id, loginToken) => {
  //   console.log(id);
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_ENDPOINT_PDF}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting all the Encounters of a chart
  // getEncounterTable: (id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_GET_ENCOUNTERS}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting all ICDs for a given encounter
  // getEncounterIcdTable: (id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_GET_ENCOUNTER_ICD}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for adding ICD against a given encounter
  // addIcd: (id, obj, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .post(`${API_ADD_ICD}/${id}`, obj, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       return Promise.reject(error);
  //     });
  // },
  // editIcd: (id, icdTagId, obj, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .put(`${API_EDIT_ICD}/${id}/${icdTagId}`, obj, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       return Promise.reject(error);
  //     });
  // },
  // // API Call for updating ICD
  // updateIcdStatus: (id, icdId, obj, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .patch(`${API_UPDATE_ICD_STATUS}/${id}/${icdId}`, obj, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting medical codes against provided ICD
  // fetchMedicalCodes: (icd, dos, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_FETCH_MEDICAL_CODES}?icd=${icd}&dos=${dos}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting Last DOS ICD
  // getLastDOSId: (id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_ENDPOINT_LASTDOSID}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for saving Attestation form
  // saveEncounterAttestation: (id, obj, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .patch(`${API_ENDPOINT_SAVE_ENCOUNTER_ATTESTATION}/${id}`, obj, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting Attestation form data
  // getEncounterAttestations: (id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_ENDPOINT_GET_ENCOUNTER_ATTESTATION}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for getting Encounter Text for a given Encounter
  // getEncounterText: (id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_ENDPOINT_GET_ENCOUNTER_TEXT}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },

  // // API Call for verifying attestation
  // verifyAttestations: (id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_VERIFY_ENCOUNTER}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },
  // updatePatientAttestation: (id, obj, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .put(`${API_UPDATE_PATIENT_ATTESTATION}/${id}`, obj, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // },
  // generateReport: (id, loginToken) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`
  //     }
  //   };
  //   return axios
  //     .get(`${API_GENERATE_REPORT}/${id}`, config)
  //     .then(response => {
  //       return Promise.resolve(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return Promise.reject(error);
  //     });
  // }
};
