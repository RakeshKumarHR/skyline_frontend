import { InputHTMLAttributes } from "react";

export default function TextArea({
  ...props
}: InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="bg-[#F3F3F5] rounded-lg px-[12px] py-[8px] w-full text-[10px] h-[60px] resize-none align-top outline-0"
      placeholder="Share your thoughts about this movie..."
      {...props}
    />
  );
}
