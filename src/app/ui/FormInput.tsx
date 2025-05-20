import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement> {
    label: string;
    error?: string;
}

export default function FormInput({ label, error, ...props }: FormInputProps) {
    return (
        <div className="space-y-1">
            <label 
                htmlFor={props.id} 
                className="block text-sm font-medium text-gray-300"
            >
                {label}
            </label>
            <input
                {...props}
                className={`
                    w-full px-4 py-2 border border-[#3a3a3a] rounded-md bg-[#1e1e1e] 
                    text-gray-200 focus:outline-none focus:ring-1 focus:ring-white 
                    transition-all duration-200 ease-in
                    ${error ? 'border-red-500' : ''}
                `}
            />
            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
