import { TextareaHTMLAttributes } from 'react';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export default function FormTextArea({ label, error, ...props }: FormTextAreaProps) {
    return (
        <div className="space-y-1 h-auto box-border">
            <label
                htmlFor={props.id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 "
            >
                {label}
            </label>
            <div className={`p-4 h-auto box-border overflow-hidden w-full border border-[#535353c7] rounded-md bg-[#1e1e1e] 
                     focus-within:ring-1 focus-within:ring-white 
                    transition-all duration-200 ease-in ${error ? 'border-red-500' : ''}`}>
                <textarea
                    {...props}
                    autoComplete='off'
                    spellCheck={false}
                    autoCapitalize='off'
                    className='w-full border-none p-0 m-0 h-auto leading-5 tracking-wide overflow-hidden focus:outline-none resize-none min-h-[100px] max-h-[calc(100vh - 20rem)]'
                    style={{ height: 'auto'}}
                    onKeyDown={(e) => {
                        const target = e.currentTarget as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                    }}
                    onInput={(e) => {
                        const target = e.currentTarget as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                    }}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
