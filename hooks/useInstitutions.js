import { ref } from "vue";
import { API } from "aws-amplify";

export const useInstitutions = () => {
  const institution = ref({});
  const institutions = ref([]);
  const fetchInstitution = async (id) => {
    institution.value = await API.get("awsblogapi", `/v1/institution/${id}`);
  };

  const fetchInstitutions = async () => {
    const res = await API.get("awsblogapi", "/v1/institutions");
    institutions.value = res.data; // pass the data to the institutions variable
  };

  return {
    fetchInstitution,
    fetchInstitutions,
    institutions,
    institution,
  };
};
