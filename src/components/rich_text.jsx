import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useEffect } from "react";

/**
 * @param {object} props - Props of the component
 * @param {string} props.value - Text to be show in the editor
 * @param {function} props.setValue - Function to set the value of the editor
 * @param {string} props.propName - Name of the property to be set in the object
 * @returns {JSX.Element}
 */
const EditText = ({ value = '', setValue, propName = 'descripcion' }) => {

	const editor = useRef(null);
	const [content, setContent] = useState('');

	useEffect(() => {
		if ( value.length === 0 ) return;
		setContent(value);
	}, [value]);

	useEffect(() => {
		if (editor.current) {
			setValue(( prev ) => ({ ...prev, [propName]: content }))
		}
	}, [content]);

	return (
		<>
			<JoditEditor
				ref={editor}
				value={content}
				onChange={(newContent) => setContent(newContent)}
			/>
		</>
	);
};

export default EditText;
