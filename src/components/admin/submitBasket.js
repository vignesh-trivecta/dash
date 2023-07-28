import ValiditySelector from '@/utils/validitySelector';
import { Button, Label, Modal, Toast } from 'flowbite-react';
import React, {useState} from 'react';
import { HiCheck } from 'react-icons/hi';

const SubmitBasket = () => {

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [popup, setPopup] = useState(false);
  const [model, setModel] = useState(true); 


  if(popup){
    setTimeout(() => {
      setPopup(false);
    }, 3000)
  }

  return (
    <div className=''>
      <Button onClick={() => props.setOpenModal('pop-up')}   className='ml-8'>Submit</Button>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          {/* <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to submit this basket?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={() => {props.setOpenModal(undefined); setPopup(true)}}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div> */}
          <div className='flex flex-col'>
            {model ? 
              <div className='flex items-center justify-center'>
                <label className='mr-4'>Basket Validity</label>
                <ValiditySelector />
              </div> 
              : <></>
            }
            <div className="flex items-center justify-center mt-4">
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Save this as Model Basket</label>
              <input id="default-checkbox" type="checkbox" value={model} onClick={() => {setModel(!model); console.log(model);}} className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="flex justify-center mt-10 gap-4">
              <Button onClick={() => {props.setOpenModal(undefined); setPopup(true)}}>
                Save
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {popup
        ? <div className=''>
        <Toast className="absolute bottom-0 left-2 bg-green-400">
          <div className='flex items-center'>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal text-white">
              Basket Saved successfully
            </div>
          </div>
          <Toast.Toggle className='bg-green-400 text-white'/>
        </Toast>
      </div>
      :
      <></>  
    }
    
    </div>
  )
}

export default SubmitBasket;