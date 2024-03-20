import { TriangleAlert } from "lucide-react";

interface IFormError {
  message?: string;
}

const FormError = ({ message }: IFormError) => {
  if (!message) return null;

  return (
    <div className="bg-red-300 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-600">
      <TriangleAlert className="w-4 h-4" />
      {message}
    </div>
  );
};
export default FormError;
