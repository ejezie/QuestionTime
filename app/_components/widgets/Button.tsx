import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

const LoadingButton: React.FC<ButtonProps> = (
  {loading, loadingText, ...props}
): React.JSX.Element => {
  return (
    <button
      className={`transition-colors bg-blue-600 text-white font-medium px-4 py-2 rounded-[20px] hover:bg-blue-500 disabled:bg-blue-400`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        loadingText ? (
          loadingText
        ) : (
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        )
      ) : (
        props.children
      )}
    </button>
  );
};

export default LoadingButton;
