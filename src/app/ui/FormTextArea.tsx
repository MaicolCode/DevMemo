import { TextareaHTMLAttributes } from 'react';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export default function FormTextArea({ label, error, ...props }: FormTextAreaProps) {
    return (
        <div className="relative space-y-1 h-auto box-border">
            <label
                htmlFor={props.id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
                {label}
            </label>
            <textarea
                {...props}
                autoComplete='off'
                spellCheck={false}
                autoCapitalize='off'
                className={`
                    w-full p-4 h-full overflow-hidden border border-[#535353c7] rounded-md bg-[#1e1e1e] 
                    focus:outline-none focus:ring-1 focus:ring-white 
                    transition-all duration-200 ease-in min-h-[100px] resize-none
                    ${error ? 'border-red-500' : ''}
                `}
                // Agregando un estilo dependiendo de la correspondencia del valor
                // para que el textarea se ajuste al contenido
                style={{ height: 'auto', minHeight: '100px' }}
                // Evento que se ejecuta cuando se presiona una tecla
                // para que el textarea se ajuste al contenido
                onKeyUp={(e) => {
                    const target = e.currentTarget as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                }}
            />
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
