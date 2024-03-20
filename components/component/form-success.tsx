import { ShieldCheck } from "lucide-react";

interface IFormSuccess {
  message?: string;
}

const FormSuccess = ({ message }: IFormSuccess) => {
  if (!message) return null;

  return (
    <div className="bg-green-300 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-600">
      <ShieldCheck className="w-4 h-4" />
      {message}
    </div>
  );
};
export default FormSuccess;
