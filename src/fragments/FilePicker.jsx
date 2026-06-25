import { FileUpload, Link, Image, View } from 'reshaped';

export default function FilePicker({ value, onChange }) {
  return(
    <View paddingTop={5} paddingBottom={5}>
    <FileUpload name="file" onChange={onChange} >
      Drop files to attach or{" "}
      <FileUpload.Trigger>
        <Link variant="plain">browse</Link>
      </FileUpload.Trigger>
    </FileUpload>
    { value.length > 0 && 
      <Image src={ URL.createObjectURL(value[0]) }/>
    }
    </View>
  );
}