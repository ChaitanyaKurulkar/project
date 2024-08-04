import { toast } from "react-toastify";
import { addProject, getProjects } from "../../../api/ProjectAPI";

export const getProject = (setProject: Function, setAPIStatus: Function) => {
  setAPIStatus((prev: any) => ({ ...prev, loading: true }));
  getProjects().then((res: any) => {
    if (res.statusCode === 200) {
      const projectsWithIndex = res.data.map((project: any, index: number) => ({
        ...project,
        index: index + 1,
      }));
      setProject(projectsWithIndex);
      setProject(res.data);

      setAPIStatus((prev: any) => ({ ...prev, loading: false }));
    } else {
      setAPIStatus((prev: any) => ({
        ...prev,
        loading: false,
        error: res.message,
      }));
    }
  });
};

const validateDates = (startDate: string, endDate: string): string | null => {
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return "End date is smaller than start date.";
  }
  return null;
};

export const handleInputChange = (
  event: React.SyntheticEvent,
  setInputField: Function,
  InputField: {
    projectName: string;
    reason: string;
    type: string;
    division: string;
    category: string;
    priority: string;
    department: string;
    startDate: string;
    endDate: string;
    location: string;
    status: number;
  }
) => {
  let target = event.target as HTMLInputElement;
  setInputField({
    ...InputField,
    [target.name]: target.type === "checkbox" ? target.checked : target.value,
  });
};

export const handleSubmit = async (
  inputField: any,
  setApiStatus: React.Dispatch<React.SetStateAction<any>>,
  setInputError: React.Dispatch<React.SetStateAction<any>>,
  resetForm: () => void
) => {
  setApiStatus({ loading: true, error: "", success: "" });

  // Validate project name
  if (!inputField.projectName.trim()) {
    setInputError({ projectName: "Project name cannot be empty." });
    setApiStatus({
      loading: false,
      error: "Project name cannot be empty.",
      success: "",
    });
    return;
  }

  // Validate dates
  const dateError = validateDates(inputField.startDate, inputField.endDate);
  if (dateError) {
    setInputError({ startDateEndDate: dateError });
    setApiStatus({ loading: false, error: dateError, success: "" });
    return;
  }

  try {
    await addProject(inputField);
    toast.success("Project saved successfully!");
    resetForm();
    setApiStatus({
      loading: false,
      error: "",
      success: "Project saved successfully!",
    });
  } catch (error) {
    toast.error("Failed to save project.");
    setApiStatus({
      loading: false,
      error: "Failed to save project.",
      success: "",
    });
  }
};
