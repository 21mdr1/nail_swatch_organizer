import { Modal, View, Text, Button } from "reshaped";

export default function ConfirmationModal({ active, deactivate, confirm }) {
  return (
    <Modal active={active} onClose={deactivate}>
      <Text variant="featured-5"> Confirm Deletion </Text>
      <Text variant="body-1"> Are you sure you want to delete this swatch? This action cannot be undone</Text>
      <View direction="row">
        <Button color="primary" onClick={confirm} className="long">Delete</Button>
        <Button variant="ghost" color="primary" onClick={deactivate} className="long">Cancel</Button>
      </View>
    </Modal>
  );
}