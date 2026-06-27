import './AddModal.css';
import { Modal, FormControl, View, Tabs, Button, useToggle } from "reshaped";
import { useState, useCallback } from 'react';

import FullTextField from "../../fragments/FullTextField";
import TwoButtons from '../../fragments/TwoButtons';
import ColorPicker from '../../fragments/ColorPicker';
import FilePicker from '../../fragments/FilePicker';
import ConfirmationModal from '../../fragments/ConfirmationModal';

const emptyForm = {
  name: "",
  brand: "",
  colorChoice: "1",
  color: "",
  file: [],
  notes: "",
  col: 1,
  row: 1,
}

export default function AddModal({ active, deactivate, saveSwatch, oldInfo = emptyForm , adding = true, deleteSwatch }) {
  const [ formInfo, setFormInfo ] = useState(oldInfo);
  const { active: confirmActive, activate: confirmActivate, deactivate: confirmDeactivate } = useToggle(false);

  const updateOnChange = useCallback(({ name, value }) => {
    setFormInfo(prev => ({...prev, [name]: value}))
  }, [setFormInfo]);

  return (
    <Modal active={active} onClose={deactivate}>
      <View direction="column" gap="2">
        <Modal.Title> { adding ? "Create New Swatch" : "Edit Swatch" }</Modal.Title>
        <FullTextField 
          label="Name"
          name="name"
          placeholder="Enter Swatch Name"
          value={formInfo.name}
          onChange={updateOnChange}
        />
        <FullTextField 
          label="Brand"
          name="brand"
          placeholder="Enter Swatch Brand"
          value={formInfo.brand}
          onChange={updateOnChange}
        />
        <FormControl>
          <FormControl.Label>Pick a way to represent your swatch</FormControl.Label>
          <Tabs
            variant="pills-raised"
            name="colorChoice"
            value={formInfo.colorChoice}
            onChange={updateOnChange}
          >
            <Tabs.List>
              <Tabs.Item value="1">Color</Tabs.Item>
              <Tabs.Item value="2">Picture</Tabs.Item>
            </Tabs.List>
            <Tabs.Panel value="1">
              <ColorPicker 
                value={formInfo.color}
                onChange={updateOnChange}
              />
            </Tabs.Panel>
            <Tabs.Panel value="2">
              <FilePicker 
                file={formInfo.file} 
                onChange={updateOnChange} 
              />
            </Tabs.Panel>
          </Tabs>
        </FormControl>
        <FullTextField
          type="big" 
          label="Notes"
          name="notes"
          placeholder="Enter Notes Here"
          value={formInfo.notes}
          onChange={updateOnChange}
          resize="auto"
        />
        <TwoButtons 
          primaryLabel={ adding ? "Add" : "Save" }
          fullWidth
          primaryOnClick={() => {
            saveSwatch(formInfo); 
            setFormInfo(emptyForm); 
            deactivate()}
          }
          secondaryLabel="Cancel"
          secondaryOnClick={() => {setFormInfo(emptyForm); deactivate()}}
          
        />
        { !adding && 
          <Button color='critical' onClick={confirmActivate}>
            Delete Swatch
          </Button>
        }

        <ConfirmationModal 
          active={confirmActive}
          deactivate={confirmDeactivate}
          confirm={() => {
              deleteSwatch();
              setFormInfo(emptyForm); confirmDeactivate(); deactivate();
            }}
        />
        
      </View>
    </Modal>
  );
}