import React from "react";
import Modal from "./ui/Modal";

const SubmissionForm = () => {
  return (
    <Modal>
      <dialog
        id="build_submission"
        className="modal modal-bottom sm:modal-middle "
      >
        <div className="modal-box bg-base-200">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Submit Your Build</h1>
            <p>
              Share your Rialo project with the community! Fill in the details
              below.
            </p>
          </div>
          <div className="w-full space-y-2">
            <input
              type="text"
              className="input validator w-full"
              required
              placeholder="Project name"
            />
            <textarea
              className="textarea w-full"
              placeholder="Project description"
            ></textarea>
            <input
              type="text"
              className="input validator w-full"
              required
              placeholder="Builder Twtter/X username"
            />
            <input
              type="text"
              className="input validator w-full"
              placeholder="Discord username (Optional)"
            />
            <input
              type="text"
              className="input validator w-full"
              placeholder="Tags (Comma separated)"
            />
            <input
              type="text"
              className="input validator w-full"
              placeholder="Github URL"
            />
            <input
              type="text"
              className="input validator w-full"
              placeholder="Live URL"
            />
            <input
              type="text"
              className="input validator w-full"
              placeholder="Image URL"
            />
          </div>
          <div className="modal-action ">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Modal>
  );
};

export default SubmissionForm;
