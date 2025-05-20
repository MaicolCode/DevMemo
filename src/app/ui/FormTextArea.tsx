import { TextareaHTMLAttributes } from 'react';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export default function FormTextArea({ label, error, ...props }: FormTextAreaProps) {
    return (
        <div className="space-y-1">
            <label 
                htmlFor={props.id} 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
                {label}
            </label>
            <textarea
                {...props}
                className={`
                    w-full px-4 py-2 border border-[#535353c7] rounded-md bg-[#1e1e1e] 
                    focus:outline-none focus:ring-1 focus:ring-white 
                    transition-all duration-200 ease-in
                    ${error ? 'border-red-500' : ''}
                `}
            />
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
