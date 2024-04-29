import React, { useState } from "react";

export default function CurrentTask(props) {
  const QUOTES = [
    "Task complete! You're making progress one step at a time. Keep up the momentum!",
    "Way to go! Your tasks didn't stand a chance against your determination. Keep up the amazing work ethic!",
    "You did it! Your task is done, and you're ready to conquer the day. Keep that positive momentum going!"
  ]

  let [taskNum, setTaskNum] = useState(1);
  let [taskName, setTaskName] = useState("Pay Good to Go bill");
  let [quoteNum, setQuoteNum] = useState(getRandomNum());

  function getRandomNum() {
    return Math.floor(Math.random() * 3);
  }

  function changeQuote() {
    setQuoteNum(getRandomNum());
  }

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
          onClick={update}>
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
                  {QUOTES[quoteNum]}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={changeQuote}
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