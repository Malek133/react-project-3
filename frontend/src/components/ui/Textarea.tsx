import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...rest }: IProps) => {
  return (
    <textarea
      className="border-[1px] border-gray-300 mt-2
      shadow-md focus:border-indigo-600 focus:outline-none 
      focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 
      text-md w-full bg-transparent"
      rows={6}
      {...rest}
    />
  );
};

export default Textarea;