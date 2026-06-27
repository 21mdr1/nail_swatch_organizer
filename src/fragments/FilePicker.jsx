import { FileUpload, Link } from 'reshaped';


export default function FilePicker({ file, onChange }) {

  return(
    <div 
      style = {{
        marginTop: 17,
        marginBottom: 15,
        paddingTop: 75,
        paddingBottom: 75,
        paddingRight: 25,
        paddingLeft: 25,
        backgroundImage: file.length !== 0 ? `url(${Array.isArray(file) ? URL.createObjectURL(file[0]) : file})` : '',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <FileUpload className='file-picker' name="file" accept="image/*" multiple={false} onChange={onChange} >
        Drop files to attach or{" "}
        <FileUpload.Trigger accept="image/*" multiple={false}>
          <Link variant="plain">browse</Link>
        </FileUpload.Trigger>
      </FileUpload>
    </div>
  );
}