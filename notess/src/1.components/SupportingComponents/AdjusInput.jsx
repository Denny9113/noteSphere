import React, { useCallback, useEffect, useRef, useState } from 'react';


function AdjusInput({
    placeholder = 'take a note...',
    value,
    onChangeValue,
    classname,
    ...props
}) {
    const textareaRef = useRef(null);
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        handleResize()
    }, [props])


    const handleResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };


    const handleChange = (event) => {
        handleResize();
        onChangeValue(event.target.value)
    };

    const handleResizeOnClick = () => {
        handleResize()
    }

    return (
        <div className='transition-all'>
            <textarea
                ref={textareaRef}
                value={value}
                placeholder={placeholder}
                onChange={(event) => handleChange(event)}
                // onClick={handleResizeOnClick}
                style={{ resize: 'none', scrollbarWidth: 'none' }}
                className={`${classname}`}
            />
        </div>
    );
}

export default AdjusInput;
