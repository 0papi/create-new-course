import Image from "next/image";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

import styles from "../styles/home.module.scss";

import {
  topicData,
  targetStudents,
  classRequirementsData,
  instructorsData,
} from "../components/data";
import FAQs from "../components/FAQ";

export default function Home() {
  const [topics, setTopics] = useState(topicData);
  const [targets, setTargets] = useState(targetStudents);
  const [classRequirements, setClassRequirements] = useState(
    classRequirementsData
  );

  const [instructors, setInstructors] = useState(instructorsData);

  const [createFaqs, setCreateFaqs] = useState("");

  function onFaqChange(e) {
    setCreateFaqs(e.target.value);
  }

  // selected instructors state
  const [selectedInstructors, setSelectedInstructors] = useState([]);

  const [formData, setFormData] = useState({
    topic: "",
    title: "",
    description: "",
    target: "",
    requirements: "",
    preRegistration: "YES",
    explainer: "YES",
    brandColor: "custom",
    cost: "paid",
    currency: "",
    costPaid: "",
  });

  const {
    topic,
    title,
    description,
    target,
    requirements,
    preRegistration,
    explainer,
    brandColor,
    cost,
    costPaid,
    currency,
  } = formData;

  console.log({
    costPaid,
    currency,
    cost,
  });

  function onChange(e) {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  // add new topic
  function onTopicAdd() {
    setTopics((prevTopics) => [
      ...prevTopics,
      { id: topics.length + 1, text: topic },
    ]);

    setFormData((prevData) => ({
      ...prevData,
      topic: "",
    }));
  }

  // new targets
  function onAddNewTarget() {
    setTargets((prevTargets) => [
      ...prevTargets,
      { id: targets.length + 1, text: target },
    ]);

    setFormData((prevData) => ({
      ...prevData,
      target: "",
    }));
  }

  // class requirements
  function onAddNewRequirements() {
    setClassRequirements((prevRequirements) => [
      ...prevRequirements,
      { id: targets.length + 1, text: requirements },
    ]);

    setFormData((prevData) => ({
      ...prevData,
      requirements: "",
    }));
  }

  // instructors
  function onInstructorChange(e) {
    if (
      selectedInstructors.some((selected) => selected.name === e.target.value)
    ) {
      alert("Instructor already selected");
      return;
    }
    setSelectedInstructors((prevInstructors) => [
      ...prevInstructors,
      { id: prevInstructors.length + 1, name: e.target.value },
    ]);
  }

  // deleted selectors instructors
  function onDeleteSelectedInstructor(id) {
    setSelectedInstructors((prevInstructors) =>
      prevInstructors.filter((instructor) => instructor.id !== id)
    );
  }
  return (
    <div>
      <div className={styles.header}>
        <h2>Class Details</h2>
        <div className={styles.header_avatar}>
          <p>Nathan Nwachuku</p>
          <Image src="/../nathan.svg" width="40px" height="40px" alt="Nathan" />
        </div>
      </div>

      {/* Course card */}
      <div className={styles.course_wrapper_container}>
        <div className={styles.course_wrapper_card}>
          {/* class title */}
          <div className={styles.form_group}>
            <label htmlFor="class_title">Class Title</label>
            <input
              type="text"
              placeholder="Write title of your class"
              name="title"
              value={title}
              onChange={onChange}
            />
          </div>
          {/* description */}
          <div className={styles.form_group}>
            <label htmlFor="class_title">Class Description</label>
            {/* <input type="text" placeholder="Write title of your class"/> */}
            <textarea
              name="description"
              placeholder="write your class description"
              id="class description"
              value={description}
              onChange={onChange}
            ></textarea>
          </div>

          {/* class topic */}
          <div className={styles.form_group}>
            <label htmlFor="class_topic">Class Topic</label>
            {topics && topics.length !== 0 ? (
              <>
                {topics.map((topicData) => (
                  <ul key={topicData.id}>
                    <li>{topicData.text}</li>
                  </ul>
                ))}
              </>
            ) : (
              ""
            )}

            <input
              type="text"
              placeholder="Write your class topics"
              name="topic"
              onChange={onChange}
              value={topic}
            />
            <p onClick={onTopicAdd}>+ Add another topic</p>
          </div>
          {/* class target*/}
          <div className={styles.form_group}>
            <label htmlFor="class_target">Who is this class for?</label>
            {targets && targets.length !== 0 ? (
              <>
                {targets.map((targetData) => (
                  <ul key={targetData.id}>
                    <li>{targetData.text}</li>
                  </ul>
                ))}
              </>
            ) : (
              ""
            )}

            <input
              type="text"
              placeholder="Write your who this class is for"
              name="target"
              onChange={onChange}
              value={target}
            />
            <p onClick={onAddNewTarget}>+ Add another option</p>
          </div>
          {/* class requirement*/}
          <div className={styles.form_group}>
            <label htmlFor="class_requirements">Class Requirements</label>
            {classRequirements && classRequirements.length !== 0 ? (
              <>
                {classRequirements.map((targetData) => (
                  <ul key={targetData.id}>
                    <li>{targetData.text}</li>
                  </ul>
                ))}
              </>
            ) : (
              ""
            )}

            <input
              type="text"
              placeholder="Write who this class is for"
              name="requirements"
              onChange={onChange}
              value={requirements}
            />
            <p onClick={onAddNewRequirements}>+ Add another option</p>
          </div>
          {/* class pre-registration*/}
          <div className={styles.form_group}>
            <label htmlFor="class_preregister">
              Do you want to enable pre-registration ?
            </label>
            <div className={styles.form_group_radio}>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="preRegistration"
                  value="YES"
                  id="YES"
                  checked={preRegistration === "YES"}
                  onChange={onChange}
                />
                <label htmlFor="YES">Yes</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="preRegistration"
                  value="NO"
                  id="NO"
                  checked={preRegistration === "NO"}
                  onChange={onChange}
                />
                <label htmlFor="NO">No</label>
              </div>
            </div>
          </div>

          {/* class assign instructor*/}
          <div className={`${styles.form_group} ${styles.select_wrapper}`}>
            <label htmlFor="class_instructor">Choose an instructor</label>
            <select
              name="instructor"
              id="instructor"
              onChange={onInstructorChange}
              className={styles.instructor_select}
            >
              <option selected disabled>
                Choose your instructor
              </option>
              {instructors &&
                instructors.map((instructor) => (
                  <option
                    key={instructor.id}
                    value={instructor.name}
                    disabled={selectedInstructors.some(
                      (int) => int.name === instructor.name
                    )}
                  >
                    {instructor.name}
                  </option>
                ))}
            </select>
            {/* display selected instructors */}
            {selectedInstructors && selectedInstructors.length !== 0 ? (
              <div className={styles.selectedInstructor_wrapper}>
                {selectedInstructors.map((selected) => (
                  <div key={selected.id} className={styles.selectedInstructor}>
                    <p>{selected.name}</p>
                    <TiDeleteOutline
                      onClick={() => onDeleteSelectedInstructor(selected.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* FAQ SECTION */}

          <div className={styles.form_group}>
            <label htmlFor="class_faq">
              Do you want to add a FAQs section ?
            </label>
            <div className={styles.form_group_radio}>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  value="YES"
                  id="YES"
                  name="faq"
                  onChange={onFaqChange}
                />
                <label htmlFor="YES">Yes</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  value="NO"
                  id="NO"
                  name="faq"
                  onChange={onFaqChange}
                />
                <label htmlFor="NO">No</label>
              </div>
            </div>

            {/* MAIN QUESTIONS */}

            {createFaqs === "YES" ? <FAQs /> : ""}
          </div>

          {/* EXPLAINER VIDEO */}
          <div className={styles.form_group}>
            <label htmlFor="class_explainer">
              Do you want to add explainer video ?
            </label>
            <div className={styles.form_group_radio}>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="explainer"
                  value="YES"
                  id="YES"
                  checked={explainer === "YES"}
                  onChange={onChange}
                />
                <label htmlFor="YES">Yes</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="explainer"
                  value="NO"
                  id="NO"
                  checked={explainer === "NO"}
                  onChange={onChange}
                />
                <label htmlFor="NO">No</label>
              </div>
            </div>
            {explainer && explainer === "YES" && (
              <input
                type="url"
                placeholder="put Youtube link here"
                className={styles.form_group_addon}
              />
            )}
          </div>
          {/* BRAND COLOR */}
          <div className={styles.form_group}>
            <label htmlFor="class_colour">Choose your brand colour</label>
            <div className={styles.form_group_radio}>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="brandColor"
                  value="Blue"
                  id="blue"
                  checked={brandColor === "blue"}
                  onChange={onChange}
                />
                <label htmlFor="blue">Blue</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="brandColor"
                  value="red"
                  id="red"
                  checked={brandColor === "red"}
                  onChange={onChange}
                />
                <label htmlFor="red">Red</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="brandColor"
                  value="yellow"
                  id="yellow"
                  checked={brandColor === "yellow"}
                  onChange={onChange}
                />
                <label htmlFor="yellow">Yellow</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="brandColor"
                  value="green"
                  id="green"
                  checked={brandColor === "green"}
                  onChange={onChange}
                />
                <label htmlFor="green">Green</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="brandColor"
                  value="custom"
                  id="custom"
                  checked={brandColor === "custom"}
                  onChange={onChange}
                />
                <label htmlFor="custom">Custom</label>
              </div>
            </div>

            {brandColor && brandColor === "custom" && (
              <input
                type="text"
                placeholder="enter a custom color: #fff"
                className={styles.form_group_addon}
              />
            )}
          </div>

          {/* cost */}
          <div className={styles.form_group}>
            <label htmlFor="class_colour">Choose your brand colour</label>
            <div className={styles.form_group_radio}>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="cost"
                  value="free"
                  id="free"
                  checked={cost === "free"}
                  onChange={onChange}
                />
                <label htmlFor="free">Free</label>
              </div>
              <div className={styles.form_group_radio_group}>
                <input
                  type="radio"
                  name="cost"
                  value="paid"
                  id="paid"
                  checked={cost === "paid"}
                  onChange={onChange}
                />
                <label htmlFor="paid">Paid</label>
              </div>
            </div>

            {cost && cost === "paid" && (
              <div className={styles.form_group_cost}>
                <input
                  type="number"
                  name="costPaid"
                  value={costPaid}
                  onChange={onChange}
                  placeholder="0.00"
                  className={styles.costInput}
                />
                <select
                  name="currency"
                  value={currency}
                  id="currency"
                  onChange={onChange}
                >
                  <option id="ngn" value="NGN">
                    NGN
                  </option>
                  <option id="usd" value="USD">
                    USD
                  </option>
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.actions__back}>Back</button>
            <button className={styles.actions__create}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
