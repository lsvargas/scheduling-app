import { bookingStatusMapper } from "../../utils/constants";
import Spinner from "../Spinner";

interface ConfirmationModalProps {
  confirmModalCallback: any;
  modalOpen: boolean;
  setModalOpen: any;
  status: string;
  setStatus: any;
}

function ConfirmationModal({
  modalOpen,
  setModalOpen,
  confirmModalCallback,
  status,
  setStatus
}: ConfirmationModalProps) {

  const closeModalHandler = () => {
    setModalOpen(false);
    setStatus('default');
  };

  return (
    <>
      {modalOpen && (
        <>
          <div id="overlay" className="fixed z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60" />
          <div 
            id="dialog"
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg"
          >
            <h1 className="text-2xl font-semibold">
              {bookingStatusMapper[status]?.title}
            </h1>
            <div className="flex flex-col items-center py-5 border-t border-b border-gray-300">
              {status === "success" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-600 w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}

              {status === "error" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-600 w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
              {status === "loading" && <Spinner />}

              <p className="mt-4">{bookingStatusMapper[status]?.description}</p>
            </div>
            <div className="flex justify-end">
              {status === "default" && (
                <button
                  className="mr-4 px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md"
                  onClick={() => confirmModalCallback()}
                >
                  Confirm
                </button>
              )}
              <button
                className="px-5 py-2 border border-indigo-500 text-indigo-500 hover:bg-[#e3e5e7] cursor-pointer rounded-md"
                onClick={() => closeModalHandler()}
              >
                {status === "default" ? "Cancel" : "Continue"}
              </button>
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default ConfirmationModal;
