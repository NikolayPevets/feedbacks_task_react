import { useContext } from "react";
import { ModalBody, ModalHeader, Modal } from "reactstrap";
import { Context } from "../../context";
import GuestFormEdit from "../guest-form-edit/guest-form-edit";
import GuestFormInfo from "../guest-form-info/guest-form-info";

export default function GuestFormModal({
  starRateValue,
  showModal,
  guestFormId,
  guestsData
}) {
  const { closeGuestForm } = useContext(Context);

  return (
    <>
      <Modal fade={true} isOpen={showModal}>
        <ModalHeader toggle={closeGuestForm}>
          {guestsData[guestFormId].name}
        </ModalHeader>
        <ModalBody>
          {guestsData[guestFormId].madeFeedback ? (
            <GuestFormInfo guestsData={guestsData} guestFormId={guestFormId} />
          ) : (
            <GuestFormEdit
              starRateValue={starRateValue}
              guestsData={guestsData}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
