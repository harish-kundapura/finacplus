import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CommentModal.css";
import Select, { components } from "react-select";
import { GetUserDetails } from "../services/CommentApi";
import moment from "moment";

const CommentModal = ({ showModal, setShowModal }) => {
  const [userData, setUserData] = useState([]);

  // ! GET ALL Users LIST
  const getuserData = async () => {
    const res = await GetUserDetails();
    console.log("response", res);
    if (res) {
      setUserData(res.comments);
    } else {
      console.log("Something Went Wrong...");
    }
  };

  useEffect(() => {
    getuserData();
  }, []);

  console.log("userData", userData);
  const user = JSON.parse(localStorage.getItem("fullName"));
  console.log("user", user.firstName[0]);
  const [comments, setComments] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");
  console.log("comments", comments);
  console.log("selectedOptions", selectedOptions.length);

  const gettingComments = JSON.parse(localStorage.getItem("comments"));
  console.log("gettingComments", gettingComments);

  const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = "transparent";
    if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";

    const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "inherit",
      display: "flex ",
    };

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style,
    };

    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <input type="checkbox" checked={isSelected} />
        {children}
      </components.Option>
    );
  };

  const allOptions = [
    { value: "Nikhil", label: "Nikhil" },
    { value: "Niriksha", label: "Niriksha" },
    { value: "Dinesh", label: "Dinesh" },
    { value: "Prasad", label: "Prasad" },
  ];

  //   !save button for pushing the comments

  const saveButton = () => {
    if (comments === "") {
      setError("comments cannot be empty");
    } else if (selectedOptions.length === 0) {
      setError("selectedOptions cannot be empty");
    } else {
      setError("");
      let todayDate = moment().format("DD-MM-YYYY, h:mm a");
      console.log("todayDate", todayDate);

      let obj = [
        {
          todayDate: todayDate,
          user: user,
          comments: comments,
          selectedOptions: selectedOptions,
        },
      ];
      localStorage.setItem("comments", JSON.stringify(obj));
      setShowModal(false);
    }
  };

  console.log("userData",userData);

  const userComments=userData.map((val)=>{
    let count=0;
    if(val.comment!==""){
        count++
    }
return count;

  })

  const pushingComments=gettingComments.map((val)=>{
    let count=0;
    if(val.comments!==""){
        count++
    }
return count;
    
  })
  console.log("pushingComments",pushingComments.length);

  let totalComments=userComments.length+pushingComments.length
  console.log("totalComments",totalComments);


  

  return (
    <>
      <div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          fullscreen="xxl-down"
        >
          <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Comments
          </Modal.Title>
     
          <span>({totalComments})</span>
           
            <span className="loan">LOANID-111711183</span>
          </Modal.Header>
          <Modal.Body>
            {userData.map((val, ind) => {
              let a = val.updatedBy.split(" ");
              console.log("valll", a.length - 1);

              return (
                <>
                  <div className="userMain mt-3">
                    <div>
                      <p className="userNameFirstWord">
                        {val.updatedBy.split(" ")[0].split("")[0] +
                          "" +
                          a[a.length - 1].split("")[0]}
                      </p>
                    </div>
                    <div>
                      <p>{val.updatedBy}</p>
                      <p>{val.comment}</p>
                      <p>
                        {moment(val.updatedOn)
                          .utc()
                          .format("DD-MM-YYYY hh-mm a")}
                      </p>
                      {val.taggedTo.map((val, ind) => (
                        <span className="selectedPerson" key={ind}>
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              );
            })}

            {gettingComments.map((val, ind) => (
              <div className="userMain mt-4">
                <div>
                  <p className="userNameFirstWord">
                    {user.firstName[0].toUpperCase() +
                      user.lastName[0].toUpperCase()}
                  </p>
                </div>
                <div>
                  <p>{val.user.firstName + "" + val.user.lastName}</p>
                  <p>{val.comments}</p>
                  <p>{val.todayDate}</p>
                  {val.selectedOptions.map((val, ind) => (
                    <span className="selectedPerson" key={ind}>
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="userMain mt-4">
              <div>
                <p className="userNameFirstWord">
                  {user.firstName[0].toUpperCase() +
                    user.lastName[0].toUpperCase()}
                </p>
              </div>
              <div>
                <textarea
                  className="textArea"
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>

                <Select
                  defaultValue={[]}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(options) => {
                    if (Array.isArray(options)) {
                      setSelectedOptions(options.map((opt) => opt.value));
                    }
                  }}
                  options={allOptions}
                  components={{
                    Option: InputOption,
                  }}
                  placeholder="Tag To :"
                />
                <div className="mt-2">
                  <p className="errorMessage">{error}</p>
                  <button className="saveButton" onClick={saveButton}>
                    Save
                  </button>
                  <button className="cancelButton">Cancel</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CommentModal;
