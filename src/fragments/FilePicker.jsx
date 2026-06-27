import { FileUpload, Link, Image, View } from 'reshaped';


export default function FilePicker({ file, onChange }) {

  return(
    <View paddingTop={5} paddingBottom={5}>
    <FileUpload name="file" accept="image/jpg image/png image/webp" multiple={false} onChange={onChange} >
      Drop files to attach or{" "}
      <FileUpload.Trigger accept="image/jpg image/png image/webp" multiple={false}>
        <Link variant="plain">browse</Link>
      </FileUpload.Trigger>
    </FileUpload>
    { file != "" && 
      <Image src={ Array.isArray(file) ? URL.createObjectURL(file[0]) : file }/>
    }
    </View>
  );
}