import React, { useState } from "react";

export default function CurrentTask(props) {
  let [taskNum, setTaskNum] = useState(1);
  let [taskName, setTaskName] = useState("Pay Good to Go bill");

  function update() {
    setTaskNum(2);
    setTaskName("Reading Response 7");
  }

  return (
    <section className="col-3">
      <div className="d-flex row">
        <p className="mb-2">{"task " + taskNum + " out of 2"}</p>
        <h2>Current Task:</h2>
        <h3 className="mb-2">{taskName}</h3>
        <button
          type="button"
          className="myButton"
          data-toggle="modal"
          data-backdrop="false"
          data-target="#exampleModal"
          onClick={update}
        >
          Mark as done
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Great job completing your task!
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body d-flex row">
                <p>
                  That's one less thing on the docket! Feel free to take a
                  small break before you try jumping straight into your
                  next task. You've got it &#40;:
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-baseline mt-auto">

      </div>

    </section>
  );
}