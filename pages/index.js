import Image from "next/image"
import { useState } from "react";
import {TiDeleteOutline} from 'react-icons/ti'

import styles from '../styles/home.module.scss';

import { topicData, targetStudents, classRequirementsData, instructorsData } from "../components/data";

export default function Home() {
  const [topics, setTopics] = useState(topicData)
  const [targets, setTargets] = useState(targetStudents)
  const [classRequirements, setClassRequirements] = useState(classRequirementsData)

  const [instructors, setInstructors] = useState(instructorsData)

  // selected instructors state
  const [selectedInstructors, setSelectedInstructors] = useState([])

  const [formData, setFormData] = useState({
    topic: "",
    title: "",
    description: "",
    target: "",
    requirements: "",
    preRegistration: "YES"
  })

  const { topic, title, description, target, requirements, preRegistration } = formData;
  
  console.log(preRegistration)

  function onChange(e) {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }

  // add new topic
  function onTopicAdd() { 
    setTopics((prevTopics) => [...prevTopics, { id: topics.length + 1, text: topic }])
    
    setFormData((prevData) => ({
      ...prevData,
      topic: ""
    }))
  }

  // new targets
  function onAddNewTarget() {
    setTargets((prevTargets) => [...prevTargets, { id: targets.length + 1, text: target }])
    
    setFormData((prevData) => ({
      ...prevData,
      target: ""
    }))
  }

  // class requirements
  function onAddNewRequirements() {
    setClassRequirements((prevRequirements) => [...prevRequirements, { id: targets.length + 1, text: requirements }])
    
    setFormData((prevData) => ({
      ...prevData,
      requirements: ""
    }))
  }

  // instructors
  function onInstructorChange(e) {
    if (selectedInstructors.some(selected => selected.name === e.target.value)) {
      alert('Instructor already selected')
      return;
    } setSelectedInstructors((prevInstructors) => [...prevInstructors, {id: prevInstructors.length + 1, name: e.target.value}])
  }

  // deleted selectors instructors
  function onDeleteSelectedInstructor(id) {
    setSelectedInstructors((prevInstructors) => prevInstructors.filter(instructor => instructor.id !== id))
  }
  return (
    <div>
      <div className="header">
        <h2>Class Details</h2>
        <div>
          <p>Nathan Nwachuku</p>
          <Image src="/../nathan.svg" width="40px" height="40px" alt="Nathan"/>
        </div>
      </div>

      {/* Course card */}
      <div className={styles.course_wrapper_card}>  

        {/* class title */}
        <div className={styles.form_group}>
          <label htmlFor="class_title">Class Title</label>
          <input type="text" placeholder="Write title of your class" name="title" value={title} onChange={onChange} />
        </div>
        {/* description */}
        <div className={styles.form_group}>
          <label htmlFor="class_title">Class Description</label>
          {/* <input type="text" placeholder="Write title of your class"/> */}
          <textarea name="description" placeholder="write your class description" id="class description" value={description} onChange={onChange}></textarea>
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
          ) : ''}

          <input type="text" placeholder="Write your class topics" name="topic" onChange={onChange} value={topic} />
          <p onClick={onTopicAdd}>+ Add another topic</p>
        </div>
        {/* class target*/}
        <div className={styles.form_group}>
          <label htmlFor="class_topic">Who is this class for?</label>
          {targets && targets.length !== 0 ? (
            <>
              {targets.map((targetData) => (
                <ul key={targetData.id}>
                  <li>{targetData.text}</li>
                  </ul>
                ))}
            </>
          ) : ''}

          <input type="text" placeholder="Write your who this class is for" name="target" onChange={onChange} value={target} />
          <p onClick={onAddNewTarget}>+ Add another option</p>
        </div>
        {/* class requirement*/}
        <div className={styles.form_group}>
          <label htmlFor="class_topic">Class Requirements</label>
          {classRequirements && classRequirements.length !== 0 ? (
            <>
              {classRequirements.map((targetData) => (
                <ul key={targetData.id}>
                  <li>{targetData.text}</li>
                  </ul>
                ))}
            </>
          ) : ''}

          <input type="text" placeholder="Write your who this class is for" name="requirements" onChange={onChange} value={requirements} />
          <p onClick={onAddNewRequirements}>+ Add another option</p>
        </div>
        {/* class pre-registration*/}
        <div className={styles.form_group}>
          <label htmlFor="class_topic">Do you want to enable pre-registration ?</label>
          <div className={styles.form_group_radio}>
            <div className={styles.form_group_radio_group}>
              <input type="radio" name="preRegistration" value="YES" id="YES" checked={preRegistration === "YES"} onChange={onChange} />
              <label htmlFor="YES">Yes</label>
            </div>
            <div className={styles.form_group_radio_group}>
              <input type="radio" name="preRegistration" value="NO" id="NO" checked={preRegistration === "NO"} onChange={onChange}/>
              <label htmlFor="NO">No</label>
            </div>
          </div>
        </div>
        {/* class assign instructor*/}
        <div className={styles.form_group}>
          <label htmlFor="class_topic">Choose an instructor</label>
          <select name="instructor" id="instructor" onChange={onInstructorChange}>
            {instructors && instructors.map((instructor) => <option key={instructor.id}  value={instructor.name}>{instructor.name}</option>)}
          </select>
          {/* display selected instructors */}
          {selectedInstructors && selectedInstructors.length !== 0 ? (
            <div className={styles.selectedInstructor_wrapper}>
              {selectedInstructors.map((selected) => <div key={selected.id} className={styles.selectedInstructor}>
                <p>{selected.name}</p>
                <TiDeleteOutline onClick={() => onDeleteSelectedInstructor(selected.id)}/>
              </div>)}
            </div>
          ) : ''}
        </div>
      </div>
    </div>

  )
}