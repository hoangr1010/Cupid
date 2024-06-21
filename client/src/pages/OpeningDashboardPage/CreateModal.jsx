import { useState } from "react";
import { Modal } from "flowbite-react";
import NumberInput from "../../components/NumberInput";
import { createOpenings } from "../../api/opening";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { changeAmount } from "../../state";

const CreateModal = () => {
  const [openModal, setOpenModal] = useState(true);
  const [number, setNumber] = useState(0);

  const dispatch = useDispatch();
  const openingCompany = useSelector((state) => state.opening.company);

  const addSlots = async () => {
    if (number === 0) {
      toast.error("Amount of opening have to be greater 0");
      return;
    }

    const response = await createOpenings({
      company: openingCompany,
      amount: number,
    });
    if (response) {
      dispatch(changeAmount(response.original_amount));
      reset();
    }
  };

  const reset = () => {
    setOpenModal(false);
    setNumber(0);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="filled-btn btn-padding"
      >
        + Add Slots
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3">
            <section>
              <h3 className="text-primaryDark font-bold text-2xl">
                Create Referral Slots
              </h3>
              <p className="text-grayLight">
                Open your referral slots and start referring now!
              </p>
            </section>

            <section className="flex flex-col justify-center items-center gap-2">
              <p className="font-bold">
                Enter the number of slots you want to open:
              </p>
              <NumberInput number={number} setNumber={setNumber} />
            </section>

            <section className="flex justify-end">
              <button onClick={addSlots} className="filled-btn btn-padding">
                Add slots
              </button>
            </section>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateModal;
