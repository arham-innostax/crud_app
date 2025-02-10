import Modal from "react-modal";

const ModalComponent = ({
  isOpen,
  onRequestClose,
  modalTitle,
  inputValue,
  setInputValue,
  modalPriority,
  setModalPriority,
  onSave,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel={modalTitle}
    className="bg-white p-4 rounded shadow-lg w-1/3 mx-auto mt-10"
    overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl">{modalTitle}</h2>
      <img
        src="close.png"
        className="h-5 w-5 cursor-pointer"
        onClick={onRequestClose}
        alt="Close"
      />
    </div>
    <input
      className="border p-2 rounded w-full mb-4"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Task Name"
    />
    <select
      className="border p-2 rounded w-full mb-4"
      value={modalPriority}
      onChange={(e) => setModalPriority(e.target.value)}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button onClick={onSave} className="bg-blue-500 text-white p-2 rounded w-full">
      {modalTitle === "Add Task" ? "Add Task" : "Save Task"}
    </button>
  </Modal>
);

export default ModalComponent;
