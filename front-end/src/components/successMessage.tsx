type Props = {
  message: string;
  onOkClick: () => void;
};

const SuccessMessage = ({ message, onOkClick }: Props) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-black">{message}</p>
        <button
          onClick={onOkClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
